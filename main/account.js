import { default as electron, shell, Menu } from 'electron'
import path from 'path'
import request from 'request'
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'
import querystring from 'querystring'
import Url from 'url'
import Store from 'electron-store'
import tumblr from 'tumblr.js'
import Consumer from './consumer.js'
const store = new Store()

export default class Account {
	static newAccount () {
		var token = {}
		var login = new electron.BrowserWindow({ width: 800, heigh: 600, icon: path.join('file://', __dirname, 'icon', 'Tumble.png') })
		login.on('close', () => {
			if (login.did_auth) {
				this.createWindow(token)
				login.webContents.session.clearStorageData({ 'strages': ['cookies'] })
			}
		})
		this.getAuth(login, token)
	}
	static createWindow (token, name) {
		console.log(token)
		if (token.consumer_key === undefined || token.consumer_secret === undefined) {
			token.consumer_key = Consumer.consumer_key
			token.consumer_secret = Consumer.consumer_secret
		}
		console.log(token)
		var w = new electron.BrowserWindow({
			width: 1000,
			height: 800,
			webPreferences: {
				blinkFeatures: 'CSSBackdropFilter'
			},
			icon: path.join('file://', __dirname, 'icon', 'Tumble.png')
		})
		var c = new tumblr.Client({
			consumer_key: token.consumer_key,
			consumer_secret: token.consumer_secret,
			token: token.access_token,
			token_secret: token.access_token_secret
		})
		w.webContents.client = c
		if (name !== undefined) {
			w.webContents.user = name
			w.loadURL(path.join('file://', __dirname, 'index.html'))
		} else {
			c.userInfo((err, data) => {
				w.webContents.user = data.user.name
				if (!store.has('token.' + data.user.name)) {
					delete token.consumer_key
					delete token.consumer_secret
					store.set('token.' + data.user.name, token)
				}
				if (!store.has('config.default_account')) {
					store.set('config.default_account', data.user.name)
				}
				var menu = Menu.getApplicationMenu().getMenuItemById('accounts')
				menu.submenu.append(new electron.MenuItem({
					label: data.user.name,
					click: () => this.createWindow(store.get('token.' + data.user.name), data.user.name)
				}))
				w.loadURL(path.join('file://', __dirname, 'index.html'))
			})
		}
		w.on('close', () => {
			w = null
		})
		w.webContents.on('new-window', (e, url) => {
			e.preventDefault()
			shell.openExternal(url)
		})
		w.webContents.on('will-navigate', (e, url) => {
			e.preventDefault()
			shell.openExternal(url)
		})
	}
	static getAuth (login, returnToken) {
		returnToken.consumer_key = Consumer.consumer_key
		returnToken.consumer_secret = Consumer.consumer_secret
		var consumer = OAuth({
			consumer: {
				key: Consumer.consumer_key,
				secret: Consumer.consumer_secret
			},
			signature_method: 'HMAC-SHA1',
			hash_function: (baseString, key) => {
				return crypto.createHmac('sha1', key).update(baseString).digest('base64')
			}
		})

		const requestTokenData = {
			url: 'https://www.tumblr.com/oauth/request_token',
			method: 'POST',
			data: {}
		}

		var accessToken = null
		var accessTokenSecret = null

		request({
			url: requestTokenData.url,
			method: requestTokenData.method,
			form: consumer.authorize(requestTokenData, {})
		}, (err, res, body) => {
			var q = querystring.parse(body)
			console.log(q)
			accessToken = q.oauth_token
			accessTokenSecret = q.oauth_token_secret
			login.loadURL('https://www.tumblr.com/oauth/authorize?oauth_token=' + accessToken)
		})

		login.webContents.on('will-navigate', (event, url) => {
			if (url.indexOf('https://eivy.github.io/tumble') !== 0) {
				return
			}
			var q = querystring.parse(Url.parse(url).query)
			const accessTokenData = {
				url: 'https://www.tumblr.com/oauth/access_token',
				method: 'POST',
				data: {
					oauth_verifier: q.oauth_verifier
				}
			}
			request({
				url: accessTokenData.url,
				method: accessTokenData.method,
				form: consumer.authorize(accessTokenData, { key: accessToken, secret: accessTokenSecret })
			}, (err, res, body) => {
				if (err) {
					console.log('Error getting OAuth access token: ' + err)
				} else {
					var q = querystring.parse(body)
					returnToken.access_token = q.oauth_token
					returnToken.access_token_secret = q.oauth_token_secret
				}
				login.did_auth = true
				login.close()
			})
		})
	}
}

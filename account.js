import electron from 'electron'
import {shell} from 'electron'
import request from 'request';
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'
import querystring from 'querystring'
import Url from 'url'
import Store from 'electron-store'
import tumblr from 'tumblr.js'
const store = new Store();

import Consumer from './consumer.js'

export default {
	createWindow : function (token, name) {
		var w = new electron.BrowserWindow({
			width:1000,
			height: 800,
			webPreferences: {
				blinkFeatures: 'CSSBackdropFilter'
			}
		});
		w.loadURL('file://' + __dirname + '/render/index.html');
		w.on('close', () => {
			w = null;
		});
		w.webContents.on('new-window', (e, url) => {
			e.preventDefault();
			shell.openExternal(url);
		});
		w.webContents.on('will-navigate', (e, url) => {
			e.preventDefault();
			shell.openExternal(url);
		});
		var c = new tumblr.Client({
			consumer_key: token.consumer_key,
			consumer_secret: token.consumer_secret,
			token: token.access_token,
			token_secret: token.access_token_secret
		});
		if (name !== undefined) {
				w.webContents.user = name;
		} else {
			c.userInfo((err,data) => {
				w.webContents.user = data.user.name;
				if (!store.has('token.'+data.user.name)) {
					store.set('token.'+data.user.name, token);
					store.set('default_account', data.user.name);
				}
			});
		}
		w.webContents.client = c;
	},

	getAuth: function (login, return_token) {
		return_token.consumer_key = Consumer.key;
		return_token.consumer_secret = Consumer.secret;
		var consumer = OAuth({
			consumer: {
				key: Consumer.key,
				secret: Consumer.secret
			},
			signature_method: 'HMAC-SHA1',
			hash_function: (base_string, key) => {
				return crypto.createHmac('sha1', key).update(base_string).digest('base64');
			}
		});

		const requestTokenData = {
			url: 'https://www.tumblr.com/oauth/request_token',
			method: 'POST',
			data: {}
		};

		var access_token = null;
		var access_token_secret = null;

		request({
			url: requestTokenData.url,
			method: requestTokenData.method,
			form: consumer.authorize(requestTokenData, {})
		}, (err, res, body) => {
			var q = querystring.parse(body);
			access_token = q.oauth_token;
			access_token_secret = q.oauth_token_secret;
			login.loadURL('https://www.tumblr.com/oauth/authorize?oauth_token=' + access_token);
		});

		login.webContents.on('will-navigate', (event, url) => {
			if (url.indexOf('https://eivy.github.io/tumble') != 0) {
				return;
			}
			var q = querystring.parse(Url.parse(url).query);
			const accessTokenData = {
				url: 'https://www.tumblr.com/oauth/access_token',
				method: 'POST',
				data: {
					oauth_verifier: q.oauth_verifier,
				}
			}
			request({
				url: accessTokenData.url,
				method: accessTokenData.method,
				form: consumer.authorize(accessTokenData, {key: access_token, secret: access_token_secret}),
			}, (err, res, body) => {
				if (err) {
					console.log("Error getting OAuth access token: " + err);
				} else {
					var q = querystring.parse(body);
					return_token.access_token = q.oauth_token;
					return_token.access_token_secret = q.oauth_token_secret;
				}
				login.close();
			});
		});
	}
}

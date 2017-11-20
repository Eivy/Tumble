'use strict';
const electron = require('electron');
const app = electron.app;
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const querystring = require('querystring');
const Url = require('url');
const Store = require('electron-store');
const store = new Store();
const tumblr = require('tumblr.js');
const ipcMain = electron.ipcMain;

var main;
var client;

app.on('window-all-closed', () => {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', () => {
	var token = store.get('token', {
		consumer_key: consumer_key,
		consumer_secret: consumer_secret
	});
	if (!token.hasOwnProperty('access_token')) {
		var login = new electron.BrowserWindow({width:800, heigh:600});
		login.on('close', () => {
			store.set('token', token);
			showMain(token);
		});
		getAuth(login, token);
	} else {
		showMain(token);
	}
});

function showMain(token) {
	main = new electron.BrowserWindow({width:1000, height: 800});
	main.loadURL('file://' + __dirname + '/render/index.html');
	main.on('close', () => {
		main = null;
	});
	client = new tumblr.Client({
		consumer_key: token.consumer_key,
		consumer_secret: token.consumer_secret,
		token: token.access_token,
		token_secret: token.access_token_secret
	});
}

var requiringDashboard = false;
ipcMain.on('dashboard', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		client.userDashboard(Object.assign({reblog_info: true}, msg), (err,data) => {
			requiringDashboard = false;
			main.webContents.send('dashboard', {type: (msg.hasOwnProperty('since_id') ? 'next' : 'prev'), dashboard: data});
		});
	}
});

ipcMain.on('likes', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		client.userLikes(msg, (err,data) => {
			requiringDashboard = false;
			main.webContents.send('likes', {type: (msg.hasOwnProperty('since_id') ? 'next' : 'prev'), likes: data});
		});
	}
});

ipcMain.on('user', (evt, msg) => {
	client.userInfo((err,data) => {
		console.log(data);
		main.webContents.send('user', data);
	});
});

ipcMain.on('blog', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		client.blogPosts(msg.name, Object.assign({reblog_info: true}, msg), (err,data) => {
			requiringDashboard = false;
			main.webContents.send('dashboard', {type: (msg.hasOwnProperty('since_id') ? 'next' : 'prev'), dashboard: data});
		});
	}
});

ipcMain.on('avatar', (evt, msg) => {
	console.log(msg);
	client.blogAvatar(msg.name, msg.size, (err, data) => {
		main.send('avatar', data);
	});
});

ipcMain.on('blogInfo', (evt, msg) => {
	console.log(msg);
	client.blogInfo(msg.name, (err, data) => {
		main.send('blogInfo', data);
	});
});

function getAuth(login, return_token) {
	var consumer = OAuth({
		consumer: {
			key: consumer_key,
			secret: consumer_secret
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
		console.log(body);
		var q = querystring.parse(body);
		console.log(q);
		access_token = q.oauth_token;
		access_token_secret = q.oauth_token_secret;
		login.loadURL('https://www.tumblr.com/oauth/authorize?oauth_token=' + access_token);
	});

	login.webContents.on('will-navigate', (event, url) => {
		if (url.indexOf('https://eivy.github.io/tumble') != 0) {
			return;
		}
		var q = querystring.parse(Url.parse(url).query);
		console.log(q);
		const accessTokenData = {
			url: 'https://www.tumblr.com/oauth/access_token',
			method: 'POST',
			data: {
				oauth_verifier: q.oauth_verifier,
			}
		}
		console.log(consumer.toHeader(consumer.authorize(accessTokenData, {key: access_token, secret: access_token_secret})));
		request({
			url: accessTokenData.url,
			method: accessTokenData.method,
			form: consumer.authorize(accessTokenData, {key: access_token, secret: access_token_secret}),
		}, (err, res, body) => {
			if (err) {
				console.log("Error getting OAuth access token: " + err);
			} else {
				console.log(body);
				var q = querystring.parse(body);
				return_token.access_token = q.oauth_token;
				return_token.access_token_secret = q.oauth_token_secret;
			}
			login.close();
		});
	});
}

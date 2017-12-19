'use strict';
import electron from 'electron'
import {app,shell,ipcMain} from 'electron'
import request from 'request';
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'
import querystring from 'querystring'
import Url from 'url'
import Store from 'electron-store'
import tumblr from 'tumblr.js'
const store = new Store();

import consumer from './consumer.js'

var user;

app.on('window-all-closed', () => {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', () => {
	var token = store.get('token', {
		consumer_key: consumer.key,
		consumer_secret: consumer.secret
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
	var main = new electron.BrowserWindow({
		width:1000,
		height: 800,
		webPreferences: {
			blinkFeatures: 'CSSBackdropFilter'
		}
	});
	main.loadURL('file://' + __dirname + '/render/index.html');
	main.on('close', () => {
		main = null;
	});
	main.webContents.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
	main.webContents.on('will-navigate', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
	var c = new tumblr.Client({
		consumer_key: token.consumer_key,
		consumer_secret: token.consumer_secret,
		token: token.access_token,
		token_secret: token.access_token_secret
	});
	c.userInfo((err,data) => {
		main.webContents.user = data.user.name;
	});
	main.webContents.client = c;
}

ipcMain.on('reblog', (evt, msg) => {
	console.log(user);
	console.log(msg);
	evt.sender.client.reblogPost(user, msg, (err, data) => {
		evt.sender.send('reblog', {type: 'reblog', err: err, data: data});
	});
});

ipcMain.on('delete', (evt, msg) => {
	evt.sender.client.deletePost(user, msg, (err, data) => {
		evt.sender.send('reblog', {type: 'delete', err: err, data: data});
	});
});

ipcMain.on('like', (evt, msg) => {
	console.log(user);
	console.log(msg);
	evt.sender.client.likePost(user, msg, (err, data) => {
		evt.sender.send('like', {type: 'like', err: err, data: data});
	});
});

ipcMain.on('unlike', (evt, msg) => {
	console.log(user);
	console.log(msg);
	evt.sender.client.unlikePost(user, msg, (err, data) => {
		evt.sender.send('like', {type: 'unlike', err: err, data: data});
	});
});

ipcMain.on('follow', (evt, msg) => {
	evt.sender.client.followBlog(msg.url, (err, data) => {
		evt.sender.send('follow', data);
	});
});

ipcMain.on('unfollow', (evt, msg) => {
	evt.sender.client.unfollowBlog(msg.url, (err, data) => {
		evt.sender.send('unfollow', data);
	});
});

var requiringDashboard = false;
ipcMain.on('dashboard', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		evt.sender.client.userDashboard(Object.assign({reblog_info: true}, msg), (err,data) => {
			requiringDashboard = false;
			evt.sender.send('dashboard', {type: (msg.hasOwnProperty('since_id') ? 'after' : 'before'), posts: data.posts});
		});
	}
});

ipcMain.on('likes', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		evt.sender.client.userLikes(msg, (err,data) => {
			requiringDashboard = false;
			evt.sender.send('likes', {type: (msg.hasOwnProperty('after') ? 'after' : 'before'), posts: data.liked_posts});
		});
	}
});

ipcMain.on('user', (evt, msg) => {
	evt.sender.client.userInfo((err,data) => {
		user = data.user.name;
		console.log(data);
		evt.sender.send('user', data);
	});
});

ipcMain.on('followers', (evt, msg) => {
	console.log(msg);
	evt.sender.client.blogFollowers(msg.blog_identifier, {offset: msg.offset}, (err, data) => {
		evt.sender.send('followers', {blogs: data.users});
	});
});

ipcMain.on('following', (evt, msg) => {
	console.log(msg);
	evt.sender.client.userFollowing(msg, (err, data) => {
		evt.sender.send('following', data);
	});
});

ipcMain.on('blog', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		evt.sender.client.blogPosts(msg.name, Object.assign({reblog_info: true}, msg), (err,data) => {
			requiringDashboard = false;
			evt.sender.send('blog', {type: (msg.hasOwnProperty('since_id') ? 'after' : 'before'), posts: data.posts});
		});
	}
});

ipcMain.on('tag', (evt, msg) => {
	console.log(msg);
	if (!requiringDashboard) {
		requiringDashboard = true;
		evt.sender.client.taggedPosts(msg.name, Object.assign({reblog_info: true}, msg), (err,data) => {
			requiringDashboard = false;
			evt.sender.send('tag', {posts: data});
		});
	}
});

ipcMain.on('avatar', (evt, msg) => {
	console.log(msg);
	if (store.has('cache.avatar.'+msg.name)) {
		evt.sender.send('avatar'+msg.name, store.get('cache.avatar.'+msg.name));
	} else {
		evt.sender.client.blogAvatar(msg.name, msg.size, (err, data) => {
			if (!err) {
				store.set('cache.avatar.'+msg.name, data);
				evt.sender.send('avatar'+msg.name, data);
			} else {
				console.log(err);
			}
		});
	}
});

ipcMain.on('blogInfo', (evt, msg) => {
	console.log(msg);
	evt.sender.client.blogInfo(msg.name, (err, data) => {
		evt.sender.send('blogInfo', err ? err : data);
	});
});

function getAuth(login, return_token) {
	var consumer = OAuth({
		consumer: {
			key: consumer.key,
			secret: consumer.secret
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

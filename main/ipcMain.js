import { ipcMain } from 'electron'
import Store from 'electron-store'
import request from 'request'
import fs from 'fs'
const store = new Store()

ipcMain.on('reblog', (evt, msg) => {
	console.log(evt.sender.user)
	console.log(msg)
	evt.sender.client.reblogPost(evt.sender.user, msg, (err, data) => {
		evt.sender.send('reblog', { type: 'reblog', err: err, data: data })
	})
})

ipcMain.on('delete', (evt, msg) => {
	evt.sender.client.deletePost(evt.sender.user, msg, (err, data) => {
		evt.sender.send('reblog', { type: 'delete', err: err, data: data })
	})
})

ipcMain.on('like', (evt, msg) => {
	console.log(evt.sender.user)
	console.log(msg)
	evt.sender.client.likePost(evt.sender.user, msg, (err, data) => {
		evt.sender.send('like', { type: 'like', err: err, data: data })
	})
})

ipcMain.on('unlike', (evt, msg) => {
	console.log(evt.sender.user)
	console.log(msg)
	evt.sender.client.unlikePost(evt.sender.user, msg, (err, data) => {
		evt.sender.send('like', { type: 'unlike', err: err, data: data })
	})
})

ipcMain.on('follow', (evt, msg) => {
	evt.sender.client.followBlog(msg.url, (err, data) => {
		evt.sender.send('follow', data)
	})
})

ipcMain.on('unfollow', (evt, msg) => {
	evt.sender.client.unfollowBlog(msg.url, (err, data) => {
		evt.sender.send('unfollow', data)
	})
})

var requiringDashboard = false
ipcMain.on('dashboard', (evt, msg) => {
	console.log(msg)
	if (!requiringDashboard) {
		requiringDashboard = true
		evt.sender.client.userDashboard(Object.assign({ reblog_info: true }, msg), (err, data) => {
			requiringDashboard = false
			evt.sender.send('dashboard', { type: (msg.hasOwnProperty('since_id') ? 'after' : 'before'), posts: data.posts })
		})
	}
})

ipcMain.on('likes', (evt, msg) => {
	console.log(msg)
	if (!requiringDashboard) {
		requiringDashboard = true
		evt.sender.client.userLikes(msg, (err, data) => {
			requiringDashboard = false
			evt.sender.send('likes', { type: (msg.hasOwnProperty('after') ? 'after' : 'before'), posts: data.liked_posts })
		})
	}
})

ipcMain.on('user', (evt, msg) => {
	evt.sender.client.userInfo((err, data) => {
		evt.sender.user = data.user.name
		console.log(data)
		evt.sender.send('user', data)
	})
})

ipcMain.on('followers', (evt, msg) => {
	console.log(msg)
	evt.sender.client.blogFollowers(msg.blog_identifier, { offset: msg.offset }, (err, data) => {
		evt.sender.send('followers', { blogs: data.users })
	})
})

ipcMain.on('following', (evt, msg) => {
	console.log(msg)
	evt.sender.client.userFollowing(msg, (err, data) => {
		evt.sender.send('following', data)
	})
})

ipcMain.on('blog', (evt, msg) => {
	console.log(msg)
	if (!requiringDashboard) {
		requiringDashboard = true
		evt.sender.client.blogPosts(msg.name, Object.assign({ reblog_info: true }, msg), (err, data) => {
			requiringDashboard = false
			evt.sender.send('blog', { type: (msg.hasOwnProperty('since_id') ? 'after' : 'before'), posts: data.posts })
		})
	}
})

ipcMain.on('tag', (evt, msg) => {
	console.log(msg)
	if (!requiringDashboard) {
		requiringDashboard = true
		evt.sender.client.taggedPosts(msg.name, Object.assign({ reblog_info: true }, msg), (err, data) => {
			requiringDashboard = false
			evt.sender.send('tag', { posts: data })
		})
	}
})

ipcMain.on('avatar', (evt, msg) => {
	console.log(msg)
	if (store.has('cache.avatar.' + msg.name)) {
		evt.sender.send('avatar' + msg.name, store.get('cache.avatar.' + msg.name))
	} else {
		evt.sender.client.blogAvatar(msg.name, msg.size, (err, data) => {
			if (!err) {
				store.set('cache.avatar.' + msg.name, data)
				evt.sender.send('avatar' + msg.name, data)
			} else {
				console.log(err)
			}
		})
	}
})

ipcMain.on('blogInfo', (evt, msg) => {
	console.log(msg)
	evt.sender.client.blogInfo(msg.name, (err, data) => {
		evt.sender.send('blogInfo', err || data)
	})
})

ipcMain.on('download', (evt, msg) => {
	console.log(msg)
	request(
		{ method: 'GET', url: msg.url, encoding: null },
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				fs.writeFileSync(msg.path, body, 'binary')
			}
		}
	)
})

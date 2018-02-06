<script>
import { ipcRenderer, remote } from 'electron'
import Store from 'electron-store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Posts from './SideBar/Posts.vue'

var store = new Store()

export default {
	data: function () { return { name: '', posts: [] } },
	components: { Posts, Icon },
	created: function () {
		console.log(this.$router.currentRoute.name)
		ipcRenderer.removeAllListeners(this.$router.currentRoute.name)
		if (this.$router.currentRoute.name === 'dashboard') {
			ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
				if (evt !== this.$router.currentRoute.name) {
					return
				}
				if (store.get('config.own', false)) {
					msg.posts = msg.posts.filter((item, index, array) => item.blog_name !== remote.getCurrentWindow().webContents.user)
				}
				if (store.get('config.distinct', false)) {
					var tmp = []
					for (var item of msg.posts) {
						if (tmp.find((i, index, array) => i.reblog_key === item.reblog_key) === undefined &&
							this.posts.find((i, index, array) => i.reblog_key === item.reblog_key) === undefined
						) { tmp.push(item) }
					}
					msg.posts = tmp
				}
				if (msg.type === 'after') {
					this.posts = msg.posts.concat(this.posts)
				} else {
					this.posts = this.posts.concat(msg.posts)
				}
			})
		} else {
			ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
				if (evt !== this.$router.currentRoute.name) {
					return
				}
				if (msg.type === 'after') {
					this.posts = msg.posts.concat(this.posts)
				} else {
					this.posts = this.posts.concat(msg.posts)
				}
			})
		}
	},
	mounted: function () {
		ipcRenderer.on(this.$router.currentRoute.name, () => {
			document.getElementById('update').classList.remove('spin')
		})
		if (this.posts.length === 0) {
			this.spin()
		}
	},
	methods: {
		onscroll: function (data) {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function (obj) {
				var cover = document.getElementById('posts-cover')
				if (obj.prevScrollTop > cover.scrollTop) {
					if (cover.scrollTop < document.getElementById('posts').firstChild.clientHeight) {
						const route = obj.$router.currentRoute.name
						ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route === 'blog' ? { since_id: obj.posts[0].id } : { after: obj.posts[0].timestamp })))
						obj.spin()
					}
				} else if (cover.scrollTop + cover.clientHeight > document.getElementById('posts').lastChild.previousElementSibling.offsetTop) {
					const route = obj.$router.currentRoute.name
					ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route === 'blog' ? { before_id: obj.posts[obj.posts.length - 1].id } : { before: obj.posts[obj.posts.length - 1].timestamp })))
					obj.spin()
				}
				obj.prevScrollTop = cover.scrollTop
			}, 200, this)
		},
		back: function () {
			this.$router.back()
		},
		update: function (data) {
			this.posts = []
			ipcRenderer.send(this.$router.currentRoute.name, data)
			this.spin()
		},
		spin: function () {
			document.getElementById('update').classList.add('spin')
		}
	}
}
</script>

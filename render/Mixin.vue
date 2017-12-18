<script>
import Store from 'electron-store'
var store = new Store();
import {ipcRenderer} from 'electron'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Posts from './SideBar/Posts.vue'
export default {
	data: function() { return {name: '', posts: []} },
	components: {Posts, Icon},
	created: function () {
		console.log(this.$router.currentRoute.name);
		ipcRenderer.removeAllListeners(this.$router.currentRoute.name);
		ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
			if (msg.type === 'after') {
				this.posts = msg.posts.concat(this.posts);
			} else {
				this.posts = this.posts.concat(msg.posts);
			}
			if (store.get('config.distinct', false)) {
				var tmp = [];
				for(var item of this.posts) {
					if (tmp.find((i, index, array) => i.reblog_key === item.reblog_key) === undefined)
						tmp.push(item);
				}
				this.posts = tmp;
			}
			if (this.$router.currentRoute.name !== 'blog') {
				store.set('cache.'+this.$router.currentRoute.name+'.posts', this.posts);
			}
		});
	},
	mounted: function() {
		ipcRenderer.on(this.$router.currentRoute.name, () => {
			document.getElementById('update').classList.remove('spin');
		});
		if (this.posts.length = 0) {
			this.spin();
		}
	},
	methods: {
		onscroll: function(data) {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				var cover = document.getElementById('posts-cover');
				if (obj.prevScrollTop > cover.scrollTop) {
					if(cover.scrollTop < document.getElementById('posts').firstChild.clientHeight) {
						var route = obj.$router.currentRoute.name;
						ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route == 'blog' ? {since_id: obj.posts[0].id} : {after: obj.posts[0].timestamp})));
						obj.spin();
					}
				} else if (cover.scrollTop + cover.clientHeight > document.getElementById('posts').lastChild.previousElementSibling.offsetTop) {
					var route = obj.$router.currentRoute.name;
					ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route === 'blog' ? {before_id: obj.posts[obj.posts.length - 1].id} : {before: obj.posts[obj.posts.length - 1].timestamp})));
					obj.spin();
				}
				obj.prevScrollTop = cover.scrollTop;
			}, 200, this)
		},
		back: function() {
			this.$router.back();
		},
		update: function(data) {
			this.posts = [];
			ipcRenderer.send(this.$router.currentRoute.name, data);
			this.spin();
		},
		spin: function() {
			document.getElementById('update').classList.add('spin');
		}
	}
}
</script>

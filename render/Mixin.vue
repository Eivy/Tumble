<script>
import {ipcRenderer} from 'electron'
import Posts from './SideBar/Posts.vue'
export default {
	data: function() { return {name: '', posts: []} },
	components: {Posts},
	methods: {
		onscroll: function(data) {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				var cover = document.getElementById('posts-cover');
				if (obj.prevScrollTop > cover.scrollTop) {
					if(cover.scrollTop < document.getElementById('posts').firstChild.clientHeight) {
						var route = obj.$router.currentRoute.name;
						ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route == 'blog' ? {since_id: obj.posts[0].id} : {after: obj.posts[0].timestamp})));
					}
				} else if (cover.scrollTop + cover.clientHeight > document.getElementById('posts').lastChild.previousElementSibling.offsetTop) {
					var route = obj.$router.currentRoute.name;
					ipcRenderer.send(route, Object.assign(data, (route === 'dashboard' || route === 'blog' ? {before_id: obj.posts[obj.posts.length - 1].id} : {before: obj.posts[obj.posts.length - 1].timestamp})));
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
		}
	}
}
</script>

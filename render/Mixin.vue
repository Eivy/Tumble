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
						ipcRenderer.send(obj.$router.currentRoute.name, Object.assign(data, {since_id: obj.posts[0].id, after: obj.posts[0].timestamp}));
					}
				} else if (cover.scrollTop + cover.clientHeight > document.getElementById('posts').lastChild.previousElementSibling.offsetTop) {
					ipcRenderer.send(obj.$router.currentRoute.name, Object.assign(data, {before_id: obj.posts[obj.posts.length - 1].id, before: obj.posts[obj.posts.length - 1].timestamp}));
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

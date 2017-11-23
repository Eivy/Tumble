<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Likes</h2></div>
			<div id='user'>{{name}}</div>
		</div>
		<div id='posts-cover' @scroll=onscroll >
			<Posts :posts=posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Posts from './SideBar/Posts.vue'

export default {
	components: {Posts},
	data: function() { return {name: '', posts: []} },
	created: function() {
		if (global.user === undefined) {
			ipcRenderer.send('user');
			ipcRenderer.on('user', (evt, msg) => {
				this.name = msg.user.name;
				global.user = this.name;
			});
		} else {
			this.name = global.user;
		}
		ipcRenderer.on('likes', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.posts.concat(msg.likes.liked_posts);
			} else if (msg.type === 'next') {
				this.posts = msg.likes.liked_posts.concat(this.posts);
			}
		});
		console.log(this.$router.currentRoute.name);
		ipcRenderer.send(this.$router.currentRoute.name, {});
	},
	methods: {
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				console.log('hoge');
				if (obj.prevScrollTop > posts.scrollTop && posts.scrollTop < 100) {
					ipcRenderer.send(obj.$router.currentRoute.name, {after: obj.posts[0].timestamp});
				} else if (posts.scrollHeight - posts.scrollTop - posts.clientHeight  < 100) {
					ipcRenderer.send(obj.$router.currentRoute.name, {before: obj.posts[obj.posts.length - 1].timestamp});
				}
				obj.prevScrollTop = posts.scrollTop;
			}, 200, this)
		}
	}
}
</script>

<style scoped lang='scss'>
@import "./base.scss";
#posts-cover {
	@include content;
}
#header {
	@include header;
	#title {
		line-height: $title;
		height: $title;
		> h2 {
			padding: 0;
			margin: 0;
		}
	}
	#user {
		line-height: $user;
		height: $user;
	}
}
</style>

<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Dashboard</h2></div>
			<div id='user'>{{name}}</div>
		</div>
		<div id='posts' @scroll=onscroll >
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
		ipcRenderer.send('user');
		ipcRenderer.on('user', (evt, msg) => {
			this.name = msg.user.name;
		});
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'next') {
				this.posts = msg.dashboard.posts.concat(this.posts);
			}
		});
		ipcRenderer.send(this.$router.currentRoute.name, {});
	},
	methods: {
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				if (obj.prevScrollTop > posts.scrollTop && posts.scrollTop < 100) {
					ipcRenderer.send('dashboard', {since_id: obj.posts[0].id});
				} else if (posts.scrollHeight - posts.scrollTop - posts.clientHeight  < 100) {
					ipcRenderer.send('dashboard', {before_id: obj.posts[obj.posts.length - 1].id});
				}
				obj.prevScrollTop = posts.scrollTop;
			}, 200, this)
		}
	}
}
</script>

<style scoped lang='scss'>
@import "./base.scss";
#posts {
	position: absolute;
	padding-top: $headerHeight;
	padding-bottom: $headerHeight;
	top: 0;
	bottom: 0;
	width: 100%;
	overflow-x: unset;
	overflow-y: scroll;
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

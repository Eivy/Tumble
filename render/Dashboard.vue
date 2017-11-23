<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Dashboard</h2></div>
			<div id='user'>{{name}}</div>
		</div>
		<div id='posts-cover' @scroll='onscroll({})'>
			<Posts :posts=posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Mixin from './Mixin.vue'

export default {
	mixins: [Mixin],
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
		ipcRenderer.removeAllListeners('dashboard');
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'next') {
				this.posts = msg.dashboard.posts.concat(this.posts);
			}
		});
		ipcRenderer.send(this.$router.currentRoute.name, {});
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

<template>
	<div id='contents'>
		<div id='title'><img id='avatar' :src=avatar_url >{{title}}</div>
		<div id='posts' @click=goTo ><span>投稿</span><span id='count'>{{posts}}</span></div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
export default {
	props: ['title'],
	data: function() {return {posts: '', avatar_url: ''}},
	created: function() {
		ipcRenderer.on('avatar', (evt, msg) => {
			this.avatar_url = msg.avatar_url;
		});
		ipcRenderer.send('avatar', {name: this.title, size: 48});
		ipcRenderer.on('blogInfo', (evt, msg) => {
			console.log(msg);
			this.posts = msg.blog.posts;
		});
		ipcRenderer.send('blogInfo', {name: this.title});
	},
	methods: {
		goTo: function() {
			this.$router.push('/blog/'+this.title)
		}
	}
}
</script>

<style lang='scss'>
#contents {
	#title {
		color: #fff;
		height: 56px;
		line-height: 56px;
		#avatar {
			width: 48px;
			height: 48px;
			padding: 4px;
		}
	}
	#posts {
		background-color: #eee;
		padding: 1em;
		#count {
			position: absolute;
			right: 1em;
			color: #aaa;
			line-height: 1em;
		}
	}
}
</style>

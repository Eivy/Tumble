<template>
	<div>
		<div @scroll=onscroll id='header'>
			<div id='back' @click=back>back</div>
			<div id='blog'>{{blog}}</div>
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
	props: ['blog'],
	components: {Posts},
	data: function() {return {posts: []}},
	created: function() {
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.$data.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'next') {
				this.posts = msg.dashboard.posts.concat(this.$data.posts);
			}
		});
		ipcRenderer.send(this.$router.currentRoute.name, {name: this.blog});
	},
	beforeRouteUpdate: function(to, from, next) {
		console.log(to);
		this.posts = [];
		ipcRenderer.send(this.$router.currentRoute.name, {name: to.params.blog});
		next();
	},
	methods: {
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				if (obj.prevScrollTop > sidebar.scrollTop && sidebar.scrollTop < 100) {
					ipcRenderer.send('blog', {name: obj.blog, since_id: obj.posts[0].id});
				} else if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
					ipcRenderer.send('blog', {name: obj.blog, before_id: obj.posts[obj.posts.length - 1].id});
				}
				obj.prevScrollTop = sidebar.scrollTop;
			}, 200, this)
		},
		back: function() {
			this.$router.back();
		}
	}
}
</script>

<style scoped lang='scss'>
@import './base.scss';
#posts-cover {
	@include content;
}
#header {
	@include header;
	#blog {
		padding: 0;
		margin: 0;
		line-height: $headerHeight;
		height: $headerHeight;
	}
	#back {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>

<template>
	<div>
		<div @scroll=onscroll id='header'>
			<div id='back' @click=back>back</div>
			<div id='tag'>{{tag}}</div>
		</div>
		<div id='posts-cover' @scroll=onscroll >
			<Posts :posts=this.posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Posts from './SideBar/Posts.vue'

export default {
	props: ['tag'],
	components: {Posts},
	data: function() {return {posts: []}},
	created: function() {
		ipcRenderer.on('dashboard', (evt, msg) => {
			this.posts = this.posts.concat(msg.dashboard.posts);
		});
		ipcRenderer.send(this.$router.currentRoute.name, {tag: this.tag});
	},
	beforeRouteUpdate: function(to, from, next) {
		console.log(to);
		this.posts = [];
		ipcRenderer.send(this.$router.currentRoute.name, {tag: to.params.tag});
		next();
	},
	methods: {
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				if (obj.prevScrollTop > sidebar.scrollTop && sidebar.scrollTop < 100) {
					ipcRenderer.send(obj.$router.currentRoute.name, {tag: obj.tag, before: obj.posts[0].timestamp});
				} else if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
					ipcRenderer.send(obj.$router.currentRoute.name, {tag: obj.tag, before: obj.posts[obj.posts.length - 1].timestamp});
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

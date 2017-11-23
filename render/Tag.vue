<template>
	<div>
		<div id='header'>
			<div id='back' @click=back>back</div>
			<div id='tag'>{{tag}}</div>
		</div>
		<div id='posts-cover' @scroll='onscroll({tag: tag})'>
			<Posts :posts=this.posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Mixin from './Mixin.vue'

export default {
	props: ['tag'],
	mixins: [Mixin],
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

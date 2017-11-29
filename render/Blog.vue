<template>
	<div>
		<div id='header'>
			<div id='back' @click=back>back</div>
			<div id='blog'>{{blog}}</div>
			<div id='update' @click='update({name: blog})'>Update</div>
		</div>
		<div id='posts-cover' @scroll='onscroll({name: blog})' >
			<Posts :posts=posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Mixin from './Mixin.vue'

export default {
	props: ['blog'],
	mixins: [Mixin],
	created: function() {
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'before') {
				this.posts = this.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'after') {
				this.posts = msg.dashboard.posts.concat(this.posts);
			}
		});
		ipcRenderer.send(this.$router.currentRoute.name, {name: this.blog});
	},
	beforeRouteUpdate: function(to, from, next) {
		console.log(to);
		this.posts = [];
		ipcRenderer.send(this.$router.currentRoute.name, {name: to.params.blog});
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
	#update {
		@include update;
	}
}
</style>

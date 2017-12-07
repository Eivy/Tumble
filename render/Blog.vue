<template>
	<div>
		<div id='header'>
			<Icon id='back' @click.native=back name='angle-left'></Icon>
			<div id='blog'>{{blog}}</div>
			<Icon id='update' @click.native='update({name: blog})' name='refresh'></Icon>
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
		@include back;
	}
	#update {
		@include update;
	}
}
</style>

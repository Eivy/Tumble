<template>
	<div>
		<div id='header'>
			<Icon id='back' @click.native=back name='angle-left'></Icon>
			<div id='tag'>{{tag}}</div>
			<Icon id='update' @click.native='update({name: blog})' name='refresh'></Icon>
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
	#tag {
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

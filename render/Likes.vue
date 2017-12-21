<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Likes</h2></div>
			<div id='user'>{{name}}</div>
			<Icon id='update' @click.native='update({})' name='refresh'></Icon>
		</div>
		<div id='posts-cover' @scroll='onscroll({})' >
			<Posts :posts=posts />
		</div>
	</div>
</template>

<script>
import Store from 'electron-store'
var store = new Store();
import {ipcRenderer, remote} from 'electron'
import Mixin from './Mixin.vue'

export default {
	mixins: [Mixin],
	created: function() {
		this.name = remote.getCurrentWindow().webContents.user;
		console.log(ipcRenderer);
		ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
			store.set('cache.'+this.name+'.'+this.$router.currentRoute.name+'.posts', this.posts);
		});
	},
	mounted: function() {
		if (store.has('cache.'+this.name+'.'+this.$router.currentRoute.name)) {
			this.posts = store.get('cache.'+this.name+'.'+this.$router.currentRoute.name+'.posts');
		} else {
			ipcRenderer.send(this.$router.currentRoute.name, {});
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
	#update {
		@include update;
	}
}
</style>

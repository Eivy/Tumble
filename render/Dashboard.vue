<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Dashboard</h2></div>
			<div id='user'>{{name}}</div>
			<Icon id='update' @click.native='update({})' name='refresh'></Icon>
		</div>
		<div id='posts-cover' @scroll='onscroll({})'>
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
		ipcRenderer.on(this.$router.currentRoute.name, (evt, msg) => {
			if (store.get('config.distinct', false)) {
				var tmp = [];
				for(var item of this.posts) {
					if (tmp.find((i, index, array) => i.reblog_key === item.reblog_key) === undefined)
						tmp.push(item);
				}
				this.posts = tmp;
			}
		})
	},
	mounted: function() {
		if (store.has('cache.'+this.$router.currentRoute.name+'.posts')) {
			this.posts = store.get('cache.'+this.$router.currentRoute.name+'.posts');
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

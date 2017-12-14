<template>
	<div>
		<div id='header'>
			<div id='path'><h2>User</h2></div>
			<div id='user'>{{name}}</div>
			<Icon id='config' name='cog' @click.native='config'></Icon>
		</div>
		<div id='posts-cover'>
			<div class='info'>
				<LinkItem @click.native='goTo("/following/"+name)' :text='"Following"' :count=following ></LinkItem>
			</div>
			<div id='spacer'></div>
			<div v-for='blog in blogs' class='blog_info'>
				<div class='title'>{{blog.name}}</div>
				<LinkItem @click.native='goTo("/blog/"+blog.name)' :text='"Posts"'></LinkItem>
				<LinkItem @click.native='goTo("/followers/"+blog.name)' :text='"Follower"' :count=blog.followers ></LinkItem>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import {ipcRenderer} from 'electron'
import Icon from 'vue-awesome/components/Icon.vue'
import LinkItem from './LinkItem.vue'
import Config from './Contents/Config.vue'
export default {
	components: {Icon, LinkItem},
	data: function () { return {blogs: null, name: '', following: ''} },
	created: function() {
		ipcRenderer.send('user')
		ipcRenderer.removeAllListeners('user')
		ipcRenderer.on('user', (err, data) => {
			this.blogs = data.user.blogs;
			this.name = data.user.name;
			this.following = data.user.following;
		});
	},
	methods: {
		goTo: function(path) {
			this.$router.push(path)
		},
		config: function() {
			new Vue({
				el: '#contents',
				components: {Config},
				store: this.$store,
				template: '<Config></Config>'
			})
		}
	}
}
</script>

<style scoped lang='scss'>
@import "./base.scss";
#posts-cover {
	@include content;
	.title {
		@include separator;
	}
}
#header {
	@include header;
	#path {
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
	#config {
		@include update;
	}
}
</style>

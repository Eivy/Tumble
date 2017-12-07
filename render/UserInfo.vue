<template>
	<div>
		<div id='header'>
			<div id='path'><h2>User</h2></div>
			<div id='user'>{{name}}</div>
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
import {ipcRenderer} from 'electron'
import LinkItem from './LinkItem.vue'
export default {
	components: {LinkItem},
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
	#update {
		@include update;
	}
}
</style>

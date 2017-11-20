<template>
	<div>
		<div id='header'>
			<div id='title'><h2>Dashboard</h2></div>
			<div id='user'>{{name}}</div>
		</div>
		<div id='sidebar' @scroll=onscroll >
			<Posts id='posts' :posts=posts />
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import Posts from './SideBar/Posts.vue'

export default {
	components: {Posts},
	data: function() { return {name: '', posts: []} },
	created: function() {
		ipcRenderer.send('user');
		ipcRenderer.on('user', (evt, msg) => {
			this.$data.name = msg.user.name;
		});
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.$data.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'next') {
				this.posts = msg.dashboard.posts.concat(this.$data.posts);
			}
		});
		ipcRenderer.send(this.$router.currentRoute.name, {});
	},
	methods: {
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				if (obj.prevScrollTop > sidebar.scrollTop && sidebar.scrollTop < 100) {
					ipcRenderer.send('dashboard', {since_id: obj.posts[0].id});
				} else if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
					ipcRenderer.send('dashboard', {before_id: obj.posts[obj.posts.length - 1].id});
				}
				obj.prevScrollTop = sidebar.scrollTop;
			}, 200, this)
		}
	}
}
</script>

<style scoped lang='scss'>
#sidebar {
	position: absolute;
	padding: 0;
	margin: 0;
	top: 3em;
	bottom: 0;
	left: 0;
	width: 300px;
	overflow-x: unset;
	overflow-y: scroll;
	border-right: 1px solid #888;
}
#header {
	width: 300px;
	color: white;
	text-align: center;
	#title {
		padding: 0;
		margin: 0;
		line-height: 2em;
		height: 2em;
		> h2 {
			padding: 0;
			margin: 0;
		}
	}
	#user {
		line-height: 1em;
		height: 1em;
	}
}
</style>

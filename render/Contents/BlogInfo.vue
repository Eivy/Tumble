<template>
	<div id='contents'>
		<h4 class='title'>{{blog_name}}</h4>
		<div id='title'><img id='avatar' :src=avatar_url >{{blog.title}}</div>
		<LinkItem id='posts' :text='"Posts"' :count=blog.posts @click.native="goTo('/blog/'+blog_name)"></LinkItem>
		<LinkItem id='blog' :text='blog.url' @click.native=open(blog.url) ></LinkItem>
		<div id='spacer'></div>
		<div id='follow' v-if='blog.followed' @click=follow >UnFollow</div>
		<div id='follow' v-else @click=follow >Follow</div>
		<div ref='msg' id='msg'><div id='msg_in'>Faild to load Blog Infomation</div></div>
	</div>
</template>

<script>
import LinkItem from '../LinkItem.vue'
import { ipcRenderer } from 'electron'
export default {
	props: ['blog_name'],
	components: { LinkItem },
	data: function () { return { blog: {}, avatar_url: '' } },
	created: function () {
		ipcRenderer.on('avatar' + this.blog_name, (evt, msg) => {
			this.avatar_url = msg.avatar_url
		})
		ipcRenderer.send('avatar', { name: this.blog_name, size: 48 })
		ipcRenderer.on('blogInfo', (evt, msg) => {
			console.log(msg)
			if (msg.hasOwnProperty('blog')) {
				this.blog = msg.blog
			} else {
				this.$refs.msg.style.display = 'table'
			}
		})
		ipcRenderer.send('blogInfo', { name: this.blog_name })
		ipcRenderer.on('follow', (evt, msg) => {
			console.log(msg)
			ipcRenderer.send('blogInfo', { name: this.blog_name })
		})
		ipcRenderer.on('unfollow', (evt, msg) => {
			console.log(msg)
			ipcRenderer.send('blogInfo', { name: this.blog_name })
		})
	},
	methods: {
		follow: function () {
			if (this.blog.followed) {
				ipcRenderer.send('unfollow', { url: this.blog.url })
			} else {
				ipcRenderer.send('follow', { url: this.blog.url })
			}
		},
		open: function (path) {
			window.open(path)
		},
		goTo: function (path) {
			this.$router.push(path)
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
#contents {
	.title {
		@include header;
		position: relative;
	}
	#title {
		$height: 56px;
		color: #fff;
		height: $height;
		line-height: $height;
		#avatar {
			$padding: 4px;
			padding: $padding;
			width: $height - $padding*2;
			height: $height - $padding*2;
			vertical-align: middle;
		}
	}
	#follow {
		@include button;
	}
	#follow {
		text-align: center;
		font-style: bold;
	}
	#blog {
		display: block;
	}
	#spacer {
		height: $headerHeight;
	}
	#msg {
		position: absolute;
		display: none;
		background-color: rgba(255, 255, 255, 0.7);
		width: 100%;
		height: 100%;
		top: 0;
		#msg_in {
			width: 100%;
			height: 100%;
			display: table-cell;
			vertical-align: middle;
			text-align: center;
			color: #f00;
			font-size: xx-large;
		}
	}
}
</style>

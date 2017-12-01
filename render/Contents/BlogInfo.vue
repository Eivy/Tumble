<template>
	<div id='contents'>
		<h4 class='title'>{{blog_name}}</h4>
		<div id='title'><img id='avatar' :src=avatar_url >{{blog.title}}</div>
		<div id='posts' class='link' @click=goTo ><span>投稿</span><span id='count'>{{blog.posts}}</span><Icon class='goto' name='angle-right' scale='2'></Icon></div>
		<a id='blog' class='link' :href=blog.url >{{blog.url}}<Icon class='goto' name='angle-right' scale='2'></Icon></a>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import {ipcRenderer} from 'electron'
export default {
	props: ['blog_name'],
	components: {Icon},
	data: function() {return {blog: {}, avatar_url: ''}},
	created: function() {
		ipcRenderer.on('avatar', (evt, msg) => {
			this.avatar_url = msg.avatar_url;
		});
		ipcRenderer.send('avatar', {name: this.blog_name, size: 48});
		ipcRenderer.on('blogInfo', (evt, msg) => {
			console.log(msg);
			this.blog = msg.blog;
		});
		ipcRenderer.send('blogInfo', {name: this.blog_name});
	},
	methods: {
		goTo: function() {
			this.$router.push('/blog/'+this.blog_name)
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
	#posts, #blog {
		@include blogInfo;
	}
	#blog {
		display: block;
	}
}
</style>

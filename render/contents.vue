<template>
	<div id='contents'>
		<h4 class='title'>{{post.blog_name}}</h4>
		<div class='content'>
			<AnswerPost v-if="post.type === 'answer'" :post='post'/>
			<AudioPost v-else-if="post.type === 'audio'" :post='post'/>
			<ChatPost v-else-if="post.type === 'chat'" :post='post'/>
			<LinkPost v-else-if="post.type === 'link'" :post='post'/>
			<VideoPost v-else-if="post.type === 'video'" :post='post'/>
			<PhotoPost v-else-if="post.type === 'photo'" :post='post'/>
			<QuotePost v-else-if="post.type === 'quote'" :post='post'/>
			<TextPost v-else-if="post.type === 'text'" :post='post'/>
		</div>
		<div id="buttons">
			<div v-if='post.blog_name !== this.user' id="reblog" @click="doPost('reblog')" >Reblog</div>
			<div v-else id="reblog" @click="doPost('delete')" >Delete</div>
			<div v-if='post.liked' id="like" @click="doPost('unlike')" >UnLike</div>
			<div v-else id="like" @click="doPost('like')" >Like</div>
		</div>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import AnswerPost from './Contents/AnswerPost.vue'
import AudioPost from './Contents/AudioPost.vue'
import ChatPost from './Contents/ChatPost.vue'
import LinkPost from './Contents/LinkPost.vue'
import VideoPost from './Contents/VideoPost.vue'
import PhotoPost from './Contents/PhotoPost.vue'
import QuotePost from './Contents/QuotePost.vue'
import TextPost from './Contents/TextPost.vue'
export default {
	props: ['post'],
	components: {
		AnswerPost,
		AudioPost,
		ChatPost,
		LinkPost,
		VideoPost,
		PhotoPost,
		QuotePost,
		TextPost
	},
	data: function() { return {user: ''} },
	created: function() {
		this.user = global.user;
		ipcRenderer.on('reblog', (evt, msg) => {
			console.log(msg);
		});
		ipcRenderer.on('like', (evt, msg) => {
			console.log(msg);
			if (msg.type === 'like') {
				this.post.liked = true;
			} else {
				this.post.liked = false;
			}
		});
	},
	methods: {
		doPost: function(method) {
			ipcRenderer.send(method, {
				id: this.post.id,
				reblog_key: this.post.reblog_key
			});
		}
	}
}
</script>

<style scoped lang="scss">
@import "./base.scss";
#contents {
	.title {
		@include header;
	}
	#buttons {
		@include footer;
		div {
			display: inline-block;
			padding: 0 1ex 0 1ex;
			color: #fff;
		}
	}
}
.content {
	@include content;
}
.content /deep/ img {
	width: 100%;
}
</style>

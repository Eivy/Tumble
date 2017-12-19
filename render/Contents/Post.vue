<template>
	<div id='contents'>
		<h4 class='title'>{{post.blog_name}}</h4>
		<div id='content'>
			<AnswerPost v-if="post.type === 'answer'" :post='post'/>
			<AudioPost v-else-if="post.type === 'audio'" :post='post'/>
			<ChatPost v-else-if="post.type === 'chat'" :post='post'/>
			<LinkPost v-else-if="post.type === 'link'" :post='post'/>
			<VideoPost v-else-if="post.type === 'video'" :post='post'/>
			<PhotoPost v-else-if="post.type === 'photo'" :post='post'/>
			<QuotePost v-else-if="post.type === 'quote'" :post='post'/>
			<TextPost v-else-if="post.type === 'text'" :post='post'/>
		</div>
		<div id='buttons'>
			<div id='reblog' v-if='post.blog_name !== this.user' @click="doPost('reblog')" ><Icon name='retweet' scale=2></Icon></div>
			<div id='reblog' v-else @click="doPost('delete')"><Icon name='trash' scale=2></Icon></div>
			<div id='like' v-if='post.liked' @click="doPost('unlike')" ><Icon name='heart' scale=2></Icon></div>
			<div id='like' v-else @click="doPost('like')" ><Icon name='heart-o' scale=2></Icon></div>
			<div id='prev' @click='prev'><Icon name='angle-left' scale=2></Icon></div>
			<div id='next' @click='next'><Icon name='angle-right' scale=2></Icon></div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import {ipcRenderer} from 'electron'
import AnswerPost from './AnswerPost.vue'
import AudioPost from './AudioPost.vue'
import ChatPost from './ChatPost.vue'
import LinkPost from './LinkPost.vue'
import VideoPost from './VideoPost.vue'
import PhotoPost from './PhotoPost.vue'
import QuotePost from './QuotePost.vue'
import TextPost from './TextPost.vue'
export default {
	props: ['post'],
	components: {
		Icon,
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
		ipcRenderer.removeAllListeners('reblog');
		ipcRenderer.removeAllListeners('like');
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
			if (event.target.classList.contains('disabled')) {
				return;
			}
			ipcRenderer.send(method, {
				id: this.post.id,
				reblog_key: this.post.reblog_key
			});
			if (method === 'reblog') {
				event.target.classList.add('disabled');
			}
		},
		prev: function() {
			if (global.current === undefined) {
				global.current = document.getElementById('posts').lastChild;
			} else {
				if (global.current.previousElementSibling !== null) {
					global.current = current.previousElementSibling;
				}
			}
			global.current.firstChild.click();
			global.current.scrollIntoView(false);
		},
		next: function() {
			if (global.current === undefined) {
				global.current = document.getElementById('posts').firstChild;
			} else {
				if (global.current.nextElementSibling !== null) {
					global.current = current.nextElementSibling;
				}
			}
			global.current.firstChild.click();
			global.current.scrollIntoView(false);
		}
	}
}
</script>

<style scoped lang="scss">
@import "../base.scss";
#contents {
	.title {
		@include header;
	}
	#buttons {
		@include footer;
		div {
			display: inline-block;
			height: $headerHeight;
			width: $headerHeight / 2;
			padding: 0 ($headerHeight/2) 0 ($headerHeight/2);
			svg {
				width: 100%;
				height: 100%;
			}
		}
		.disabled {
			color: gray;
		}
	}
}
#content {
	@include content;
}
</style>

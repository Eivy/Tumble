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
		<div id="buttons">
			<div v-if='post.blog_name !== this.user' id="reblog" @click="doPost('reblog')" >Reblog</div>
			<div v-else id="reblog" @click="doPost('delete')" >Delete</div>
			<div v-if='post.liked' id="like" @click="doPost('unlike')" >UnLike</div>
			<div v-else id="like" @click="doPost('like')" >Like</div>
			<div id='prev' @click='prev'>Prev</div>
			<div id='next' @click='next'>Next</div>
		</div>
	</div>
</template>

<script>
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
			if (event.target.id === 'reblog') {
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
			padding: 0 1ex 0 1ex;
			color: #fff;
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

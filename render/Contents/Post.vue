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
			<div id='reblog' v-if='post.blog_name !== user' @click="doPost('reblog')" ><Icon name='retweet' scale=2></Icon></div>
			<div id='reblog' v-else @click="doPost('delete')"><Icon name='trash' scale=2></Icon></div>
			<div id='like' v-if='post.liked' @click="doPost('unlike')" ><Icon name='heart' scale=2></Icon></div>
			<div id='like' v-else @click="doPost('like')" ><Icon name='heart-o' scale=2></Icon></div>
			<div id='download' @click="download()"><Icon name='download' scale=2></Icon></div>
			<div id='prev' @click='prev'><Icon name='angle-left' scale=2></Icon></div>
			<div id='next' @click='next'><Icon name='angle-right' scale=2></Icon></div>
		</div>
		<div id='edit_reblog'>
			<div id='form'>
				<div class='input'>Comment:<input ref='comment' type='text'></input></div>
				<div class='input'>Tag:<input ref='tag' type='search' @search='addTag'></input></div>
				<div id='tags'><div v-for='(t, i) in post.tags' :key=i class='tag' @click='removeTag'>{{t}}</div></div>
				<div><div class='button' onclick='document.getElementById("edit_reblog").style.display = "none"'>Cancel</div><div class='button' @click='reblogEditted'>Reblog</div></div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import {ipcRenderer,remote} from 'electron'
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
	data: function() { return {user: remote.getCurrentWindow().webContents.user} },
	created: function() {
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
			if (method === 'reblog' && event.shiftKey) {
				document.getElementById('edit_reblog').style.display = 'block';
			} else {
				ipcRenderer.send(method, {
					id: this.post.id,
					reblog_key: this.post.reblog_key
				});
				if (method === 'reblog') {
					event.target.classList.add('disabled');
				}
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
		},
		addTag: function() {
			if (this.$refs.tag.value.length > 0)
				this.post.tags.push(this.$refs.tag);
		},
		removeTag: function() {
			this.post.tags.splice(this.post.tags.indexOf(event.target.innerHTML), 1);
		},
		reblogEditted: function() {
			if (this.$refs.tag.length > 0)
				alert('Tag not added.')
			else 
				ipcRenderer.send('reblog', {
					id: this.post.id,
					reblog_key: this.post.reblog_key,
					comment: this.$refs.comment.value,
					tags: this.post.tags.join(',')
				});
		},
		download: function() {
			for (var photo of this.post.photos) {
				ipcRenderer.send('download', {url: photo.original_size.url})
			}
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
	#content {
		@include content;
	}
	#edit_reblog {
		display: none;
		position: relative;
		width: 100%;
		height: 100%;
		background-color: rgba($backgroundColor, 0.8);
		#form {
			position: absolute;
			border-radius: 1em;
			padding: 1em;
			top: 50%;
			left: 50%;
			width: 50%;
			background-color: #fff;
			transform: translate(-50%, -50%);
			#tags {
				clear: right;
				height: $headerHeight*2;
				overflow-y: scroll;
				.tag {
					display: inline-block;
					margin: 2px;
					padding: 2px;
					border-radius: 5px;
					border: 1px solid #000;
					line-height: 1em;
					height: 1em;
					&:after {
						content: '×';
						padding-left: 5px;
					}
				}
			}
			.input {
				clear: right;
				input {
					float: right;
					border-radius: 5px;
					border: 1px solid #000;
					font-size: 100%;
					padding: 0;
					margin: 5px;
				}
			}
			.button {
				float: right;
				display: inline;
				border: 1px solid #888;
				border-radius: 0.5em;
				font-weight: bold;
				padding: 0.5em;
			}
		}
	}
}
</style>

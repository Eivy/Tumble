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
	}
}
</script>

<style scoped lang="scss">
@import "./size.scss";
#contents {
	background-color: #36465d;
	font-family: sans-serif;
	.title {
		position: fixed;
		text-align: center;
		background-color: $backgroundColor;
		color: #fff;
		top: 0;
		left: $sidebarSize;
		right: 0;
		height: $headerHeight;
		line-height: $headerHeight;
		opacity: 0.7;
		z-index: 99;
		margin: 0;
		padding: 0;
	}
}
.content {
	position: absolute;
	overflow-y: scroll;
	padding-top: $headerHeight;
	top: 0;
	bottom: 0;
	width: 100%;
}
.content /deep/ img {
	width: 100%;
}
</style>

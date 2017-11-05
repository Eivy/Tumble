<template>
	<div id='contents'>
		<div class='title'>{{post.blog_name}}</div>
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

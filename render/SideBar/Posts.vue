<template>
	<waterfall :line-gap='100' :watch=posts>
	<waterfall-slot class='post' v-for='(post, index) in posts' :order=index :key=post.id :width=postSize(post).width :height=postSize(post).height >
		<AnswerPost v-if="post.type === 'answer'" :post='post'/>
		<AudioPost v-else-if="post.type === 'audio'" :post='post'/>
		<ChatPost v-else-if="post.type === 'chat'" :post='post'/>
		<LinkPost v-else-if="post.type === 'link'" :post='post'/>
		<VideoPost v-else-if="post.type === 'video'" :post='post'/>
		<PhotoPost v-else-if="post.type === 'photo'" :post='post'/>
		<QuotePost v-else-if="post.type === 'quote'" :post='post'/>
		<TextPost v-else-if="post.type === 'text'" :post='post'/>
		<div v-else>{{post.type}}</div>
	</waterfall-slot>
	</waterfall>
</template>

<script>
import {ipcRenderer} from 'electron'
import {Waterfall,WaterfallSlot} from 'vue-waterfall'
import AnswerPost from './AnswerPost.vue'
import AudioPost from './AudioPost.vue'
import ChatPost from './ChatPost.vue'
import LinkPost from './LinkPost.vue'
import VideoPost from './VideoPost.vue'
import PhotoPost from './PhotoPost.vue'
import QuotePost from './QuotePost.vue'
import TextPost from './TextPost.vue'

export default {
	components: {
		Waterfall,
		WaterfallSlot,
		AnswerPost,
		AudioPost,
		ChatPost,
		LinkPost,
		VideoPost,
		PhotoPost,
		QuotePost,
		TextPost
	},
	props: ['posts'],
	methods: {
		postSize: function(post) {
			switch(post.type) {
				case 'photo':
					var height = 0.0;
					for(var i = 0; i < post.photos.length; i++) {
						height += post.photos[i].original_size.height / post.photos[i].original_size.width;
					}
					return {width: 1, height: height};
					break;
				default:
					return {width: 1, height: 1};
			}
			return {width: 1, height: 1};
		}
	}
}
</script>

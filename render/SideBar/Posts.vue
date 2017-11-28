<template>
	<waterfall @reflowed=reflowed id='posts' :line-gap=width :watch=posts >
	<waterfall-slot @click.native=contentsRender(post) class='post' v-for='(post, index) in posts' :order=index :key=post.id :width=postSize(post) :height=size[post.id] >
		<AnswerPost v-if="post.type === 'answer'" :post='post'/>
		<AudioPost v-else-if="post.type === 'audio'" :post='post'/>
		<ChatPost v-else-if="post.type === 'chat'" :post='post'/>
		<LinkPost v-else-if="post.type === 'link'" :post='post'/>
		<VideoPost v-else-if="post.type === 'video'" :post='post' @resize=resize />
		<PhotoPost v-else-if="post.type === 'photo'" :post='post'/>
		<QuotePost v-else-if="post.type === 'quote'" :post='post'/>
		<TextPost v-else-if="post.type === 'text'" :post='post'/>
		<div v-else>{{post.type}}</div>
	</waterfall-slot>
	</waterfall>
</template>

<script>
import {Waterfall,WaterfallSlot} from 'vue-waterfall'
import Vue from 'vue'
import Post from '../Contents/Post.vue'
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
	data: function() { return {width: 100, size: {}} },
	mounted: function() {
		this.width = document.getElementById('posts').parentNode.clientWidth / 3;
	},
	methods: {
		postSize: function(post) {
			if(this.size.hasOwnProperty(post.id)) {
				return 1;
			}
			switch(post.type) {
				case 'photo':
					var height = 0.0;
					for(var i = 0; i < post.photos.length; i++) {
						height += (post.photos[i].alt_sizes[2].height * 0.98) / post.photos[i].alt_sizes[2].width;
					}
					this.$set(this.size, post.id, height);
					break;
				default:
					this.$set(this.size, post.id, 1);
			}
			return 1;
		},
		contentsRender: function(post) {
			console.log(post)
			new Vue({
				el: '#contents',
				components: {Post},
				data: function() { return post },
				router: this.$router,
				template: '<Post v-bind:post=this />'
			})
			var target = event.target;
			while (!target.classList.contains('post')) {
				target = target.parentNode;
			}
			global.current = target
		},
		reflowed: function() {
			var p = document.getElementById('posts');
			if (p.parentNode.clientHeight == p.parentNode.scrollHeight && this.posts.length != 0) {
				p.style.height = (p.parentNode.scrollHeight * 2)+"px";
				p.parentNode.scrollTop = 1;
			}
		},
		resize: function(arg) {
			this.size[arg.id] = arg.height / arg.width;
		}
	}
}
</script>

<style scoped lang='scss'>
#posts .post {
	border: 1px solid transparent;
	overflow: hidden;
}
.post /deep/ div {
	background-color: #fff;
	font-size: x-small;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 3px;
	height: 100%;
	width: 100%;
}
.post /deep/ .link {
	background-color: #fff;
	font-weight: bold;
}
.post /deep/ .photo {
	background-color: transparent;
	padding: 0;
}
.post /deep/ .photo img {
	width: 100%;
	vertical-align: bottom;
}
.post /deep/ .video {
	background-color: transparent;
	padding: 0;
}
.post /deep/ .video div {
	background-color: transparent;
	padding: 0;
}
.post /deep/ .video img {
	width: 100%;
	vertical-align: bottom;
}
</style>

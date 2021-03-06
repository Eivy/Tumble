<template>
	<div id='posts'>
		<waterfall @reflowed=reflowed :line-gap=width :watch=posts >
		<waterfall-slot @click.native=contentsRender(post) class='post' v-for='(post, index) in posts' :order=index :key=post.id :width=postSize(post) :height=size[post.id] >
			<AnswerPost v-if="post.type === 'answer'" :post='post' @text_resize=resize />
			<AudioPost v-else-if="post.type === 'audio'" :post='post' @resize=resize />
			<ChatPost v-else-if="post.type === 'chat'" :post='post' @text_resize=resize />
			<LinkPost v-else-if="post.type === 'link'" :post='post' @text_resize=resize />
			<VideoPost v-else-if="post.type === 'video'" :post='post'/>
			<PhotoPost v-else-if="post.type === 'photo'" :post='post'/>
			<QuotePost v-else-if="post.type === 'quote'" :post='post' @text_resize=resize />
			<TextPost v-else-if="post.type === 'text'" :post='post' @text_resize=resize />
			<div v-else>{{post.type}}</div>
		</waterfall-slot>
		</waterfall>
		<div id='marker'></div>
	</div>
</template>

<script>
import { Waterfall, WaterfallSlot } from 'vue-waterfall'
import Store from 'electron-store'
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

const store = new Store()

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
	data: function () {
		return {
			size: {}
		}
	},
	mounted: function () {
		this.$store.commit('valueChange', { name: 'thumb_size', value: store.get('config.thumb_size', 3) })
		this.$store.commit('valueChange', { name: 'distinct', value: store.get('config.distinct', false) })
	},
	computed: {
		width () {
			var el = document.getElementById('posts-cover')
			return (el ? document.getElementById('posts-cover').clientWidth : 300) / this.$store.state.thumb_size
		}
	},
	methods: {
		postSize: function (post) {
			if (this.size.hasOwnProperty(post.id)) {
				return 1
			}
			switch (post.type) {
			case 'photo':
				var height = 0.0
				for (var i = 0; i < post.photos.length; i++) {
					height += (post.photos[i].alt_sizes[2].height * 0.98) / post.photos[i].alt_sizes[2].width
				}
				this.$set(this.size, post.id, height)
				break
			case 'video':
				this.$set(this.size, post.id, post.thumbnail_height / post.thumbnail_width)
				break
			default:
				this.$set(this.size, post.id, 1)
			}
			return 1
		},
		contentsRender: function (post) {
			console.log(post)
			const contents = new Vue({
				components: { Post },
				data: function () { return post },
				router: this.$router,
				template: '<Post v-bind:post=this />'
			})
			contents.$mount('#contents')
			var target = event.target
			while (!target.classList.contains('post')) {
				target = target.parentNode
			}
			global.current = target
			var marker = global.marker
			marker.style.top = 'calc(' + global.current.style.top + ' + ' + global.current.parentNode.offsetTop + 'px)'
			marker.style.left = global.current.style.left
			marker.style.width = global.current.style.width
			marker.style.height = global.current.style.height
		},
		reflowed: function () {
			const postsCover = document.getElementById('posts-cover')
			const posts = document.getElementById('posts')
			if (postsCover.clientHeight > posts.scrollHeight && this.posts.length !== 0) {
				posts.style.height = (postsCover.clientHeight + 10) + 'px'
				postsCover.scrollTop = 10
			}
		},
		resize: function (arg) {
			this.size[arg.id] = arg.height / arg.width
		}
	}
}
</script>

<style scoped lang='scss'>
#posts .post {
	border: 1px solid rgba(0, 0, 0, 0.5);
	overflow: hidden;
}
#marker {
	position: absolute;
	background-color: #000;
	opacity: 0.5;
	z-index: 999;
	transition: .2s;
}
.post > div {
	background-color: #fff;
	font-size: xx-small;
	overflow: hidden;
	padding: 3px;
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
	display: block;
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
.post /deep/ .audio {
	background-color: transparent;
	padding: 0;
}
.post /deep/ .audio div {
	background-color: transparent;
	padding: 0;
}
</style>

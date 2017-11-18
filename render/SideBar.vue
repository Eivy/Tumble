<template>
	<div id='sidebar' @scroll=onscroll>
		<waterfall id='waterfall' :line-gap='100' :watch=posts>
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
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import {Waterfall,WaterfallSlot} from 'vue-waterfall'
import AnswerPost from './SideBar/AnswerPost.vue'
import AudioPost from './SideBar/AudioPost.vue'
import ChatPost from './SideBar/ChatPost.vue'
import LinkPost from './SideBar/LinkPost.vue'
import VideoPost from './SideBar/VideoPost.vue'
import PhotoPost from './SideBar/PhotoPost.vue'
import QuotePost from './SideBar/QuotePost.vue'
import TextPost from './SideBar/TextPost.vue'

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
	data: function() {return {posts: []}},
	created: function() {
		ipcRenderer.on('dashboard', (evt, msg) => {
			if (msg.type === 'prev') {
				this.posts = this.$data.posts.concat(msg.dashboard.posts);
			} else if (msg.type === 'next') {
				this.posts = msg.dashboard.posts.concat(this.$data.posts);
			}
		});
		ipcRenderer.send('dashboard', {});
	},
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
		},
		onscroll: function() {
			clearTimeout(this.scrollTimeOut)
			this.scrollTimeOut = setTimeout(function(obj) {
				if (obj.prevScrollTop > sidebar.scrollTop && sidebar.scrollTop < 100) {
					ipcRenderer.send('dashboard', {since_id: obj.posts[0].id});
				} else if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
					ipcRenderer.send('dashboard', {before_id: obj.posts[obj.posts.length - 1].id});
				}
				obj.prevScrollTop = sidebar.scrollTop;
			}, 200, this)
		}
	}
}
</script>

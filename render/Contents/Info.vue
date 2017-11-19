<template>
	<div class='info'>
		<div class='separator'>Info</div>
		<div @click=blog(post.blog_name)>{{post.blog_name}}</div>
		<div v-if='post.reblogged_from_name !== undefined' @click=blog(post.reblogged_from_name)>reblogged: {{post.reblogged_from_name}}</div>
		<div v-if='post.reblogged_root_name !== undefined' @click=blog(post.reblogged_root_name)>original: {{post.reblogged_root_name}}</div>
		<div>{{new Date(post.timestamp*1000).toLocaleString()}}</div>
		<div>{{post.note_count}} notes</div>
	</div>
</template>

<script>
import Vue from 'vue'
import BlogInfo from './BlogInfo.vue'
export default {
	props: ['post'],
	methods: {
		blog: function(title) {
			new Vue({
				el: '#contents',
				components: {BlogInfo},
				router: this.$router,
				data: {title: title},
				template: '<BlogInfo :title=title />'
			})
		}
	}
}
</script>

<template>
	<div id='info'>
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
		blog: function(blog_name) {
			new Vue({
				el: '#contents',
				components: {BlogInfo},
				router: this.$router,
				data: {blog_name: blog_name},
				template: '<BlogInfo :blog_name=blog_name />'
			})
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
#info {
	background-color: $backgroundColor;
	color: #fff;
}
#info div {
	border-bottom: 1px solid #888;
	margin-left: 50px;
	min-height: 30px;
	line-height: 30px;
}
#info .separator {
	margin: 1px 0px 1px 0px;
	background-color: #56667d;
	min-height: 20px;
	line-height: 20px;
}
</style>

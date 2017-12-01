<template>
	<div class='info'>
		<div class='separator'>Info</div>
		<div @click=blog(post.blog_name)>{{post.blog_name}}</div>
		<div class='link' v-if='post.reblogged_from_name !== undefined' @click=blog(post.reblogged_from_name)>reblogged: {{post.reblogged_from_name}}<Icon class='goto' name='angle-right' scale='2'></Icon></div>
		<div class='link' v-if='post.reblogged_root_name !== undefined' @click=blog(post.reblogged_root_name)>original: {{post.reblogged_root_name}}<Icon  class='goto' name='angle-right' scale='2'></Icon></div>
		<div>{{new Date(post.timestamp*1000).toLocaleString()}}</div>
		<div>{{post.note_count}} notes</div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Vue from 'vue'
import BlogInfo from './BlogInfo.vue'
export default {
	props: ['post'],
	components: {Icon},
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
.info {
	@include info;
}
</style>

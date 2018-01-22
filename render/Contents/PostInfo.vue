<template>
	<div class='info'>
		<div class='separator'>Info</div>
		<LinkItem :text=post.blog_name @click.native=blog(post.blog_name) ></LinkItem>
		<LinkItem v-if='post.reblogged_from_name !== undefined' :text="'reblogged: ' + post.reblogged_from_name" @click.native=blog(post.reblogged_from_name)></LinkItem>
		<LinkItem v-if='post.reblogged_from_name !== post.reblogged_root_name && post.reblogged_root_name !== undefined' :text="'original: ' + post.reblogged_root_name" @click.native=blog(post.reblogged_root_name)></LinkItem>
		<div>{{new Date(post.timestamp*1000).toLocaleString()}}</div>
		<div>{{post.note_count}} notes</div>
	</div>
</template>

<script>
import Vue from 'vue'
import LinkItem from '../LinkItem.vue'
import BlogInfo from './BlogInfo.vue'
export default {
	props: ['post'],
	components: { LinkItem },
	methods: {
		blog: function (blog_name) {
			Vue({
				el: '#contents',
				components: { BlogInfo },
				router: this.$router,
				data: { blog_name: blog_name },
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
	.link {
		@include link_in_content;
	}
}
</style>

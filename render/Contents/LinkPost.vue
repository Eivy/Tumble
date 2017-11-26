<template>
	<div>
		<div class='link' >
			<a :href=post.url>{{post.title}}</a>
			<div>{{post.excerpt}}</div>
			<img v-for="photo in post.photos" :src=photo.original_size.url>
			<div v-html=post.description ></div>
		</div>
		<div>
			<PostInfo v-bind:post=post />
			<PostTag v-if='post.tags.length > 0' v-bind:post=post />
		</div>
	</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.link {
	background-color: #fff;
	padding: $contentPadding;
	img {
		width: 100%;
		vertical-align: bottom;
	}
}
</style>

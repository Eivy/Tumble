<template>
	<div>
		<div class='photo' >
			<img v-for="photo in post.photos" :class='{block: post.is_blocks_post_format, single: post.photos.length === 1}' :src=photo.original_size.url>
		</div>
			<div>
				<PostCaption v-if='post.caption.length > 0' v-bind:post=post />
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
.photo {
	color: #fff;
	background-color: transparent;
	text-align: center;
	img {
		display: block;
		vertical-align: bottom;
		width: 100%;
		max-width: 100%;
		object-fit: contain;
		margin: 0 auto;
	}
	.block {
		display: inline;
		width: auto;
		max-height: 90vh;
	}
	.single{
		height: 90vh;
		width: auto;
	}
}
</style>

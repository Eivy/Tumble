<template>
	<div>
		<div class='photo' >
			<img v-for="photo in post.photos" :src=photo.original_size.url>
		</div>
			<div>
				<PostCaption v-if='post.caption.length > 0' v-bind:post=post />
				<PostInfo v-bind:post=post />
				<Tag v-if='post.tags.length > 0' v-bind:post=post />
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
}
img {
	width: 100%;
	vertical-align: bottom;
}
</style>

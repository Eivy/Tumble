<template>
	<div class='photo' >
		<img v-for="photo in post.photos" :src=photo.original_size.url>
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
.photo /deep/ .info div {
	border-bottom: 1px solid #888;
	margin-left: 50px;
	min-height: 30px;
	line-height: 30px;
}
.photo /deep/ .info .separator {
	margin: 1px 0px 1px 0px;
	background-color: #56667d;
	min-height: 20px;
	line-height: 20px;
}
</style>

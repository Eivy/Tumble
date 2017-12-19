<template>
	<div>
		<div class='video' v-html=post.player[post.player.length-1].embed_code />
		<div
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
	mixins: [Mixin],
	mounted: function() {
		var video = document.getElementsByTagName('video')[0];
		video.setAttribute('controls', '');
		video.setAttribute('preload', 'metadata');
		video.removeAttribute('muted', '');
	}
}
</script>

<style scoped lang='scss'>
.video {
	text-align: center;
	overflow: auto;
}
.video /deep/ video {
	max-width: 100% !important;
	max-height: 85vh !important;
	object-fit: contain !important;
}
</style>

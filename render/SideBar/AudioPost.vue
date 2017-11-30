<template>
	<div class='audio'>
		<img v-if='post.hasOwnProperty("album_art")' ref='img' @load=resize :src=post.album_art ></img>
		<div class='title' >{{post.hasOwnProperty('source_title') ? post.source_title : post.slug}}</div>
		<div class='play mark'>Audio</div>
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
$textShadow:  0px 0px 2px $backgroundColor;
.audio {
	position: relative;
	.title {
		position: absolute;
		top: 0;
		left: 0;
		padding: 3px;
		color: #fff;
		text-shadow: $textShadow;
	}
	.play.mark {
		background-color: transparent;
		color: #fff;
		text-shadow: $textShadow;
		position: absolute;
		height: 1em;
		top: 50%;
		text-align: center;
		font-size: xx-large;
		transform: translate(0, -50%);
	}
	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
}
</style>

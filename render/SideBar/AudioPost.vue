<template>
	<div class='audio'>
		<img v-if='post.hasOwnProperty("album_art")' ref='img' @load=resize :src=post.album_art ></img>
		<div class='title' >{{post.hasOwnProperty('source_title') ? post.source_title : post.slug}}</div>
		<Icon name='music' class='play mark'></Icon>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	components: { Icon }
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
		opacity: 0.6;
		background-color: transparent;
		color: #fff;
		text-shadow: $textShadow;
		position: absolute;
		height: 1em;
		top: 50%;
		width: 100%;
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

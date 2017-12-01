<template>
	<div ref='root' class='video'>
		<img ref='img' @load=resize :src=thumbs ></img>
		<Icon name='youtube-play' class='play mark'></Icon>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	components: {Icon},
	computed: {
		thumbs: function() {
			var parser = new DOMParser();
			var video = parser.parseFromString(this.post.player[0].embed_code, "text/html");
			return video.getElementsByTagName('video')[0].poster;

		}
	}
}
</script>

<style scoped lang='scss'>
.video {
	position: relative;
	.play.mark {
		color: #fff;
		position: absolute;
		opacity: 0.6;
		height: 1em;
		top: 50%;
		width: 100%;
		text-align: center;
		font-size: xx-large;
		transform: translate(0, -50%);
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>

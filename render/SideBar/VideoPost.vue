<template>
	<div ref='root' class='video'>
		<img ref='img' @load=resize :src=thumbs ></img>
		<div class='play mark'>Video</div>
	</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	computed: {
		thumbs: function() {
			var parser = new DOMParser();
			var video = parser.parseFromString(this.post.player[0].embed_code, "text/html");
			return video.getElementsByTagName('video')[0].poster;

		}
	},
	methods: {
		resize: function() {
			var img = this.$refs.img;
			this.$emit('resize', {id: this.post.id, width: img.naturalWidth, height: img.naturalHeight});
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
		height: 1em;
		top: 50%;
		text-align: center;
		font-size: xx-large;
		transform: translate(0, -50%);
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
}
</style>

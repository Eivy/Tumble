<template>
	<div>
		<div class='quote' >
			<div id='text' v-html=post.text ></div>
			<div id='source' v-html=post.source ></div>
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
.quote {
	background-color: #fff;
	padding: $contentPadding;
	#source {
		padding: $contentPadding;
		padding-top: $contentPadding * 3;
	}
}
</style>

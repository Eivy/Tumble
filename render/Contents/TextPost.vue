<template>
	<div>
		<div class='text' >
			<h4>{{post.title}}</h4>
			<div v-html=post.body ></div>
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
.text {
	background-color: #fff;
	padding: $contentPadding;
	h4 {
		margin: 0;
	}
}
</style>

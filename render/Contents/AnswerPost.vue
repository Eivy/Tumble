<template>
	<div>
		<div class='answer_post' >
			<div class='question'>
				<blockquote :cite=post.asking_url v-html=post.question ></blockquote>
				<blockquote class='questioner'>{{post.asking_name}}</blockquote>
			</div>
			<div class='answer' v-html=post.answer ></div>
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
.answer_post {
	background-color: #fff;
	padding: $contentPadding;
	.question {
		font-style: italic;
		.questioner {
			text-align: right;
		}
	}
}
</style>

<template>
	<div>
		<div class='chat' >
			<h4>{{post.title}}</h4>
			<div class='dialogue' v-for="dialogue in post.dialogue" >
				<div class='name'>{{dialogue.name}}</div>
				<div class='phrase'>{{dialogue.phrase}}</div>
			</div>
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
.chat {
	background-color: #fff;
	padding: $contentPadding;
	.dialogue {
		margin: $contentPadding;
		.name {
			font-weight: bold;
		}
		.phrase {
			padding-left: $contentPadding;
		}
	}
}
</style>

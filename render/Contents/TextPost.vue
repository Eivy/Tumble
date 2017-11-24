<template>
	<div class='text' >
		<h4>{{post.title}}</h4>
		<div v-html=post.body ></div>
		<div>
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
@import '../base.scss';
.text {
	background-color: #fff;
	h4 {
		margin: 0;
	}
}
.text /deep/ .info {
	background-color: $backgroundColor;
}
.text /deep/ .info div {
	color: #fff;
	border-bottom: 1px solid #888;
	margin-left: 50px;
	min-height: 30px;
	line-height: 30px;
}
.text /deep/ .info .separator {
	margin: 1px 0px 1px 0px;
	background-color: #56667d;
	min-height: 20px;
	line-height: 20px;
}
</style>

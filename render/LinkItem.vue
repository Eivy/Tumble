<template>
	<div class='link'>
		<span>{{text}}</span>
		<Icon class='angle' name='angle-right' scale='2'></Icon>
		<span class='count' v-if='count !== undefined'>{{count}}</span>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
	components: { Icon },
	props: ['text', 'count']
}
</script>

<style scoped lang='scss'>
@import 'base.scss';
.link {
	@include button;
	float: clear;
	.count {
		float: right;
		color: #aaa;
		padding-right: 1em;
	}
	.angle {
		float: right;
		color: gray;
		height: 100%;
		padding-right: 5px;
	}
}
</style>

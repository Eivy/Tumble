<template>
	<div id='links'>
		<div id='dashboard' @click="goTo('/dashboard')"><Icon name='dashboard'></Icon></div>
		<div id='likes' @click="goTo('/likes')"><Icon name='heartbeat'></Icon></div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
	components: {Icon},
	methods: {
		goTo: function(target) {
			this.$router.push(target);
		}
	}
}
</script>

<style scoped lang='scss'>
@import "./base.scss";
#links {
	@include footer;
	width: $sidebarSize;
	div {
		display: inline-block;
		height: $headerHeight;
		width: $headerHeight / 2;
		padding: 0 ($headerHeight/2) 0 ($headerHeight/2);
		svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

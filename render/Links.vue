<template>
	<div id='links'>
		<div class='button' @click="goTo('/dashboard')">Dashboard</div>
		<div class='button' @click="goTo('/likes')">Likes</div>
	</div>
</template>

<script>
export default {
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
	.button {
		display: inline-block;
	}
}
</style>

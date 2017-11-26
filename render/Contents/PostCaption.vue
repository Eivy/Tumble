<template>
	<div class='info'>
		<div class='separator'>Caption</div>
		<div class='caption' v-html=post.caption ></div>
	</div>
</template>

<script>
export default {
	props: ['post']
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.info {
	@include info;
}
</style>

<template>
	<div id='info'>
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
#info {
	background-color: $backgroundColor;
}
#info div {
	border-bottom: 1px solid #888;
	margin-left: 50px;
	min-height: 30px;
	line-height: 30px;
}
#info .separator {
	margin: 1px 0px 1px 0px;
	background-color: #56667d;
	min-height: 20px;
	line-height: 20px;
}
</style>

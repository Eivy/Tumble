<template>
	<div id='header'>
		<div id='name' :style="{height: 'user !== undefined ? 3em : 2em'}">{{user !== undefined ? "Dashboard" : blog.name}}</div>
		<div v-if='user !== undefined' style='height: 1em'>{{user !== undefined ? user.name : blog.name}}</div>
	</div>
</template>

<script>
export default {
	props: ['user', 'blog']
}
</script>

<style scoped lang='scss'>
div {
	padding: 0;
	margin: 0;
	color: white;
	text-align: center;
}
#header {
	border-right: 1px solid #888;
	position: relative;
	width: 300px;
	height: 3em;
}
#name {
	font-size: x-large;
}
</style>

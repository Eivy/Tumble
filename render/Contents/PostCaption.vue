<template>
	<div class='info'>
		<div class='separator'>Caption</div>
		<div v-html=post.caption ></div>
	</div>
</template>

<script>
export default {
	props: ['post']
}
</script>

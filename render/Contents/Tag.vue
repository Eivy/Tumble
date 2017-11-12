<template>
	<div class='info'>
	<div class='separator'>Tags</div>
	<div v-for="tag in post.tags">{{tag}}</div>
	</div>
</template>

<script>
export default {
	props: ['post']
}
</script>

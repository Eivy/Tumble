<template>
	<div class='info'>
	<div class='separator'>Tags</div>
	<div v-for="tag in post.tags" @click=goTo(tag) >{{tag}}</div>
	</div>
</template>

<script>
export default {
	props: ['post'],
	methods: {
		goTo: function(tag) {
			this.$router.push('/tag/'+tag);
		}
	}
}
</script>

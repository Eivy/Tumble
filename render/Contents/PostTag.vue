<template>
	<div class='info'>
	<div class='separator'>Tags</div>
	<div class='link' v-for="tag in post.tags" @click=goTo(tag) >{{tag}}<Icon class='goto' name='angle-right' scale='2'></Icon></div>
	</div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
	props: ['post'],
	components: {Icon},
	methods: {
		goTo: function(tag) {
			this.$router.push('/tag/'+tag);
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.info {
	@include info;
}
</style>

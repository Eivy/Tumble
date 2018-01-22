<template>
	<div class='info'>
		<div class='separator'>Tags</div>
		<LinkItem v-for="(tag, key) in post.tags" :key=tag class='tag' :text=tag @click.native=goTo(tag)></LinkItem>
	</div>
</template>

<script>
import LinkItem from '../LinkItem.vue'
export default {
	props: ['post'],
	components: { LinkItem },
	methods: {
		goTo: function (tag) {
			this.$router.push('/tag/' + tag)
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.info {
	@include info;
	.tag {
		@include link_in_content;
	}
}
</style>

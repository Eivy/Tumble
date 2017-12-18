<template>
	<div class='text'>
		<h4 v-if='post.title'>{{post.title}}</h4>
		<div v-else>{{sanitizeText}}</div>
	</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	computed: {
		sanitizeText: function() {
			var e = document.createElement('div');
			e.innerHTML = this.post.body;
			return e.textContent;
		}
	},
	mounted: function () {
		setTimeout((obj) => {
			var w = obj.$el.offsetWidth;
			var h = obj.$el.offsetHeight;
			this.$emit('text_resize', {id: obj.post.id, width: 1, height: h/w < 1 ? h/w : 1});
		}, 300, this)
	}
}
</script>

<style scoped lang='scss'>
.text {
	h4 {
		margin-top: 0;
		margin-bottom: 0;
	}
}
</style>

<template>
	<div class='link'>{{post.title ? post.title : post.url}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	mounted: function () {
		setTimeout((obj) => {
			var w = obj.$el.offsetWidth;
			var h = obj.$el.offsetHeight;
			this.$emit('text_resize', {id: obj.post.id, width: 1, height: h/w < 1 ? h/w : 1});
		}, 300, this)
	}
}
</script>

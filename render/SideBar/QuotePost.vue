<template>
	<div class='quote'>{{sanitizeText}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	mounted: function () {
		setTimeout((obj) => {
			var w = obj.$el.offsetWidth
			var h = obj.$el.offsetHeight
			this.$emit('text_resize', { id: obj.post.id, width: 1, height: h / w < 1 ? h / w : 1 })
		}, 300, this)
	},
	computed: {
		sanitizeText: function () {
			var e = document.createElement('div')
			e.innerHTML = this.post.text
			return e.textContent
		}
	}
}
</script>

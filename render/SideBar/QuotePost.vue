<template>
	<div class='quote'>{{sanitizeText}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin],
	computed: {
		sanitizeText: function() {
			var e = document.createElement('div');
			e.innerHTML = this.post.text;
			return e.textContent;
		}
	}
}
</script>

<template>
	<div class='text'><h4>{{post.title}}</h4><div>{{sanitizeText}}</div></div>
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
	}
}
</script>

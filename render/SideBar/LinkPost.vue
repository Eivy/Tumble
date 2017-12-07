<template>
	<div class='link'>{{post.title ? post.title : post.url}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

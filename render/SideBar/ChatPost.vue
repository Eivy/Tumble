<template>
	<div class='chat'>{{post.title === null || post.title === undefined ? post.body : post.title}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

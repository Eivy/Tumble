<template>
	<div class='link' @click=contentsRender(post) >{{post.title}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

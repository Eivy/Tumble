<template>
	<div class='chat' @click=contentsRender(post) >{{post.blog_name}}<br/>chat</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

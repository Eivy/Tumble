<template>
	<div class='answer' @click=contentsRender(post) >{{post.blog_name}}<br/>Answer</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

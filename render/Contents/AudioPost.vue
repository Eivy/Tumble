<template>
	<div class='audio' @click=contentsRender(post) >{{post.blog_name}}<br/>audio</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

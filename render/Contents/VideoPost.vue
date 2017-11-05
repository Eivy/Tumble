<template>
	<div class='video' @click=contentsRender(post) >{{post.blog_name}}<br/>Video</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

<template>
	<div class='answer'>{{post.blog_name}}<br/>Answered to {{post.asking_name}}</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

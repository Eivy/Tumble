<template>
	<div class='photo' @click=contentsRender(post) >
		<img v-for="photo in post.photos" :src=photo.alt_sizes[2].url>
	</div>
</template>

<script>
import Mixin from './Mixin.vue'
export default {
	mixins: [Mixin]
}
</script>

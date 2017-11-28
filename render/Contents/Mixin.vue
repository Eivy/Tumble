<script>
import Vue from 'vue'
import Post from './Post.vue'
import PostTag from './PostTag.vue'
import PostInfo from './PostInfo.vue'
import PostCaption from './PostCaption.vue'
export default {
	props: ['post'],
	components: {
		Post,
		PostCaption,
		PostInfo,
		PostTag
	}
}
</script>

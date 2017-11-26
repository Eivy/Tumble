<script>
import Vue from 'vue'
import Contents from '../Contents.vue'
import PostTag from './PostTag.vue'
import PostInfo from './PostInfo.vue'
import PostCaption from './PostCaption.vue'
export default {
	props: ['post'],
	components: {
		Contents,
		PostCaption,
		PostInfo,
		PostTag
	}
}
</script>

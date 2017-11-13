<script>
import Vue from 'vue'
import Contents from '../Contents.vue'
import Tag from './Tag.vue'
import Info from './Info.vue'
import PostCaption from './PostCaption.vue'
export default {
	props: ['post'],
	components: {
		Contents,
		PostCaption,
		Info,
		Tag
	}
}
</script>

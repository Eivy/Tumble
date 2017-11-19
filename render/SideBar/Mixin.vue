<script>
import Vue from 'vue'
import Contents from '../Contents.vue'
export default {
	props: ['post'],
	components: {
		Contents
	},
	methods: {
		contentsRender: function(post) {
			console.log(post)
			new Vue({
				el: '#contents',
				components: {Contents},
				data: function() { return post },
				router: this.$router,
				template: '<Contents v-bind:post=this />'
			})
		}
	}
}
</script>

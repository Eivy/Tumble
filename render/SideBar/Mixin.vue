<script>
export default {
	props: ['post'],
	methods: {
		resize: function() {
			var img = this.$refs.img;
			this.$emit('resize', {id: this.post.id, width: img.naturalWidth, height: img.naturalHeight});
		}
	}
}
</script>

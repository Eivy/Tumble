<template>
	<div id='contents'>
		<h4 class='title'>Config</h4>
		<div id='content'>
			<div class='group'>
				<div class='subtitle'>Thumbnail</div>
				<div id='line-count' class='item'>
					<span class='name'>Size</span>
					<div class='value'>
						<select v-model='thumb_size' @change='thumbSizeApply'>
							<option value='1'>Extra Large</option>
							<option value='2'>Large</option>
							<option value='3'>Normal</option>
							<option value='4'>Small</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Store from 'electron-store'

const store = new Store();

export default {
	data: function () { return store.get('config', {}) },
	methods: {
		thumbSizeApply: function () {
			store.set('config.thumb_size', event.target.value);
			this.$store.commit('thumb_size', {size: event.target.value});
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
.title {
	@include header;
}
#content {
	@include content;
	.subtitle {
		@include separator;
		color: #fff;
	}
	.item {
		@include button;
		float: clear;
		.value {
			display: inline-block;
			float: right;
		}
	}
}
</style>

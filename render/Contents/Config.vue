<template>
	<div id='contents'>
		<h4 class='title'>Config</h4>
		<div id='content'>
			<div class='group'>
				<div class='subtitle'>Thumbnail</div>
				<div id='line-count' class='item'>
					<span class='name'>Size</span>
					<div class='value'>
						<select v-model='thumb_size' @change='apply("thumb_size")'>
							<option value='1'>Extra Large</option>
							<option value='2'>Large</option>
							<option value='3'>Normal</option>
							<option value='4'>Small</option>
						</select>
					</div>
				</div>
			</div>
			<div class='group'>
				<div class='subtitle'>Dashboard</div>
				<div id='line-count' class='item'>
					<span class='name'>Hide same Posts</span>
					<div class='value'>
						<label class='switch'>
							<input type='checkbox' v-model='distinct' @change='apply("distinct")'>
							<span class='slider round'></span>
						</label>
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
		apply: function (name) {
			store.set('config.'+name, event.target.type == 'checkbox' ? event.target.checked : event.target.value);
			this.$store.commit('valueChange', {name: name, value: event.target.type == 'checkbox' ? event.target.checked : event.target.value});
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
			.switch {
				position: relative;
				display: inline-block;
				width: 60px;
				height: 34px;
				input {display:none;}
			}
			.slider {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #ccc;
				transition: .4s;
				border-radius: 34px;
				&:before {
					position: absolute;
					content: "";
					height: 26px;
					width: 26px;
					left: 4px;
					bottom: 4px;
					background-color: white;
					transition: .4s;
					border-radius: 50%;
				}
			}
			input:checked + .slider {
				background-color: #2196F3;
			}
			input:focus + .slider {
				box-shadow: 0 0 1px #2196F3;
			}
			input:checked + .slider:before {
				transform: translateX(26px);
			}
		}
	}
}
</style>

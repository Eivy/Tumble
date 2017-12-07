<template>
	<div class='blog'>
		<img class='avatar' :src=avatar_url ></img>
		<span>{{blog_name}}</span>
		<Icon class='angle' name='angle-right' scale='2'></Icon>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
	props: ['blog_name'],
	data: function() { return {avatar_url: null} },
	components: {Icon},
	created: function() {
		ipcRenderer.removeAllListeners('avatar'+this.blog_name)
		ipcRenderer.on('avatar'+this.blog_name, (evt, msg) => {
			this.avatar_url = msg.avatar_url;
		});
		ipcRenderer.send('avatar', {name: this.blog_name, size: 48});
	}
}
</script>

<style scoped lang='scss'>
@import '../base.scss';
$height: 3em;
.blog {
	@include button;
	padding: 0;
	height: $height;
	line-height: $height;
	font-size: small;
	float: clear;
	.avatar {
		float: left;
		height: 100%;
		min-width: $height;
		background-color: #aaa;
	}
	.angle {
		float: right;
		color: gray;
		height: 100%;
		padding-right: 5px;
	}
}
</style>

<template>
	<div>
	<div id='header'>
		<div id='title'><h2>Dashboard</h2></div>
		<div id='user'>{{name}}</div>
	</div>
	<SideBar/>
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'
import SideBar from './SideBar.vue'

export default {
	components: {SideBar},
	data: function() { return {name: ''} },
	created: function() {
		ipcRenderer.send('user');
		ipcRenderer.on('user', (evt, msg) => {
			this.$data.name = msg.user.name;
		});
	}
}
</script>

<style scoped lang='scss'>
#header {
	border-right: 1px solid #888;
	position: relative;
	width: 300px;
	color: white;
	text-align: center;
	#title {
		padding: 0;
		margin: 0;
		line-height: 2em;
		height: 2em;
		> h2 {
			padding: 0;
			margin: 0;
		}
	}
	#user {
		line-height: 1em;
		height: 1em;
	}
}
</style>

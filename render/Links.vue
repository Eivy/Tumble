<template>
	<div id='links'>
		<div id='dashboard' title='Dashboard' @click="goTo('/dashboard')"><Icon name='dashboard'></Icon></div>
		<div id='likes' title='Likes' @click="goTo('/likes')"><Icon name='heartbeat'></Icon></div>
		<div id='search' title='Search for Tag' @click="search"><Icon name='search'></Icon></div>
		<div id='userinfo' title='UserInfo' @click="goTo('/userinfo')"><Icon name='user'></Icon></div>
	</div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Search from './Contents/Search.vue'
export default {
	components: { Icon },
	methods: {
		goTo: function (target) {
			this.$router.push(target)
		},
		search: function () {
			const contents = new Vue({
				components: { Search },
				template: '<Search></Search>',
				router: this.$router
			})
			contents.$mount('#contents')
		}
	}
}
</script>

<style scoped lang='scss'>
@import "./base.scss";
#links {
	@include footer;
	width: $sidebarSize;
	div {
		display: inline-block;
		height: $headerHeight;
		width: $headerHeight / 2;
		padding: 0 1em 0 1em;
		svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

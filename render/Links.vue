<template>
	<div id='links'>
		<div id='dashboard' @click="goTo('/dashboard')"><Icon name='dashboard'></Icon></div>
		<div id='likes' @click="goTo('/likes')"><Icon name='heartbeat'></Icon></div>
		<div id='search' @click="search"><Icon name='search'></Icon></div>
		<div id='userinfo' @click="goTo('/userinfo')"><Icon name='user'></Icon></div>
	</div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import Search from './Contents/Search.vue'
export default {
	components: {Icon},
	methods: {
		goTo: function(target) {
			this.$router.push(target);
		},
		search: function() {
			new Vue({
				el: '#contents',
				components: {Search},
				template: '<Search></Search>',
				router: this.$router
			})
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

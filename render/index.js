'use strict;'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Links from './Links.vue'
import Dashboard from './Dashboard.vue'
import Likes from './Likes.vue'
import Blog from './Blog.vue'

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [
		{
			name: 'dashboard',
			path: '/dashboard',
			component: Dashboard
		},
		{
			name: 'likes',
			path: '/likes',
			component: Likes
		},
		{
			name: 'blog',
			path: '/blog/:blog',
			component: Blog,
			props: true
		}
	]
});

var app = new Vue({
	router: router,
	el: '#app',
	components: {Links}
});
router.push('dashboard');

document.onkeydown = function() {
	console.log(event.keyCode);
	switch(event.keyCode) {
		case 74: // j
		case 39: // right
		case 40: // down
			if (global.current === undefined) {
				global.current = document.getElementById('posts').firstChild;
			} else {
				if (global.current.nextElementSibling !== null) {
					global.current = current.nextElementSibling;
				}
			}
			global.current.firstChild.click();
			global.current.scrollIntoView(false);
			break;
		case 75: // k
		case 37: // left
		case 38: // up
			if (global.current === undefined) {
				global.current = document.getElementById('posts').lastChild;
			} else {
				if (global.current.previousElementSibling !== null) {
					global.current = current.previousElementSibling;
				}
			}
			global.current.firstChild.click();
			global.current.scrollIntoView(false);
			break;
	}
};

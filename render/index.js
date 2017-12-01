'use strict;'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Links from './Links.vue'
import Dashboard from './Dashboard.vue'
import Likes from './Likes.vue'
import Blog from './Blog.vue'
import Tag from './Tag.vue'

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
		},
		{
			name: 'tag',
			path: '/tag/:tag',
			component: Tag,
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
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				if (global.current === undefined) {
					global.current = document.getElementById('posts').firstChild;
				} else {
					if (global.current.nextElementSibling !== null) {
						global.current = current.nextElementSibling;
					}
				}
				global.current.firstChild.click();
				var rect = global.current.getClientRects()[0];
				if (rect.bottom > document.getElementById('posts-cover').clientHeight) {
					global.current.scrollIntoView(false);
				}
			}
			break;
		case 75: // k
		case 37: // left
		case 38: // up
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				if (global.current === undefined) {
					global.current = document.getElementById('posts').lastChild;
				} else {
					if (global.current.previousElementSibling !== null) {
						global.current = current.previousElementSibling;
					}
				}
				global.current.firstChild.click();
				if (global.current.getClientRects()[0].top < 0) {
					global.current.scrollIntoView();
				}
			}
			break;
		case 82: // r
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				document.getElementById('reblog').click();
			}
			break;
		case 76: // l
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				document.getElementById('like').click();
			}
			break;
		case 32: // space
			if (!event.altKey && !event.ctrlKey && !event.metaKey) {
				event.preventDefault();
				var cover = document.getElementById('contents');
				var content = document.getElementById('content');
				var value = (cover.clientHeight / 2) - content.style.paddingTop;
				if (event.shiftKey) {
					value = value * -1;
				}
				content.scrollTop += value;
			}
			break;
	}
};

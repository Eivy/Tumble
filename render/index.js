'use strict;'
import Vue from 'vue'
import VueRouter from 'vue-router'
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
});
router.push('dashboard');

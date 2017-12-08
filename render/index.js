'use strict;'
import Vue from 'vue'
import VueRouter from 'vue-router'

import Links from './Links.vue'
import './keydown.js'
import router from './router.js'

Vue.use(VueRouter);

var app = new Vue({
	router: router,
	el: '#app',
	components: {Links}
});
router.push('dashboard');

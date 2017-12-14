'use strict;'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Links from './Links.vue'
import './keydown.js'
import router from './router.js'
import store from './store.js'

Vue.use(VueRouter);
Vue.use(Vuex);

var app = new Vue({
	router: router,
	store,
	el: '#app',
	components: {Links}
});
router.push('dashboard');

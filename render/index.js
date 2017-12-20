'use strict;'
import {ipcRenderer} from 'electron'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Config from './Contents/Config.vue'

import Links from './Links.vue'
import './keydown.js'
import router from './router.js'
import store from './store.js'

Vue.use(VueRouter);
Vue.use(Vuex);

var app = new Vue({
	router,
	store,
	el: '#app',
	components: {Links}
});
router.push('dashboard');

ipcRenderer.on('config', (evt, msg) => {
	new Vue({
		el: '#contents',
		components: {Config},
		template: '<Config></Config>',
		store,
		router
	})
});

'use strict;'
import { ipcRenderer } from 'electron'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Config from './Contents/Config.vue'

import Links from './Links.vue'
import './keydown.js'
import router from './router.js'
import store from './store.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const app = new Vue({
	router,
	store,
	components: { Links }
})
app.$mount('#app')
router.push('dashboard')

ipcRenderer.on('config', (evt, msg) => {
	const contents = new Vue({
		components: { Config },
		template: '<Config></Config>',
		store,
		router
	})
	contents.$mount('#contents')
})

ipcRenderer.on('reload', (evt, msg) => {
	document.getElementById('update').dispatchEvent(new MouseEvent('click'))
})

ipcRenderer.on('search', (evt, msg) => {
	document.getElementById('search').click()
})

ipcRenderer.on('goto', (evt, msg) => {
	router.push(msg)
})

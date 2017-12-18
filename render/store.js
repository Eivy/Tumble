import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex);

const store = new Store();

export default new Vuex.Store({
	state: {
		thumb_size: 4,
		distinct: false
	},
	mutations: {
		valueChange (st, payload) {
			if (document.getElementById('posts')) {
				store.set('config.'+payload.name, payload.value);
				st[payload.name] = payload.value;
			}
		}
	}
});

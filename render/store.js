import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex);

const store = new Store();

export default new Vuex.Store({
	state: {
		thumb_size: 4,
		width: 300
	},
	mutations: {
		thumb_size (st, payload) {
			if (document.getElementById('posts')) {
				store.set('config.thumb_size', payload.size);
				st.thumb_size = payload.size;
				st.width = document.getElementById('posts').parentNode.clientWidth / payload.size;
			}
		}
	}
});

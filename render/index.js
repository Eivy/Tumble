'use strict;'
import {ipcRenderer} from 'electron'
import Vue from 'vue'
import SideBar from './SideBar.vue'
import Contents from './Contents.vue'
var client;
var dashboard = undefined;

ipcRenderer.on('dashboard', (evt, msg) => {
	if (dashboard === undefined) {
		dashboard = msg;
		renderDashboard(dashboard);
		var sidebar = document.getElementById('sidebar');
		sidebar.onscroll = function() {
			if (this.scrollHeight - this.scrollTop === this.clientHeight) {
				ipcRenderer.send('get', {before_id: dashboard.posts[dashboard.posts.length-1].id});
			}
		}
	} else {
		dashboard.posts = dashboard.posts.concat(msg.posts);
	}
});

function renderDashboard(obj) {
	var side = new Vue({
		el: '#sidebar',
		data: function() { return obj},
		template: "<SideBar v-bind:posts='posts' />",
		components: {SideBar}
	});
}

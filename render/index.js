'use strict;'
import {ipcRenderer} from 'electron'
import Vue from 'vue'
import SideBar from './SideBar.vue'
import Contents from './Contents.vue'
var client;
var dashboard = undefined;

var scrollTimeOut;
ipcRenderer.on('dashboard', (evt, msg) => {
	if (dashboard === undefined) {
		dashboard = msg;
		render(dashboard);
		var sidebar = document.getElementById('sidebar');
		sidebar.onscroll = function() {
			clearTimeout(scrollTimeOut)
			scrollTimeOut = setTimeout(function() {
				if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
					getNextDashboard();
				}
			}, 200)
		}
	} else {
		dashboard.posts = dashboard.posts.concat(msg.posts);
	}
});

function render(obj) {
	var side = new Vue({
		el: '#sidebar',
		data: function() { return obj},
		template: "<SideBar v-bind:posts='posts' />",
		components: {SideBar}
	});
}

function getNextDashboard() {
	ipcRenderer.send('get', {before_id: dashboard.posts[dashboard.posts.length-1].id});
}

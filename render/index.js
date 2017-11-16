'use strict;'
import {ipcRenderer} from 'electron'
import Vue from 'vue'
import SideBar from './SideBar.vue'
import Contents from './Contents.vue'
var dashboard = undefined;

ipcRenderer.send('dashboard', {});

ipcRenderer.on('dashboard', (evt, msg) => {
	console.log(msg)
	if (dashboard === undefined) {
		console.log(msg)
		dashboard = msg.dashboard;
		render(dashboard);
		var sidebar = document.getElementById('sidebar');
		var scrollTimeOut;
		var prevScrollTop;
		sidebar.onscroll = function() {
			clearTimeout(scrollTimeOut)
			scrollTimeOut = setTimeout(function() {
				if (prevScrollTop > sidebar.scrollTop && sidebar.scrollTop < 100) {
					ipcRenderer.send('dashboard', {since_id: dashboard.posts[0].id});
				} else {
					getPrevDashboard();
				}
				prevScrollTop = sidebar.scrollTop;
			}, 200)
		}
		getPrevDashboard();
	} else {
		if (msg.type === 'prev') {
			dashboard.posts = dashboard.posts.concat(msg.dashboard.posts);
			getPrevDashboard();
		} else if (msg.type === 'next') {
			dashboard.posts = msg.dashboard.posts.concat(dashboard.posts);
		}
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

function getPrevDashboard() {
	if (sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight  < 100) {
		ipcRenderer.send('dashboard', {before_id: dashboard.posts[dashboard.posts.length-1].id});
	}
}

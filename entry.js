'use strict';
import electron from 'electron'
import {app, Menu} from 'electron'
import Store from 'electron-store'
const store = new Store();

import './ipcMain.js'
import menu from './menu.js'
import Account from './account.js'

app.on('window-all-closed', () => {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', () => {
	Menu.setApplicationMenu(menu)
	if (store.has('default_account') && store.has('token.'+store.get('default_account'))) {
		var name = store.get('default_account')
		Account.createWindow(store.get('token.'+name, name));
	} else {
		var token = {};
		var login = new electron.BrowserWindow({width:800, heigh:600});
		login.on('close', () => {
			Account.createWindow(token);
		});
		Account.getAuth(login, token);
	}
});

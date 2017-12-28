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
	if (store.has('config.default_account') && store.has('token.'+store.get('config.default_account'))) {
		var name = store.get('config.default_account')
		Account.createWindow(store.get('token.'+name, name));
	} else {
		Account.newAccount();
	}
});

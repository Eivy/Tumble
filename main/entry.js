'use strict'
import { app, Menu } from 'electron'
import Store from 'electron-store'
import './ipcMain.js'
import menu from './menu.js'
import Account from './account.js'
import Consumer from './consumer.js'

const store = new Store()

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit() }
})

app.on('ready', () => {
	Menu.setApplicationMenu(menu)
	if (store.has('config.default_account') && store.has('token.' + store.get('config.default_account'))) {
		var name = store.get('config.default_account')
		const token = store.get('token.' + name)
		Object.assign(token, Consumer)
		Account.createWindow(token, name)
	} else {
		Account.newAccount()
	}
})

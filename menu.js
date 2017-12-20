import Account from './account.js'
import electron from 'electron'
import {app, Menu, globalShortcut} from 'electron'
import Store from 'electron-store'
const store = new Store();

var accounts = store.get('token', {});
var newWindowItems = [
	{label: 'New Account'}
];
for(var a in accounts) {
	newWindowItems.push(
		{
			label: a,
			click: () => Account.createWindow(accounts[a], a)
		}
	)
}

var config = {label: 'Config', click: () => electron.BrowserWindow.getFocusedWindow().send('config')}
if (process.platform === 'darwin') {
	config.accelerator = 'Command+,'
}
const template = [
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{role: 'toggledevtools'},
			{type: 'separator'},
			{role: 'togglefullscreen'}
		]
	},
	{
		role: 'window',
		submenu: [
			{
				label: 'New Window', 
				submenu: newWindowItems
			},
			{role: 'minimize'},
			{role: 'close'}
		]
	}
]

if (process.platform === 'darwin') {
	template.unshift({
		label: app.getName(),
		submenu: [
			{role: 'about'},
			config,
			{type: 'separator'},
			{role: 'services', submenu: []},
			{type: 'separator'},
			{role: 'hide'},
			{role: 'hideothers'},
			{role: 'unhide'},
			{type: 'separator'},
			{role: 'quit'}
		]
	})

	// Window menu
	template[1].submenu = [
		{role: 'close'},
		{role: 'minimize'},
		{role: 'zoom'},
		{type: 'separator'},
		{role: 'front'}
	]
} else {
	template.push({
		label: 'Help',
		submenu: [
			config
		]
	})
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

import Account from './account.js'
import { default as electron, app, Menu } from 'electron'
import openAboutWindow from 'about-window'
import path from 'path'
import Store from 'electron-store'
const store = new Store()

var accounts = store.get('token', {})
var newWindowItems = [
	{ label: 'New Account', click: () => Account.newAccount() },
	{ type: 'separator' }
]
for (const a in accounts) {
	newWindowItems.push(
		{
			label: a,
			click: () => Account.createWindow(accounts[a], a)
		}
	)
}

const aboutWindowInfo = {
	icon_path: path.join('file://', __dirname, 'icon', 'Tumble.png'),
	bug_report_url: 'https://github.com/Eivy/Tumble/issues',
	description: 'Tumblr client for Desktop',
	open_devtools: process.env.NODE_ENV !== 'production'
}

var config = { label: 'Config', click: () => electron.BrowserWindow.getFocusedWindow().send('config') }
if (process.platform === 'darwin') {
	config.accelerator = 'Command+,'
}
const template = [
	{
		label: 'View',
		submenu: [
			{ label: 'Reload', accelerator: 'CommandOrControl+R', click: () => electron.BrowserWindow.getFocusedWindow().send('reload') },
			{ type: 'separator' },
			{ label: 'Dashboard', accelerator: 'CommandOrControl+Shift+D', click: () => electron.BrowserWindow.getFocusedWindow().send('goto', '/dashboard') },
			{ label: 'Like', accelerator: 'CommandOrControl+Shift+L', click: () => electron.BrowserWindow.getFocusedWindow().send('goto', '/likes') },
			{ label: 'Search', accelerator: 'CommandOrControl+Shift+S', click: () => electron.BrowserWindow.getFocusedWindow().send('search') },
			{ label: 'UserInfo', accelerator: 'CommandOrControl+Shift+U', click: () => electron.BrowserWindow.getFocusedWindow().send('goto', '/userinfo') },
			{ type: 'separator' },
			{ role: 'toggledevtools' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		]
	},
	{
		role: 'window',
		submenu: [
			{
				id: 'accounts',
				label: 'New Window',
				submenu: newWindowItems
			},
			{ role: 'minimize' },
			{ role: 'close' }
		]
	}
]

if (process.platform === 'darwin') {
	template.unshift({
		label: app.getName(),
		submenu: [
			{ label: 'About This App', click: () => openAboutWindow(aboutWindowInfo) },
			config,
			{ type: 'separator' },
			{ role: 'services', submenu: [] },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideothers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		]
	})

	// Window menu
	template[2].submenu.push({ type: 'separator' })
	template[2].submenu.push({ role: 'zoom' })
	template[2].submenu.push({ type: 'separator' })
	template[2].submenu.push({ role: 'front' })
} else {
	template.push({
		label: 'Help',
		submenu: [
			config,
			{ label: 'About This App', click: () => openAboutWindow(aboutWindowInfo) }
		]
	})
}

export default Menu.buildFromTemplate(template)

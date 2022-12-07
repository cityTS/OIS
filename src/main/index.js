import {app, BrowserWindow, Menu, Tray, globalShortcut} from 'electron'
import qon from 'qiao-is-online'
import store from '../renderer/store'
const axios = require('axios')
const storage = require('electron-localstorage')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
} else {
    global.__static = require('path').join(__dirname, '../static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本
            enableRemoteModule: true, // 打开remote模块
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)
    // mainWindow.loadFile(require('path').join(__dirname, 'text.html'))
    mainWindow.on('close', (e) => {
        // mainWindow = null
        e.preventDefault()
        mainWindow.hide()
    })
    // mainWindow.webContents.on('before-input-event', (event, input) => {
    //     console.log(input.key.toLowerCase())
    //     console.log(input.control)
    //     if ((input.control && input.key.toLowerCase() === 'r') || input.key.toLowerCase() === 'f5' || (input.control && input.key.toLowerCase() === 'i')) {
    //         console.log('Pressed')
    //         event.preventDefault()
    //     }
    // })
    // try {
    //     mainWindow.webPreferences.send('update-log', '测试')
    // } catch (e) {
    //     console.log(e)
    // }
    // 取消默认菜单栏
    Menu.setApplicationMenu(null)
}
let tray
app.on('ready', () => {
    tray = new Tray(require('path').join(__dirname, '../renderer/assets/img/dx-logo.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示界面',
            click: () => {
                if (!mainWindow.isVisible()) {
                    mainWindow.show()
                }
            }
        }
    ])
    tray.setToolTip('OIS-广西大学在线监考系统')
    tray.on('click', () => {
        mainWindow.show()
    })
    tray.setContextMenu(contextMenu)
    createWindow()
    detectUSB()
    detectServerConnection()
    detectInternetConnection()
})
app.on('window-all-closed', (e) => {
    // if (process.platform !== 'darwin') {
    //     app.quit()
    // }
    e.preventDefault()
    // mainWindow.hide()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
app.on('browser-window-focus', (event, isAlwaysOnTop) => {
    globalShortcut.register('F5', () => {
        return false
    })
    globalShortcut.register('Ctrl + R', () => {
        return false
    })
})
app.on('browser-window-blur', (event, isAlwaysOnTop) => {
    globalShortcut.unregisterAll()
})
/**
 * 日志模块
 */
// let fs = require('fs')
// let ws = fs.createWriteStream(require('path').join(__dirname, 'logs.log').replace(/\\/g, '\\\\'), {
//     flags: 'a', // 文件的打开模式
//     encoding: 'utf8' // 写入文件的字符的编码
// })
//
// let log = new console.Console(ws)

function getFormatTime () {
    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

let safeList = []

function logger (level, str) {
    let logMsg = getFormatTime() + ' [' + level + '] ' + str
    // log.log(logMsg)
    // store.commit('addLog', logMsg)
    if (storage.getItem('name') !== '' && level === '异常') {
        store.dispatch('addLog', logMsg)
        axios.post('http://ois.cn/api/logs', {name: storage.getItem('name'), level: '异常', content: getFormatTime() + ' ' + storage.getItem('studentNumber') + '-' + storage.getItem('name') + ':' + str, examinationId: storage.getItem('examinationId')}).catch(() => { safeList.append({name: storage.getItem('name'), level: '异常', content: getFormatTime() + ' ' + storage.getItem('studentNumber') + '-' + storage.getItem('name') + ':' + str, examinationId: storage.getItem('examinationId')}) }).catch(() => {
            safeList.append({name: storage.getItem('name'), level: '异常', content: getFormatTime() + ' ' + storage.getItem('studentNumber') + '-' + storage.getItem('name') + ':' + str, examinationId: storage.getItem('examinationId')})
        })
    }
    // try {
    //     mainWindow.webPreferences.send('update-log', logMsg)
    // } catch (e) {
    //     console.log(e)
    // }
}

/**
 * 网络监听模块
 * detectInternetConnection() 检测是否连通外网
 * detectServerConnection() 检测与服务器的连接
 */
function sleep (ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function detectServerConnection () {
    logger('信息', '开始与服务器建立心跳连接')
    while (true) {
        try {
            let oisStatus = await qon.oisStatus()
            if (oisStatus !== 'online') {
                logger('异常', '与服务器断连,行为已记录')
            } else {
                let tmpList = safeList
                safeList.length = 0
                for (let idx = 0; idx < tmpList.length; idx++) {
                    axios.post('http://ois.cn/api/logs', tmpList[idx]).catch(() => {
                        safeList.append(tmpList[idx])
                    })
                }
            }
        } catch (e) {
            logger('异常', '与服务器断连,行为已记录')
        }
        await sleep(20000)
    }
}

async function detectInternetConnection () {
    logger('信息', '网络监控开启成功')
    while (true) {
        let isOnline = await qon.isOnline(false)
        // logger('[信息] 网络检测结果: ' + isOnline)
        if (isOnline === 'online') {
            logger('异常', '检测到该考试环境已连通网络,行为已记录')
        }
        await sleep(20000)
    }
}

/**
 * 移动硬盘检测
 */
const child = require('child_process')
async function detectUSB () {
    logger('信息', '移动硬盘检测开启成功')
    while (true) {
        child.exec(require('path').join(global.__static, 'USB.exe'), (error, stdout, stderr) => {
            if (error) {
                logger('异常', '移动硬盘检测系统故障:' + error)
                return
            }
            if (stdout !== 'safe') {
                logger('异常', '检测到移动硬盘' + stdout.replace('?', '个'))
            }
        })
        await sleep(20000)
    }
}

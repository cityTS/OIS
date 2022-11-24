import {app, BrowserWindow, Menu} from 'electron'
import qon from 'qiao-is-online'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
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
            preload: require('path').join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // 取消默认菜单栏
    Menu.setApplicationMenu(null)
}
app.on('ready', () => {
    createWindow()
    detectUSB()
    detectServerConnection()
    detectInternetConnection()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * 日志模块
 */
let fs = require('fs')
let ws = fs.createWriteStream(require('path').join(__dirname, 'logs.log').replace(/\\/g, '\\\\'), {
    flags: 'a', // 文件的打开模式
    encoding: 'utf8' // 写入文件的字符的编码
})

let log = new console.Console(ws)

function getFormatTime () {
    let date = new Date()
    let month = date.getMonth()
    let day = date.getDay()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

function logger (str) {
    let logMsg = getFormatTime() + ' ' + str
    log.log(logMsg)
    // TODO 将异常发送服务器
    // mainWindow.webPreferences.send('update-log', logMsg)
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
    logger('[信息] 开始与服务器建立心跳连接')
    while (true) {
        try {
            let oisStatus = await qon.oisStatus()
            if (oisStatus === 'online') {
                logger('[信息] 心跳连接正常♥')
            } else {
                logger('[异常] 与服务器断连,行为已记录')
            }
        } catch (e) {
            logger('[异常] 与服务器断连,行为已记录')
        }
        await sleep(20000)
    }
}

async function detectInternetConnection () {
    logger('[信息] 网络监控开启成功')
    while (true) {
        let isOnline = await qon.isOnline(false)
        // logger('[信息] 网络检测结果: ' + isOnline)
        if (isOnline === 'online') {
            logger('[异常] 检测到该考试环境已连通网络,行为已记录')
        }
        await sleep(20000)
    }
}

/**
 * 移动硬盘检测
 */
const child = require('child_process')
async function detectUSB () {
    logger('[信息] 移动硬盘检测开启成功')
    while (true) {
        child.exec(require('path').join(__dirname, 'USB.exe'), (error, stdout, stderr) => {
            if (error) {
                console.log(error)
            }
            logger('[异常] 检测到移动硬盘' + stdout.replace('?', '个'))
        })
        await sleep(20000)
    }
}

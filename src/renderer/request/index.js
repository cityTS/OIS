import axios from 'axios'
const storage = require('electron-localstorage')
const request = axios.create({
    baseURL: 'http://ois.cn/api',
    timeout: 100000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // let name = store.state.Token.name
    // let studentNumber = store.state.Token.studentNumber
    // let examinationId = store.state.Token.examinationId
    let name = storage.getItem('name')
    let studentNumber = storage.getItem('studentNumber')
    let examinationId = storage.getItem('examinationId')
    config.headers['name'] = encodeURIComponent(name)
    config.headers['studentNumber'] = studentNumber
    config.headers['examinationId'] = examinationId
    // let usertoken = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
    return config
}, error => {
    return Promise.reject(error)
})

// response 拦截器
request.interceptors.response.use(
    response => {
        let res = response.data
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res
        // return response;
    },
    error => {
        return Promise.reject(error)
    }
)

export default request

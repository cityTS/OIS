import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8010/api',
    timeout: 100000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'

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

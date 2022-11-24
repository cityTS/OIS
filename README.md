# OIS

> Online Invigilating System For GXU


#### Build Setup

``` bash
# 安装依赖
npm install
# 或者
yarn
```
```js
// 找到下载的依赖包: qiao-is-online
// 新增文件/lib/ois-status.js

// qiao-is-online/lib/ois-status.js

'use strict';
var q = require('qiao-ping');
// exports
module.exports = oisStatus;

var oisDomains = [
    // ois服务器端域名,根据实际情况修改
    'ois.gxu.edu.cn'
]
async function oisStatus() {
    var res = await pingDomains(oisDomains);
    if(!res || res.length != domains.length) throw new Error('no res');

    if(res[0].alive) {
        return 'online';
    } else {
        return 'offline';
    }
}
async function pingDomains(hosts){
    var res = [];
    if(!hosts || !hosts.length) return res;

    for(var i=0; i<hosts.length; i++){
        var r = await q.ping(hosts[i]);
        res.push({
            host	: r.host,
            alive	: r.alive,
            time	: r.time
        });
    }

    return res;
}

// qiao-is-online/index.js 中新增一行

exports.oisStatus = require('./lib/ois-status')
```
```bash
# serve with hot reload at localhost:9080
npm run dev
# or
yarn run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8d4ed60](https://github.com/SimulatedGREG/electron-vue/tree/8d4ed607d65300381a8f47d97923eb07832b1a9a) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

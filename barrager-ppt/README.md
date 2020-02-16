## 极简弹幕方案

### 构成
```bash
.
├── README.md
├── mobile
│   ├── README.md
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   └── yarn.lock
├── package.json
├── ppt
│   ├── css
│   ├── extras
│   ├── images
│   ├── index.html
│   ├── js
│   └── temp
├── server
│   ├── app.js
│   ├── data
│   ├── node_modules
│   ├── package-lock.json
│   └── package.json
└── yarn.lock
```
1.mobile: 发射器
2.ppt: 使用 impress 制作的 ppt
3.server: node 服务，发送 socket

### 启动过程
1.进入 server 目录，启动服务：
```
node app.js
```
此时会启动一个本机 IP 地址的服务。

2.进入 ppt 目录，使用 http-server 启动站点：
```
http-server
```
注意：接口地址需要替换成本机 IP 地址。

3.进入 mobile 目录，启动发射器：
```
yarn start
```
注意：请求接口需要使用本机 IP 地址。





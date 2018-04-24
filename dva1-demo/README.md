# Ant design  demo

## To do list
-   [x] login
-   [x] views
    -   [x] 一
    -   [x] 二
    -   [x] 三

### structure
```bash
├── README.md
├── assets
│   └── standard.md
├── node_modules
├── package.json
├── proxy.config.js
├── src
│   ├── components
│   ├── index.html
│   ├── index.js
│   ├── models
│   ├── router.js
│   ├── routes
│   ├── services
│   ├── tests
│   ├── theme.js
│   └── utils
└── webpack.config.js
```

### start
克隆项目文件:
```bash
git@gitlab.sensoro.com:jartto/tracker.git
```

进入目录安装依赖:
```bash
npm i
```

启动项目，打开 http://localhost:8989预览：
```bash
npm start
```

构建生成dist目录：
```bash
npm run build
```

语法测试：
```bash
npm run test
```
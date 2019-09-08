# web-font-convert
convert ttf to eot,convert ttf to woff,and convert ttf to svg

## 项目构成
- font
	- 需要转换格式的字体文件，如PingFang-Light.ttf
- build
	- 运行index.js之后生成文件
- build/compredd
	- 对svg字体文件进行优化后的输出目录
- node_modules
- index.js
- package.json
- README.md

## 运行
```sh
npm install
node index.js
```

## 目标
将ttf字体文件转换为woff，eot，svg等格式，因为svg转换后文件过大，因此优化后输出到compress目录中。

## 参考引用
- fontmin：
https://github.com/ecomfe/fontmin#ttf2svg
- 字蛛：
http://font-spider.org
- imagemin：
https://github.com/imagemin
- svg图片压缩：
https://github.com/imagemin/imagemin-svgo

## web font终级解决方案
http://jartto.wang/2016/09/04/final-solution-of-the-web-font/
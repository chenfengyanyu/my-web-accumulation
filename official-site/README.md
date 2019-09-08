# Official Site
build workflow for official site

## 关键词
jade,scss,git,gulp,shell,markdown,browser-sync,plumber,font-convert,font-min,nginx

## 功能罗列
1.监听文件夹变化；      
2.自动编译jade和sass文件；          
3.本地ttf字体库转化格式eot，woff；       
4.创建public文件夹，并拷贝相关文件；        
5.抓取网站所用字体，精简字体库文件；          
6.浏览器监听，自动刷新；                

## 项目结构
- assets（存放静态文件）
	- image
	- js
	- lib（类库）
- fonts（存放ttf字体源文件）
- node_modules
- public（发布目录，自动生成）
	- assets
		- css
		- fonts（最终生成的字体包）
		- image
		- js
		- lib（js和css类库文件）
	- zh
- sass（sass源文件，直接开发，自动编译）
- templates（jade源文件，直接开发，自动编译）
	- en
	- zh
		- apis（存放api子文档页，详细说明见”关于api文档“）
		- articles（存放客户案例子页面）
- .gitignore
- gulpfile.js
- package.json
- README.md

## 下载和安装
首先，拷贝项目；
```sh
git clone git@gitlab.sensoro.com:jartto/official-site.git
```
其次，安装项目开发环境依赖；
```sh
npm install
```

## 编译和生成
通过npm执行gulp命令，编译sass和jade文件，将新文件生成在public目录中
```sh
npm run build
```

## 监听文件
开启gulp监听模式，监听sass，templates以及assets文件夹中的变化，重整public
```sh
gulp watch
```

## 开启浏览器刷新
浏览器刷新默认不开启，需要手动启动
```sh
gulp refresh
```

## 字体库文字
文字转化通过gulp自动执行，但文字精简在gulp任务中无效（已提交插件作者issues）。所以，这里提供的方案是手动执行任务，如下：
```sh
gulp font-min
```
本地开发完毕，部署前需要执行此操作。

## 发布项目
配置发布服务器git地址
```sh
test   	git@sensoro:homepage
```

## Nginx配置
```sh
server {
        listen     $PORT;
        server_name $URL;
        root $PWD;
        rewrite (.*)\.html /$1 redirect;
        location / {
                try_files $uri /$uri.html /index.html;
        }
}
```

## 关于api文档
- api文档页包含多个子文档，存放于templates/zh/apis目录下，子文档通过include引入。
- 子文档需要指明id（滚动监听所需参数），如apis目录下s01.jade。
- id命名规范参考section-1，section-2，section-3。
- 子文档页支持基本的markdown语法。

## 注意事项
1.templates中名称带_的文件将不会被编译到public目录中，如_layout.jade文件；         
2.需要开启浏览器监听和文件变化监听服务；              
3.浏览器监听访问地址为http://localhost:4000/zh/     
4.开发完毕，部署服务器前，需要执行gulp font-min来精简文字包；      














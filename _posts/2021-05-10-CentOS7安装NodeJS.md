---
layout: post
title: "SentOS7安装NodeJS"
date: 2021-05-10
description: ""
tag: nodejs
---

直接部署

### 1、首先安装wget
```
yum install -y wget
```

如果已经安装了可以跳过该步

### 2、下载nodejs最新的bin包
可以在下载页面[https://nodejs.org/en/download/](https://nodejs.org/en/download/)中找到下载地址。然后执行指令

```
wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
```
然后就是等着下载完毕。
另外你也可以在你喜欢的任意系统上下载最新的bin包，然后通过FTP上传到CentOS上。

### 3、解压包
依次执行
```
xz -d node-v14.16.1-linux-x64.tar.xz
tar -xf node-v14.16.1-linux-x64.tar
```
### 4、部署bin文件
先确认你nodejs的路径，我这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行
```
ln -s ~/node-v14.16.1-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v14.16.1-linux-x64/bin/npm /usr/bin/npm
ln -s ~/node-v14.16.1-linux-x64/bin/npx /usr/bin/npx
```
注意ln指令用于创建关联（类似与Windows的快捷方式）必须给全路径，否则可能关联错误。

### 5、测试
```
node -v
npm
npx
```

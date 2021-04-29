---
layout: post
title: "基于宝塔安装nginx-rtmp-module模块完成搭建推流直播服务器"
date: 2021-04-28
description: ""
tag: rtmp
---

基于宝塔安装的Nginx安装nginx-rtmp-module模块完成推流直播，安装步骤一次操作

首先，先不要安装Nginx，如果安装了先卸载

第一步安装gcc-c++环境

```
yum install -y gcc gcc-c++ autoconf wget
yum -y install wget gcc-c++ ncurses ncurses-devel cmake make perl bison openssl openssl-devel gcc* libxml2 libxml2-devel curl-devel libjpeg* libpng* freetype*
```

接下来把nginx-rtmp-module模块下载到服务器

`cd /www/server`

先进入上面的目录，如果你想下载到其他目录，可以更改为其他目录，然后拉去nginx-rtmp-module

`git clone https://github.com/arut/nginx-rtmp-module.git`

接下来修改宝塔的nginx的安装脚本，可以通过宝塔面板文件管理打开路径

`/www/server/panel/install`


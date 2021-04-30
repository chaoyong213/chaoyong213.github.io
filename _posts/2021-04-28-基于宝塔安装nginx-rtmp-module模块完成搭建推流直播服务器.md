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

![image](/images/posts/bt/bn1.png)

找到 nginx.sh 打开编辑，查找 export LD_LIBRARY_PATH=/usr/local/lib/:$LD_LIBRARY_PATH  ，在它下面有 ./configure  ，这这个代码后面加入

`--add-module=/www/server/nginx-rtmp-module`

![image](/images/posts/bt/bn2.jpg)

保存即可，如果不想通过宝塔面板来编辑也可以直接再终端输入

`vi /www/server/panel/install/nginx.sh`

然后修改后保存

接下来返回终端输入安装nginx的命令

`sh /www/server/panel/install/nginx.sh install 1.17`

后面的1.17也可以换成其他版本 比如1.14等等

安装完成后查看时候安装成模块输入

`nginx -V`

查看是否安装成功

![image](/images/posts/bt/b3.jpg)

返回宝塔面板新建网站，记住网站目录路径，我们进入网站目录后新建一个live文件夹，复制live文件夹的路径

![image](/images/posts/bt/bn4.jpg)

![image](/images/posts/bt/b5.png)
![image](/images/posts/bt/bn6.jpg)

打开/www/server/nginx/conf/nginx.conf文件，或者进入宝塔软件商店中nginx的“配置修改”栏目
在nginx.conf中添加以下内容（与http同级）:

```
rtmp {

    server {

        listen 1935;  #监听的端口 ，可以改为你自己喜欢的端口号，记得在宝塔后台放行此端口！！！

        chunk_size 4000;


        application hls {  #rtmp推流请求路径
            live on;
            hls on;
            hls_path /www/server/nginx/hls;   //这个目录就是推流文件存储的位置
            hls_fragment 5s;
        }
    }
}
```


![image](/images/posts/bt/b7.jpg)

注意:hls_path目录需要可读可写的权限。

解析来我们就可以使用obs等推流软件进行推流直播，下面以obs为例

![image](/images/posts/bt/b6.jpg)

此时你的服务器ip就是推流地址

rtmp://ip:1935/hls

播放地址根据你设置的串流密钥来定，比如我设定的串流密钥是index，那我的m3u8地址就是

http(s)://域名/live/index.m3u8

接下来我们使用live在线解析播放器解析m3u8地址就可以了，live在线解析播放器源码地址我放在下面了

![image](/images/posts/bt/b8.jpg)


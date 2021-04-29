---
layout: post
title: "node-media-server+ffmpeg实现视频推流"
date: 2021-04-28
description: "简易直播"
tag: ffmpeg
---

### node-media-server+ffmpeg实现视频推流

1.node-media-server安装与使用
使用npm安装：

`npm install node-media-server -g`

2.新建js文件，复制以下代码

```js
    const  NodeMediaServer  = require('node-media-server');

    const config = {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8000,
            allow_origin: '*'
        }
    };

    var nms = new NodeMediaServer(config);
    nms.run();

```

### ffmpeg下载配置与使用
>官网下载，配置时讲将ffmpeg中bin文件夹路径添加到系统的环境变量即可
>完成后可通过命令：ffmpeg -version 查看版本
>使用命令：ffmpeg -list_devices true -f dshow -i dummy 查看可以音视频设备
>通过一下命令进行推流即可：

```
ffmpeg -f dshow -i video=“USB2.0 Camera”:audio=“麦克风 (Realtek High Definition Audio)” -vcodec libx264 -acodec copy -preset:v ultrafast -tune:v zerolatency -f flv “rtmp://你的IP:1935/live/home”

```
### 使用H5引流
前端代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<script src="https://cdn.bootcss.com/flv.js/1.4.0/flv.min.js"></script>
<video id="videoElement" style="width: 80%;" controls="controls"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url:'http://你的IP:8000/live/home.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
</body>
</html>

```
通过web服务器访问此网页即可看到实时的视频流
延迟稍长

>注：Node Media Rtmp Server初始端口为1935
>Node Media Http Server初始端口为8000

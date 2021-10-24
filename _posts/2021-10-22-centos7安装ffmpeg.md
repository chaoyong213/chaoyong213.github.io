---
layout: post
title: centos7安装ffmpeg
date: 2021-10-22
tags: ffmpeg
---

### CentOS7安装ffmpeg

由于CentOS自带的yum库不包含ffmpeg软件包，因此借助第三方YUM源下载ffmpeg

1.升级yum
```
#  sudo yum install epel-release -y
#  sudo yum update -y
```

2.安装Nux Dextop Yum 源
```
#  sudo rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
#  sudo rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
```

3.安装FFmpeg 和 FFmpeg开发包
```
#  sudo yum install ffmpeg ffmpeg-devel -y
```

4.测试
```
#  ffmpeg
```
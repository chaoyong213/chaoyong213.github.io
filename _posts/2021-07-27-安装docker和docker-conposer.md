---
layout: post
title: 安装docker和docker-composer
date: 2021-07-27
tags: docker
---
### 安装docker和docker-composer
- [x] 安装docker

```shell
curl -fsSL https://get.docker.com |bash -s docker --mirror Aliyun
```
- [x] 设置开机启动docker
```shell
systemctl start docker
systemctl enable docker
```
- [x] 配置阿里云镜像

+ 1. 安装／升级Docker客户端
   推荐安装1.10.0以上版本的Docker客户端，参考文档docker-ce

+ 2. 配置镜像加速器
   针对Docker客户端版本大于 1.10.0 的用户

您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://gg40s4e9.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
- [x] 安装docker-composer

```shell
curl -L https://get.daocloud.io/docker/compose/releases/1.25.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose;
#为安装脚本添加执行权限：
chmod +x /usr/local/bin/docker-compose
#查看安装是否成功
docker-compose -v

```
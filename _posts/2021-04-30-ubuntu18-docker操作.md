---
layout: post
title: "ubuntu18-docker操作"
date: 2021-04-30
description: ""
tag: docker
---

```
sudo apt install -y docker.io
# 拉取镜像
sudo docker pull mysql:5.7
# 启动mysql镜像并查看启动日志
sudo docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7 && sudo docker logs mysql
# 进入mysql所在镜像实例的终端中，然后在终端就可以使用：mysql -u root -p 输入密码123456登录
sudo docker exec -it mysql bash
# 启动/停止mysql实例
sudo docker start/stop mysql
# Ubuntu下设置开启自启
sudo systemctl enable docker
# 查看开机自启应用
systemctl list-unit-files | grep enabled


#查看docker 容器
docker images
#查看运行的容器
docker ps -a
```
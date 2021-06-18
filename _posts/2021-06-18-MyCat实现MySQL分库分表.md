---
layout: post
title: "MyCat实现MySQL分库分表"
date: 2021-05-27
description: ""
tag: mysql
---
### MyCat实现MySQL分库分表

#### 一、MyCat安装
 * 打开MyCat的[官方地址](http://mycat.sourceforge.net/)下载MyCat
 * 下载[http://dl.mycat.org.cn/1.6.7.1/](http://dl.mycat.org.cn/1.6.7.1/)
![image](/images/posts/mycat/1.png)
进行解压：tar -zxvf Mycat-server-1.6.7.1-release-20200209222254-linux.tar.gz，解压成功后会在目录下存在一个mycat目录。
   
#### 二、创建一个新的MySQL用户
需要创建一个新的MySQL用户用来连接Mycat
以下就是创建用户的流程
```sql
// 创建mycat用户
CREATE USER 'mycat'@'%' IDENTIFIED BY 'mycat';
// 修改密码
ALTER USER 'mycat'@'%' IDENTIFIED WITH mysql_native_password BY ’Fang,1996'; 
// 刷新权限
FLUSH PRIVILEGES;
```
#### 三、配置MyCat
+ 配置项一：server.xml

此处使用上边创建的新的MySQL用户mycat，可以管理的逻辑库为mycat_order，对应schema.xml中的<schema name=“mydatabase”

框出的来的解读一下
 * 第一行：name值后边是上边创建的MySQL用户
 * 第二行：是mycat用户的密码
 * 第三行：是数据库
  ![image](/images/posts/mycat/2.png)
+ 配置项二：schema.xml
这个文件主要修改连接其他数据库的俩个节点
使用规则是mod-long这个需要注意一下子
在这块的配置比较麻烦，下面这个是已经配置好的
  ![image](/images/posts/mycat/3.png)
配置项三：rule.xml
这里是order_id使用mod-long规则
  ![image](/images/posts/mycat/4.png)
这个修改就是你有几个节点就写多少即可
  ![image](/images/posts/mycat/5.png)
#### 四、数据库信息准备
在俩台服务器114.55.103.25和192.168.253.129创建数据库kaka和kaka

分别创建t_order和t_order_detail俩张表

表结构如下
```sql
CREATE TABLE `t_order_detail` (
  `od_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`od_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `t_order` (
  `order_id` bagint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pay_mode` tinyint(4) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
#### 五、测试连接并插入数据，查看数据分布状态
连接：mysql -umycat -p -P8066 -h192.168.253.129 --default-auth=mysql_native_password

连接成功就可以看到我们的逻辑库
![image](/images/posts/mycat/6.png)
然后添加三个数据
```sql
insert into t_order (order_id,user_id,pay_mode,amount) values (next value for MYCATSEQ_ORDER,103,1
Query OK, 1 row affected (0.01 sec)

insert into t_order (order_id,user_id,pay_mode,amount) values (next value for MYCATSEQ_ORDER,103,1
Query OK, 1 row affected (0.01 sec)

insert into t_order (order_id,user_id,pay_mode,amount) values (next value for MYCATSEQ_ORDER,103,1
Query OK, 1 row affected (0.01 sec)
```
这个时候我们查看一下逻辑库的t_order数据，这里的order_id本应该是从1000开始的，之前咔咔做测试使用了一些。
![image](/images/posts/mycat/7.png)
这时我们在来看192.168.253.129和114.55.103.25这俩台数据库的数据分布

192.168.253.129数据库
这个可以看到进入了俩条数据
![image](/images/posts/mycat/8.png)
144.55.103.25数据库

这台数据库只进入了一条数据
![image](/images/posts/mycat/9.png)

#### 六、分页查询，需要的数据在不同表的查询
其实这一切mycat都已经帮你做好了

比如现在user_id为103的数据分布分俩台数据库上，我们进行查询
![image](/images/posts/mycat/10.png)
还有分页问题，都跟平时一样的
![image](/images/posts/mycat/11.png)

#### 总结
 + 数据库使用MySQL8.0需要注意密码问题
 + 在配置schema.xml时需要注意
 + 配置server.xml时逻辑库在user用户虽然不需要但是也需要改为一致
 + 修改MySQL用户的host为%
 + 密码验证规则设置为mysql_native_password
 + 连接mycat时一定要带着mysql_native_password这个参数
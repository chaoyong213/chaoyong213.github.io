---
layout: post
title: "区块链钱包usdt(nodejs版)"
date: 2021-04-30
description: ""
tag: usdt
---

### 一、Omni本地钱包安装

#### 下载omnilayer钱包，官方提供了客户端下载和core项目下载；
https://www.omnilayer.org/download.html

##### windows
官网下载安装 进入qt目录
命令行：
1.开始客户端

```
> omnicore-qt.exe -testnet -server  -rpcbind=127.0.0.1 -rpcport=18332 -rpcuser=RPCuser -rpcpassword=RPCpasswd -datadir=“f:xxx”
```

如果安装了其他节点
需要指定data目录

```
> -datadir=“f:xxx”
```

指定钱包文件

```
> -wallet= “”
```
##### mac/linux/unix 这里使用core核心包
进入数据库目录：

```
// 下载
wget https://bintray.com/artifact/download/omni/OmniBinaries/omnicore-0.3.0-x86_64-linux-gnu.tar.gz
// 解压后记录对应目录
cd omnicore-0.3.0/bin
./omnicored -testnet 连接test3测试网络，会同步test3网络的区块数据（约20G）
./omnicored          连接比特币主网网络，会同步真实区块数据, 电脑需要至少50G容量，同步很久，块很重，耐心等待，

```

关闭提示:

在命令行窗口 command+c退出，最好别强退

启动：

```
// ./bin/omnicored 无效则切换到qt启动
./bin/omnicore-qt  -testnet -server -rpcbind=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword

```

启动2:(其他电脑访问)

```
 ./bin/omnicore-qt  -testnet -server -rpcallowip=192.168.18.35   -rpcport=18332  -rpcuser=omnicorerpc -rpcpassword=Bngj987Ncid9893 -rpcallowip=192.168.16.113

```

测试api:

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword getinfo

```

查看私钥：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword dumpprivkey n1dnFGMxuxkDf1Ns5G2uYhaqk2ETWPuYQG

```

查看到账：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword getbalance

```

获取交易信息：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword omni_listtransactions

```

根据发送方获取返回USDT信息：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword omni_getbalance n1dnFGMxuxkDf1Ns5G2uYhaqk2ETWPuYQG 1

```

在onmi节点发送给

```
moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP

```

btc可返还omni

查看入账：
```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword omni_getbalance mhf2ibPWMoeyibR2jS3jPLZQYTJsFSoG5r 1

```

测试网络进入QT桌面端

```
./bin/omnicore-qt -testnet -server -rpcbind=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword

```

获取指定地址交易列表listUnspent

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword  omni_sendrawtx "mhf2ibPWMoeyibR2jS3jPLZQYTJsFSoG5r" "000000000000001f000000000000000a" "msis3b45PQriomes1zCAfNJpobggP1yusr"

```

发送usdt

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword  omni_sendrawtx "mhf2ibPWMoeyibR2jS3jPLZQYTJsFSoG5r" "000000000000001f000000000000000a" "msis3b45PQriomes1zCAfNJpobggP1yusr"

```

导入特定地址到节点：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword importprivkey cVKMjDVaWevxmRCrNXjTPpz77SSjWvQWp1eCj5zKBpEcaASK7Gib '' false ('': account false:rescan)
如果（btc/usdt）要通过api查询余额，rescan需要设置为true

./bin/omnicore-cli -rpcconnect=192.168.16.11 -rpcport=8332 -rpcuser=RPCuser -rpcpassword=RPCpasswd importprivkey cR8rJpmWAkRPdPFUPjUjstNqf8mkqQMkEDEpDe3Q485JtaXUbu15

```

查询余额：

```
./bin/omnicore-cli -rpcconnect=127.0.0.1 -rpcport=18332 -rpcuser=RPCUser -rpcpassword=RPCPassword omni_getbalance mhRPUxrDxL7unBauvgqKkGvsVqnJ3Jx6kU 2

```



### 二、开发
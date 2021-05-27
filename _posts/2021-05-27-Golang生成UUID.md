---
layout: post
title: "Golang生成UUID"
date: 2021-05-27
description: ""
tag: go
---

### Golang生成UUID

>开发过程中难免要用到UUID，Golang标准库好像没有提供生成UUID的方法,在Github上面发现了一个不错的库.
satori/go.uuid 提供了五种生成UUID的方式:

+ Version 1,基于 timestamp 和 MAC address (RFC 4122)
+ Version 2,基于 timestamp, MAC address 和 POSIX UID/GID (DCE 1.1)
+ Version 3, 基于 MD5 hashing (RFC 4122)
+ Version 4, 基于 random numbers (RFC 4122)
+ Version 5, 基于 SHA-1 hashing (RFC 4122)

### 安装 satori/go.uuid 库

```
# go get github.com/satori/go.uuid
```

### 简单使用方法

```go
package main

import (
    "fmt"
    "github.com/satori/go.uuid"
)

func main() {
    // 创建UUID
    u1 := uuid.Must(uuid.NewV4()).String() //上文介绍的Version 4
    fmt.Printf("UUIDv4: %s\n", u1)
}

```
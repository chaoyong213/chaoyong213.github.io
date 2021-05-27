---
layout: post
title: "sublimeText配置Lua开发环境"
date: 2021-05-27
description: ""
tag: sublimeText
---

### sublimeText配置Lua开发环境

以luajit为例，在subLime中集成编译Lua（或其他语言）功能，只需要在Tool->Build System -> New Build System中添加代码

```
{
    "cmd":["luajit","$file"],
    "file_regex":"^(?:lua:)?[\t](...*?):([0-9]*):?([0-9]*)",
    "selector":"source.lua"
}
```

然后保存在默认路径即可，保存时可以重命名为luajit.sublime-build重启subLime即可。

在sublime编辑lua脚本保存之后，Tool->Build System，勾选luajit为默认选项，Ctrl + B即可直接运行

注：windows中luajit.exe所在的文件夹需要添加进环境变量。


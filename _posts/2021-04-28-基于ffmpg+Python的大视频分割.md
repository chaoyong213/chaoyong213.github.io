---
layout: post
title: "基于ffmpg+Python的大视频分割"
date: 2021-04-28
description: "基于ffmpg+Python的大视频分割+水印+标题和尾部合并的实现,FFMPGPython,分隔,片头,片尾"
tag: ffmpeg
---
### 一、FFMPG环境安装
1.1 更新brew源
由于 brew 命令安装软件的时候，先后会查找brew.git、homebrew-core.git、homebrew-bottles等软件源，那么我们可以这个仓库的源替换成Alibaba的，则在安装软件时，则会加速。

1.1.1 更新brew.git
```
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```
如果恢复之前的源，则执行如下命令：
`git remote set-url origin https://github.com/Homebrew/brew.git`

1.1.2 更新homebrew-core.git
```
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```
原仓库的地址是： [link]https://github.com/Homebrew/homebrew-core.git (https://github.com/Homebrew/homebrew-core.git)

1.1.3 更新homebrew-bottles

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

如果还原之前的，则通过vi编辑器，打开.bash_profile文件，将 HOMEBREW_BOTTLE_DOMAIN 删除即可。

1.2 安装ffmpeg
在github中有两个相关的仓库，即 homebrew-ffmpeg 和 varenc/homebrew-ffmpeg ，此次使用第一个仓库，具体安装如下：

```
brew tap homebrew-ffmpeg/ffmpeg
brew install homebrew-ffmpeg/ffmpeg/ffmpeg
brew options homebrew-ffmpeg/ffmpeg/ffmpeg
```

提示】HomeBrew临时下载的文件目录~/Library/Caches/Homebrew/downloads，如果在安装的过程下载某一个文件特别慢，可以执行Ctrl+C退出安装，然后使用专业的下载工具（迅雷），当下载完成后，可以找到相关的文件，并将名称修改成下载文件名即可。如以下donwloads文件目录下的文件：

```
0b4dcf92e1664a17fefc4c0f7993a9943849d88144a7a22c4b5458271c1527ea--pip-19.3.1.tar.gz
0cd4162bd88b80d7d824536c0dfb4d9b6432556a96c75308368491218b766b44--ffmpeg-4.2.2.tar.xz
4f03f7d12fc06e90f55a39f67ee01efd978fe4d084982c0c906baf012e214451--Python-3.7.5.tar.xz
```

如果安装成功了，可以查看ffmpeg的命令帮助信息，命令如下：

`ffmpeg -h`
### 二、安装Python环境
2.1 安装Python3

`brew install python3`

安装成功之后，可以执行`python -v`命令测试Python的版本。

默认安装的路径是 /Library/Frameworks/Python.framework/Versions/3.7

然后再确认一下pip3是否安装，它是Python的依赖包管理工具命令，命令是`pip3 -V`

2.2 安装ffmpeg-python

`pip3 install ffmpeg-python`

在Python脚本中需要通过ffmpeg模块获取视频的媒体信息，如时长等。

### 三、准备相关资源
3.1 片头片尾视频
一般情况下，片头片尾视频的格式都是mp4（H264/H263）,需要将mp4文件统一转化为mpg格式，其命令如下：

`ffmpeg -i start.mp4 -qscale:v 1 start.mpg`

3.2 水印字体
如果为合并后的视频增加文字水印，则需要选择合适的字体文件，并将字体文件与python的程序脚本放在同一目录下，如下列表：

```
run_sep.py
end.mpg
start.mpg
f1.ttf
```

如上所示， f1.ttf则为字体文件资源。这是一个空心字体的彩云体。

如果水印使用logo.png类似的图片，则将这个图片也放在如上的目录下。

3.3 目标视频资源
将所需要转换的mp4文件放在同一个目录，执行python程序脚本时，指定这个目录和分隔视频的大小即可。分隔规则如15-20分钟，如果这个视频小于30分钟，则不会分隔。

【注意】确保文件名不带有空格，因为在Python程序的脚本中，需要执行mac下的ffmpeg命令。

### 四、ffmpeg相关命令
4.1 分隔视频

`ffmpg -i xxxx.mp4 -ss 00:15:00  -t 00:15:00 -vcodec copy -acodec copy xxx-out.mp4`

相关参数说明：

+ -i 表示input输入的视频源

+ -ss 表示起始时间，如00:15:00 即0时15分0秒开始

+ -t 表示结束时长, 如00:15:00，即从-ss开始，分隔出15分钟

+ -vcodec/-acodec 表示视频转码与音频转码方式，使用copy表示复制，表示不进行压缩处理。

+ xxx-out.mp4 表示分隔之后的视频存储位置。

4.2 合成视频
4.2.1 创建合成描述文件
如文件名为merge.txt，内容如下：

```
file start.mpg
file  Scrapy/7375ef1c9b7f559e17de206ded7aed27.mpg
file end.mpg
```

>【注意】文件中不能带有中文名称，所以存放视频资源的文件目录必须修改为英文。

4.2.2 合成视频命令

`ffmpeg -f concat -i merge.txt -c copy xxxx-merge.mpg -y`

如上命令所示中 xxxx-merge.mpg 即是合成后的视频资源名。

4.3 文字水印

`ffmpeg -i xxx.mp4 -vf "drawtext=fontfile=f1.ttf: text=\'千锋人工智能学院\':x=(w-text_w)-50:y=100:fontsize=50:fontcolor=blue:shadowy=2" -b:v 3000k -s 1280*720 xxx-water.mp4`

在执行此命令，如果报字体相关的错误时（drawtext），则需要安装freetype。安装命令如下：

```
brew install freetype
brew reinstall ffmpeg --with-freetype
```

可以通过如下命令查询是否已安装依赖包，命令如下：

`brew info ffmpeg`

4.4 LOGO水印
4.4.1 右下角位置

`ffmpeg -i xxx.mp4 -i logo.png -filter_complex 'overlay=main_w-overlay_w-10:main_h-overlay_h-10' -s 1280*720 output-water.mp4`

参数说明：

+ -filter_complex: 滤镜组合

    - main_w:视频宽度

    - main_h : 视频高度

    - overlay_w: 图片水印宽度

    - overlay_w: 图片水印宽度

+ -s 1280*720 指定目标视频的size屏幕尺寸，即720P格式。当然原视频的分辨率是高于它的。

4.4.2 左下角位置
指定x和y参数即可，命令如下：

`ffmpeg -i xxx.mp4 -i logo.png -filter_complex 'overlay=x=10:y=main_h-overlay_h-10'  -s 1280*720 output-water.mpg`

4.5 视频格式转换
主要是mp4和mpg互换转换，在转换时，主要通过-qscale:v后的值，1即是转成mpg， 2则转成mp4。

4.5.1 mp4转mpg

`ffmpeg -i xxx.mp4 -qscale:v 1 xxxx.mpg`

4.5.2 mpg转mp4

`ffmpeg -y -i xxxx-merge.mpg -qscale:v 2 xxx.mp4`

### 五、Python编码
先创建run_sep.py文件，按如下步骤进行增加内容。

5.1 导包

```python
from sys import argv
import os
import re
import subprocess

import ffmpeg
from hashlib import md5
```

5.2 封装执行命令函数

```python
def shell_cmd(cmd):
    ternimal = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    for info in ternimal.communicate():
        try:
            print(info.decode())
        except:
            break
```

5.3 单个文件处理

```python
def process_file(file_path, out_file_path=None):
    # file_path 为完整的文件路径
    dir_name , file_name= os.path.split(file_path)
    file_name_, ext = os.path.splitext(file_name)

    temp_file_path = os.path.join(dir_name, file_name_)+'-temp.mp4'

    if out_file_path is None:
        out_file_path = os.path.join(dir_name, file_name_)+'-qf.mp4'

    file_name_md5 = os.path.join(dir_name,md5(file_name.encode()).hexdigest())

    # 加水印
    water_cmd = f'ffmpeg -i {file_path} -vf "drawtext=fontfile=f1.ttf: text=\'千锋人工智能学院\':x=(w-text_w)-50:y=100:fontsize=50:fontcolor=blue:shadowy=2" -b:v 3000k -s 1280*720 {temp_file_path}'
    print(water_cmd)
    shell_cmd(water_cmd)

    # 将带水印的视频文件转成 mpg文件
    mpg_convert_cmd = f'ffmpeg -i {temp_file_path} -qscale:v 1 {file_name_md5}.mpg'
    print(mpg_convert_cmd)
    shell_cmd(mpg_convert_cmd)

    # 合并片头片尾
    with open('merge.txt', 'w') as f:
        f.write('file start.mpg\n')
        f.write(f'file  {file_name_md5}.mpg\n')
        f.write('file end.mpg')

    merge_cmd = f'ffmpeg -f concat -i merge.txt -c copy {file_name_md5}-merge.mpg -y'
    print(merge_cmd)
    shell_cmd(merge_cmd)

    # mpg转换mp4
    convert_mgp_mp4_cmd = f'ffmpeg -y -i {file_name_md5}-merge.mpg -qscale:v 2 {out_file_path}'
    print(convert_mgp_mp4_cmd)
    shell_cmd(convert_mgp_mp4_cmd)

    # 删除临时文件
    rm_cmd = f'rm -f {file_name_md5}*'
    print(rm_cmd)
    shell_cmd(rm_cmd)
```

5.4 批量文件处理

```python
def process_dir():
    sep_size = int(argv[2])  # 分隔的视频的时长（分钟）

    for mp4_file_name in filter(lambda x: x.endswith('.mp4'), os.listdir(file_path)):
        mp4_file_path = os.path.join(file_path, mp4_file_name)
        info = ffmpeg.probe(mp4_file_path)
        time_ = float(info['streams'][0]['duration'])
        # 折成15分钟一个，计算折分的次数
        n = int(time_ // (sep_size * 60) + (1 if time_ % (sep_size * 60) > 0 else 0))
        for i in range(0, n):
            if i == 0:
                end_ = '00:15:00'
            elif i < n:
                start_ = str(i * sep_size // 60).rjust(2, '0') + ':' + str(i * sep_size % 60).rjust(2, '0') + ':00'

            cmd = '-t ' + end_ if i == 0 else '-ss ' + start_ + ' -t ' + end_ if i < n - 1 else '-ss ' + start_

            out_file_path, ext = os.path.splitext(os.path.join(file_path, mp4_file_name))
            out_file_path_1 = out_file_path + '-' + str(i + 1) + ext  # 分隔的文件名,输出的文件名

            temp_file_name = file_path + "/" + md5(out_file_path_1.encode()).hexdigest()
            temp_file_path = temp_file_name + ".mp4"

            full_cmd = 'ffmpeg ' + cmd + f' -i {mp4_file_path}  -vcodec copy -acodec copy  ' + out_file_path_1
            print(full_cmd)
            shell_cmd(full_cmd)

            process_file(mp4_file_path)
```

批量操作文件时，即是将指定的目录中所有视频查找出来，根据分隔规则来分隔单个视频进行处理。

获取视频文件信息的 ffmpeg.probe(mp4_file_path) 代码则返回字典对象，获取时长使用 info['streams'][0]['duration'] 方式来获取。

5.5 程序入口

```python
if __name__ == '__main__':
    file_path = argv[1]
    if os.path.isdir(file_path):
        process_dir()
    else:
        process_file(file_path)
```

### 六、自动化运行
如对 scrapy目录下所有mp4文件按15分钟分隔、水印和加片头片尾，则执行如下命令即可：

`python3 run_sep.py  /Users/apple/Desktop/mp4/scrapy  15`

如果没有问题的话，程序则开始自动执行了。
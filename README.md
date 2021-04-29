
[這](https://chaoyong213.github.io) 是一个简洁的博客模板，响应式主题， 适配了电脑、手机各种屏幕，看效果直接点击下面链接
 
 * [博客链接](https://chaoyong213.github.io) （部署在国内，访问更快）
 * [Demo链接](https://chaoyong213.github.io/) （部署在github page）

如果你喜欢请 Star ，你的 Star 是我持续更新的动力, 谢谢 😄.
 
### 你在搭建个人博客遇到任何问题都可以找我

遇到解决不了的问题 [需要技术支持联系我](https://chaoyong213.github.io/support/)


### 环境要求

* Jekyll 支持: Mac 、Windows、ubuntu 、Linux 操作系统                     
* Jekyll 需要依赖: Ruby、bundler

### 使用手册

[Jekyll搭建个人博客](https://chaoyong213.github.io/2016/10/jekyll_tutorials1/)  :  使用Jekyll搭建个人博客的教程，及如何把这个博客模板修改成你自己的博客，里面也有大量的评论、Jekyll 搭建博客各种环境出现过的问题。

[HEXO搭建个人博客](https://chaoyong213.github.io/2015/08/HEXO%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/) : 使用 HEXO 基于 Github Page 搭建个人博客， 教程里面累计了大量提问和评论，如果你在搭建博客时遇到问题，可以看看这个教程。


#### 安装Jekyll

[Jekyll中文官方文档](http://jekyll.bootcss.com/) ， 如果你已经安装过了 Jekyll，可以忽略此处。

> $ gem install jekyll

#### 获取博客模板

> $ git clone https://github.com/chaoyong213/chaoyong213.github.io.git

或者直接[下载博客](https://github.com/chaoyong213/chaoyong213.github.io/archive/master.zip)

进chaoyong213.github.io/ 目录下， 开启本地服务

> $ jekyll server

在浏览器输入 [127.0.0.1:4000](127.0.0.1:4000) ， 就可以看到博客效果了。
> ```shell
> 遇到的問題解決方案
> bundle config mirror.https://rubygems.org https://gems.ruby-china.com
> sudo bundle update
> sudo bundle exec jekyll serve -w -H 0.0.0.0
 ```


### 提示

>* 如果你想使用我的模板，请把 _posts/ 目录下的文章都去掉。
>* 修改 _config.yml 文件里面的内容为你自己的个人信息。

如果在部署博客的时候发现问题，可以直接在[Issues](https://github.com/chaoyong213/chaoyong213.github.io/issues)里面提问。


### 把这个博客变成你自己的博客

根据上面【提示】修改过后，在你的github里创建一个username.github.io的仓库，username指的值你的github的用户名。      
创建完成后，把我的这个模板使用git push到你的username.github.io仓库下就行了。
搭建博客如果遇到问题可以看看我教程[Jekyll搭建个人博客](https://chaoyong213.github.io/2016/10/jekyll_tutorials1/)。



---
layout: post
title: "WinForm CefSharp笔记一"
date: 2021-05-27
description: ""
tag: winform
---

### WinForm CefSharp笔记一

>CefSharp简单来说就是一款.Net编写的浏览器包，方便你在Winform和WPF中内嵌的Chrome浏览器组件。

### 部署过程
+ 创建工程Test.App（Winform工程），将其中的Form1窗体删掉。
+ 创建工程Test.Chrome(类库）。
+ 在Test.Chrome工程添加NuGet引用，搜索CefSharp，选择CefSharp.Winforms。
+ 在解决方案上点配置管理器，将平台设置为x86或x64.
+ 在Test.Chrome工程添加Form1窗体，添加CefSharp窗体相关的代码。
+ Test.App添加Test.Chrome工程的引用，修改Program.cs文件，引用Test.Chrome工程的Form1窗体。

### 部署细节截图

1、创建一个基础的Winform应用，并使用NuGet引用CefSharp包。使用Nuget添加引用，搜索CefSharp，添加CefSharp.WinForm，CefSharp.Winform依赖好几个包，这块选择这一个安装就可以了，NuGet会自动帮你把其他依赖的包一并下载好的。
![image](/images/posts/winform/w1.png)
安装完你本地的Packages文件夹里有如下文件：
![image](/images/posts/winform/w2.png)
**官方文档建议**：安装完NuGet包之后，关闭vs然后重新打开，避免VS自带的智能感知引用有问题
![image](/images/posts/winform/w3.png)
2、在简介方案上右键—》选择配置管理—》修改目标平台为x86或x64
![image](/images/posts/winform/w4.png)
选择x86或x64
![image](/images/posts/winform/w5.png)
3、在你的窗体Form1窗体里添加相应代码，参考Using CEF (as Browser)中的代码。

### Using CEF (as Browser)
在代码中引用相应的dll

```
using CefSharp;
using CefSharp.WinForms;
```

完整示例：

```
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

namespace embebbedChromium
{
    public partial class Form1 : Form
    {
        public ChromiumWebBrowser chromeBrowser;

        public Form1()
        {
            InitializeComponent();
            // Start the browser after initialize global component
            InitializeChromium();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

		//初始化浏览器并启动
        public void InitializeChromium()
        {
            CefSettings settings = new CefSettings();
            // Initialize cef with the provided settings
            Cef.Initialize(settings);
            // Create a browser component
            chromeBrowser = new ChromiumWebBrowser("https://www.baidu.com");
            // Add it to the form and fill it to the form window.
            this.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;
        }

		//窗体关闭时，记得停止浏览器
        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }
    }
}

```

![image](/images/posts/winform/w6.png)

### Using CEF (as User Interface)
这块参考官方文档：[传送门](https://ourcodeworld.com/articles/read/173/how-to-use-cefsharp-chromium-embedded-framework-csharp-in-a-winforms-application)，做了部分内容的完善，这块我理解的就是提供了一个js调用C#类方法的一个示例。

1、下载Bootstrap相关的文件，[传送门](https://getbootstrap.com/docs/3.3/getting-started/)
![image](/images/posts/winform/w7.png)
2、将下载好的Bootstrap文件夹复制拷贝到你的VS项目中，并添加html文件夹，在里面新建一个index.html文件，具体如下图所示：
![image](/images/posts/winform/w8.png)

html文件内容参考这里：[传送门](https://getbootstrap.com/docs/3.3/getting-started/)，网页下方有示例，也有模板可以下载。
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

3、将上面的css、fonts、html、js文件夹里的文件全部选中—》然后点击鼠标右键，选中属性—》设置始终复制

4、新建一个类CefCustomObject，用来让js调用C#中类的方法，具体代码如下：
```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using System.Diagnostics;

namespace embebbedChromium
{
    class CefCustomObject
    {
        // Declare a local instance of chromium and the main form in order to execute things from here in the main thread
        private static ChromiumWebBrowser _instanceBrowser = null;
        // The form class needs to be changed according to yours
        private static Form1 _instanceMainForm = null;


        public CefCustomObject(ChromiumWebBrowser originalBrowser, Form1 mainForm)
        {
            _instanceBrowser = originalBrowser;
            _instanceMainForm = mainForm;
        }

        public void showDevTools()
        {
            _instanceBrowser.ShowDevTools();
        }

        public void opencmd()
        {
            ProcessStartInfo start = new ProcessStartInfo("cmd.exe", "/c pause");
            Process.Start(start);
        }
    }
}

```
5、修改Form1窗体的代码
```
using System;
using System.IO;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using System.Runtime.InteropServices;

namespace embebbedChromium
{
    public partial class Form1 : Form
    {
        public ChromiumWebBrowser chromeBrowser;

        public Form1()
        {
            InitializeComponent();
            // Start the browser after initialize global component
            InitializeChromium();
            //需要添加此句代码，否则下面执行会报错
			CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            // Register an object in javascript named "cefCustomObject" with function of the CefCustomObject class :3
            chromeBrowser.RegisterJsObject("cefCustomObject", new CefCustomObject(chromeBrowser, this));
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        	//此句代码执行有错，官网示例的跑不起来
            //chromeBrowser.ShowDevTools();
        }

        public void InitializeChromium()
        {
            CefSettings settings = new CefSettings();

            // Note that if you get an error or a white screen, you may be doing something wrong !
            // Try to load a local file that you're sure that exists and give the complete path instead to test
            // for example, replace page with a direct path instead :
            // String page = @"C:\Users\SDkCarlos\Desktop\afolder\index.html";

            String page = string.Format(@"{0}\html-resources\html\index.html", Application.StartupPath);
            //String page = @"C:\Users\SDkCarlos\Desktop\artyom-HOMEPAGE\index.html";

            if (!File.Exists(page))
            {
                MessageBox.Show("Error The html file doesn't exists : "+page);
            }

            // Initialize cef with the provided settings
            Cef.Initialize(settings);
            // Create a browser component
            chromeBrowser = new ChromiumWebBrowser(page);

            // Add it to the form and fill it to the form window.
            this.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;

            // Allow the use of local resources in the browser
            BrowserSettings browserSettings = new BrowserSettings();
            browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            chromeBrowser.BrowserSettings = browserSettings;
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }
    }
}

```
6、运行查看效果，如下图所示
![image](/images/posts/winform/w9.png)

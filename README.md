# 有道词典命令行查询工具
不喜欢安装有道词典的应用程序，因为太耗资源还一堆广告，但是用浏览器打开`dict.youdao.com`也挺麻烦的，不是吗？快来试试我的有道词典命令行工具吧！

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kenshinji/yddict/blob/master/LICENSE.txt)

[![gif with examples][examples-link]][examples-link]

## 安装

    npm install yddict -g

## 使用说明

    yd <要查询的单词>

## 网络设置
  目前支持设置代理，可以通过用户主目录下`config.json`文件来配置代理，例子如下

    {
      "proxy":"http://<主机地址>:<端口>"
    }



[examples-link]:   https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif

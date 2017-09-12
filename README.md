# 有道词典命令行查询工具
不喜欢安装有道词典的应用程序，因为太耗资源还一堆广告，但是用浏览器打开`dict.youdao.com`也挺麻烦的，不是吗？快来试试我的有道词典命令行工具吧！

[![GitHub stars](https://img.shields.io/github/stars/kenshinji/yddict.svg?style=plastic)](https://github.com/kenshinji/yddict/stargazers)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kenshinji/yddict/blob/master/LICENSE.txt)
[![npm version](https://badge.fury.io/js/yddict.svg)](https://badge.fury.io/js/yddict)
[![Code Climate](https://codeclimate.com/github/kenshinji/yddict/badges/gpa.svg)](https://codeclimate.com/github/kenshinji/yddict)

[![gif with examples][examples-link]][examples-link]

## 安装

    npm install yddict -g

## 使用说明

    yd <要查询的单词>

## 自定义设置
  目前自定义设置选项如下，可以通过用户主目录下`config.json`文件来配置

    {
      "proxy":"http://<主机地址>:<端口>" //代理设置
      "color":"<自定义显示颜色>" //自定义字体颜色显示，默认白色
    }



[examples-link]:   https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif

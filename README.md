# 有道词典命令行查询工具 [English](./README_en.md)

>不喜欢安装有道词典的应用程序，因为太耗资源还一堆广告，但是用浏览器打开`dict.youdao.com`也挺麻烦的，不是吗？快来试试我的有道词典命令行工具吧！

[![GitHub stars](https://img.shields.io/github/stars/kenshinji/yddict.svg?style=plastic)](https://github.com/kenshinji/yddict/stargazers)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kenshinji/yddict/blob/master/LICENSE.txt)
[![npm version](https://badge.fury.io/js/yddict.svg)](https://badge.fury.io/js/yddict)
[![Code Climate](https://codeclimate.com/github/kenshinji/yddict/badges/gpa.svg)](https://codeclimate.com/github/kenshinji/yddict)
[![Build Status](https://travis-ci.org/kenshinji/yddict.svg?branch=master)](https://travis-ci.org/kenshinji/yddict)
[![Coverage Status](https://coveralls.io/repos/github/kenshinji/yddict/badge.svg?branch=master)](https://coveralls.io/github/kenshinji/yddict?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkenshinji%2Fyddict.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkenshinji%2Fyddict?ref=badge_shield)

[![gif with examples][examples-link]][examples-link]

## 安装

    npm install yddict -g

## 使用说明

    yd <要查询的单词>

 - ### 自定义设置
  目前自定义设置选项如下，可以通过用户主目录下`.config/configstore/yddict.json`文件来配置, 如果没有该文件，第一次运行之后会自动生成。

    {
      "proxy":"http://<主机地址>:<端口>" //代理设置
      "color":"<自定义显示颜色>" //自定义字体颜色显示，默认白色
    }

## 如何贡献代码
1. 先[fork](https://www.zhihu.com/question/20431718)这个代码库。
2. `npm install` 安装所需要的依赖。
3. 代码改动之后请运行`npm test`确保你的改动没有影响到其他的部分。
4. 提[PR](https://www.zhihu.com/question/21682976).

## 参与讨论

 1.  [Telegram 群](https://t.me/yddict)

[examples-link]:   https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif

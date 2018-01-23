# YDDICT, A CLI tool to make looking up English/Chinese words handy [简体中文](https://raw.githubusercontent.com/kenshinji/yddict/master/README.md)

> Don't like the resource-consuming [Youdao dict App](http://cidian.youdao.com/index-mac.html)? Nor the [web version](http://dict.youdao.com/)? Why don't you give my YDDICT a shot?

[![GitHub stars](https://img.shields.io/github/stars/kenshinji/yddict.svg?style=plastic)](https://github.com/kenshinji/yddict/stargazers)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kenshinji/yddict/blob/master/LICENSE.txt)
[![npm version](https://badge.fury.io/js/yddict.svg)](https://badge.fury.io/js/yddict)
[![Code Climate](https://codeclimate.com/github/kenshinji/yddict/badges/gpa.svg)](https://codeclimate.com/github/kenshinji/yddict)

[![gif with examples][examples-link]][examples-link]

## Install

    npm install yddict -g

## Usage

    yd <word to look up>

## Custom Configuration
  You can add following configuration options to `config.json` file which is located to your $HOME directory.

    {
      "proxy":"http://<SERVER ADDRESS>:<PORT>" //proxy configuration
      "color":"<CUSTOM FONT COLOR>" //Custom font color configuration, default to white
    }



[examples-link]:   https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif

# YDDICT, A CLI tool to make looking up English/Chinese words handy [简体中文](./README.md)

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
  You can add following configuration options to `.config/configstore/yddict.json` file which is located to your $HOME directory. The file will be generated automatically after your first running if it doesn't exist.

    {
      "proxy":"http://<SERVER ADDRESS>:<PORT>" //proxy configuration
      "color":"<CUSTOM FONT COLOR>" //Custom font color configuration, default to white
    }

## How to contribute code to this project(Issue and documentation are welcome as well).
1. [Fork](https://help.github.com/articles/fork-a-repo/) this repo.
2. Run `npm install` to install all dependencies.
3. Run `npm test` after your modification to make sure your change doesn't break anything.
4. Submit a [PR](https://help.github.com/articles/about-pull-requests/)

## Discussion

 1.  [Telegram channel](https://t.me/yddict)



[examples-link]:   https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif

---
title: 学习笔记-数据结构与算法js实现-【0】前言
date: 2016-11-28 00:21:44
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

## 前言

数据结构与算法，一直是程序员必须修炼的内功之一，当然，这与编程语言无关。
我的主要编程环境为nodejs，因此，选js做为主要练习语言。
在学习的过程中主要参考两本书：
* 数据结构与算法 Javascript描述
* 学习Javascript数据结构与算法

同时，将两本书的封面贴出来，方便大家查找：

![数据结构与算法](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/dsa.png)

左边一本是 Michael McMillan 著作，王群锋，杜欢翻译，人民邮电出版社出版。
右边一本是 Loiane Groner 著作，孙晓博，邓钢，吴双，陈迪，袁源翻译，也是由人民邮电出版社出版。

在使用js的数组时，尽量不会使用已实现的`push`,`pull`,`shift`,`unshift`等方法，因为js的数组在实现上，已经模拟了好几个线性的数据结构，如果直接用的话，等同于直接在他们的方法之上封装了个函数，那样没啥意思。

完整代码，放到我的github上：[地址](https://github.com/coolcao/dsa_js),如有需要，可直接clone。在Blog分支。

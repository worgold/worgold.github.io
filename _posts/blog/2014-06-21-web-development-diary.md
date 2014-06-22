---
layout: post
title: 网站开发日记（六月份）
description: 本博文主要记录网站的日常工作内容，便于日后回顾...
category: blog
---

## 2014-06-21 雨 比较凉爽

+	主要搭建、调试博客网站

## 2014-06-22 多云 22～30℃

+	添加PHP gd库

	1.	昨天搭建博客网站，配置本地环境时，一不小心，将PHP的gd库给删掉了。导致今天登录本地后台时，图片验证码刷不出来
	2.	各种百度、google
	3.	重新安装gd库即可解决
	4.	执行：`sudo apt-get install php5-gd`

+	修复自动更新汇率、备份数据库异常

	*	异常原因：绑定了主机头，导致使用IP地址访问不了主机
	*	解决方案：将使用IP地址访问改成使用域名访问
	*	原crontab命令：`10 13 * * * wget -p /home/worgold/wget/ 127.0.0.1/diary.php`
	*	新crontab命令：`10 13 * * * wget -p /home/worgold/wget/ domain.com/diary.php`

+	修改后台网站管理员

	1.	点击“是否可用”列，更改管理员的可用状态，只有超级管理员具有此权限

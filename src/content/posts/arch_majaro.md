---
title: Majaro 配置记录
published: 2022-12-18
description: ''
image: 'https://hexoimage.pages.dev/file/3cf6864a213a1bf09c5ff.png'
tags: ["Arch Linux", 配置] 
category: 'Linux'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

![img](https://s1.vika.cn/space/2022/12/19/4dc36943bf674fbd87bfd5233eaa6065)

## 添加AUR源

manjaro是基于Arch的，所以也能使用Arch的AUR

修改**pacman.conf**文件

```
sudo nano /etc/pacman.conf

# 在最后添加以下三行内容

+ [archlinuxcn]
+ SigLevel = Optional TrustedOnly
+ Server = https://mirrors.tsinghua.edu.cn/archlinuxcn/$arch

#之后保存更新

sudo pacman -Syyu
```

**安装archlinuxcn-keyring包导入GPG key**

```
sudo pacman -S archlinuxcn-keyring
```

**GIT**

```
sudo pacman -S git
```

**chrome浏览器**

```
#chrome浏览器

sudo pacman -S google-chrome
```

## 配置

### **全局主题-layan**

[https://github.com/vinceliuice/Layan-kde ](https://github.com/vinceliuice/Layan-kde)

![img](https://images.pling.com/img/00/00/32/24/44/1325241/a31142754df9a88beb9ba19d9445fb579e36.png)

**Plasma样式**

![img](https://s1.vika.cn/space/2022/12/19/9e42d18f8577464c858d6e10d0082c06)

**颜色**

![img](https://s1.vika.cn/space/2022/12/19/1d7b39bf94fb4c528ac05be3f5346f34)

**图标**

![img](https://s1.vika.cn/space/2022/12/19/88ff23b48ce849c5951bbab93dd0ce85)

**设置——工作区行为——桌面特效**

![img](https://s1.vika.cn/space/2022/12/19/820790baa4cd4444992e106641bfb6c9)

![img](https://s1.vika.cn/space/2022/12/19/db5d6ba6bd834e329fb975113fb79b7b)

**窗口透明度**

![img](https://s1.vika.cn/space/2022/12/19/36608ffadaee4011b8b5f74e2e0a16ab)

**窗口背景虚化**

![img](https://s1.vika.cn/space/2022/12/19/deeeda86a7004c97be98f8f63914c390)

### **gnome-gtk程序风格**

文件：[https://pan.baidu.com/s/1SZbrEzFI2SFCBMEJ0zmuHQ ](https://pan.baidu.com/s/1SZbrEzFI2SFCBMEJ0zmuHQ) 密码: r8t5

用到的软件 kvantum

软件库里有，点击直接安装

![img](https://s1.vika.cn/space/2022/12/19/676f54d1e87d48e8bfd2ba7c17dca77b)

也可以用终端安装

```
sudo pacman -S kvantum
```

选择主题安装

![img](https://s1.vika.cn/space/2022/12/19/7b8e6c632b684301b6b3e0c5fc6df7c4)

稍作修改

![img](https://s1.vika.cn/space/2022/12/19/52ff63c5c19c4c48b04aceae423d48ec)

![img](https://s1.vika.cn/space/2022/12/19/dd90df2a929a427b9de415d422f9c28c)

**保存，然后在设置里应用 kvantum 即可**

### 任务栏插件

**panon音乐插件**

[https://github.com/rbn42/panon ](https://github.com/rbn42/panon)

**配置**

![img](https://s1.vika.cn/space/2022/12/19/700ee4bf84e04e2582709d17d3f6f3d4)![img](https://s1.vika.cn/space/2022/12/19/7e8aa9a2b99546d0b97603ad8f74fd00)

**Dock栏**

```
sudo pacman -S plank
```

**配置**

![img](https://s1.vika.cn/space/2022/12/19/901760c09f14490a89e0981f25442af9)
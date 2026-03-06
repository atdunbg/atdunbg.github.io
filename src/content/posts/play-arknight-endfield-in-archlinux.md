---
title: 在linux上玩 明日方舟：终末地
published: 2026-02-02
description: ''
thumbnail: 
image: 'https://cdn.jsdelivr.net/gh/atdunbg/hexo_image_assets@main/images/arknight-endfield-wallpaper.jpeg'
tags: [终末地, 游戏, archlinux, linux]
category: '游戏'
draft: false 
lang: ''
---




兼容层用的是[dwproton](https://dawn.wine/dawn-winery/dwproton)。



相较于鸣潮那款游戏，使用dwproton让终末地的配置更加的简单，可以说是几乎不需要配置就可以完美的运行的那种。 



以[archlinux](https://archlinux.org/)为例， 主要用到的有以下三样东西。



### 安装 [lutris](https://lutris.net/)

```bash
paru -S lutris
```



### 安装 [dwproton](https://dawn.wine/dawn-winery/dwproton)

根据官方介绍，dwproton是一个对一些动漫游戏有着特定的优化的一个兼容层。

下载dwpronton可以从官方仓库中下载也可以用[protonplus](https://github.com/Vysp3r/protonplus)

**安装protonplus**

```bash
paru -S protonplus
```

**通过protonplus安装 dwproton**

打开protonplus, 会自动检测你的安装环境，从左上角选择lutris，然后就可以看到有许多可以安装的包，这里选择dwproton，建议安装最新版本。



安装好后再次打开lutris就可以在wine 的设置中的`Wine 版本`找到刚才安装好的dwproton。

选中 dwproton 并保存。

### 安装 游戏本体



dwproton也可以兼容运行终末地的启动器，我们直接通过lutris 进行安装。

1. 点击lutris 中的左上角，点击加号，然后选择第二项`Install a Windows game from an executable`， 按照提示输入对应的游戏名字，想要安装的目录，最后选择提前下载好的终末地的启动器安装包。

​	官网在这里：[明日方舟：终末地](https://endfield.hypergryph.com/)

2. 启动launcher后直接默认路径安装即，安装完后，关闭当前窗口不选择立即启动。

3. 在lutris中一次点击 `右键刚刚安装好的项目`>`配置`->`游戏选项`->`主程序`， 将此项指定为 安装路径下的终末地启动器。路径一般为`/安装路径/drive_c/Program Files/Hypergryph Launcher/Launcher.exe`

然后，然后就没有然后了， 剩下就是向widows一样直接双击启动就行了，游戏下载好之后可以直接点击开始游戏启动，无需额外配置。

### 顺带一提

目前linux上 跑AI模型的效率要高于windows的，终末地在vulkan的加持下再启用nvidia的dlss，整体流畅度几乎能拉windows一条街。帧率稳定性都比windows要好很多。

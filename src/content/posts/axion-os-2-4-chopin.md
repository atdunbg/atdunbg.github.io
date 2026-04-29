---
title: "Redmi Note 10 Pro (chopin) 刷入 Axion OS 2.4 类原生系统"
published: 2026-04-29
description: ''
image: 'https://cdn.jsdelivr.net/gh/atdunbg/hexo_image_assets@main/images07b5173e5fb33fb775b679267fb31d90.jpg'
tags: ["刷机", "Android 16", "类原生", "AxionOS", "Redmi Note 10 Pro", "chopin"]
category: '教程'
draft: false 
lang: ''
---



手里有一部旧手机 Redmi Note 10 Pro (`chopin`) 一直闲置，目前系统最高官方也就只支持到了 MIUI14（Android 13）。MIUI 功能虽然全面，但偶尔的卡顿和后台占用总是让人觉得不够痛快，尤其现在小米主要推的是 HyperOS 系统。

曾经也尝试过用这手机刷各种类原生包，最近在逛酷安社区无意间发现有人做了一些基于 Android 16 的类原生包的构建，于是自己也想体验一下这种类原生的清爽。此次刷机主要是用的是 Axion OS 2.4，虽然说有点小问题，毕竟是非官方自行构建的，但是作为日常使用还是可以的。

此教程记录完整刷入过程，供同机型的小伙伴参考。**刷机前务必全机备份，数据丢失概不负责。**

## 资源清单

【配图：所有刷机资源文件截图，包含镜像、Recovery、工具等】

为了方便大家下载，我把所有需要的资源整理成了表格，链接和提取码都亲测有效：

| 资源名称                    | 下载链接                                                     | 提取码 / 备注     |
| --------------------------- | ------------------------------------------------------------ | ----------------- |
| AxionOS 2.4 主镜像          | [Google Drive](https://drive.google.com/file/d/1hUktXEVsyL3FNZYgWyZgXH10lhokYXy0/view?usp=sharing) | 主系统镜像        |
| AOSP Recovery 镜像          | [Google Drive](https://drive.google.com/file/d/1lHe4iRH3oF8_pKQQrGbWBtvVPdZdWkUB/view?usp=drivesdk) | boot.img          |
| 国内转存（镜像 + Recovery） | [夸克网盘](https://pan.quark.cn/s/481b6609e9ac?pwd=tXGV)     | tXGV              |
| Kitsune Mask (Magisk)       | [蓝奏云](https://wwboz.lanzouw.com/ihjrP3ob7x2b)             | 86z3              |
| Captivemgr（上网修复）      | [蓝奏云](https://wwboz.lanzouw.com/iJEE73ob8rmb)             | 2a6h              |
| payload-dumper-go           | [蓝奏云](https://mrzzoxo.lanzoue.com/b02plgdpi)              | 提取 boot.img 用  |
| ADB & Fastboot 工具         | [Android 官网](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn) | 官方 SDK 平台工具 |

> 💡 底包说明：我个人是从 MIUI14 开始刷的，可以正常刷入，其他的底包没有试过，建议大家也用 MIUI14 作为底包开始刷。

## 准备工作



开始刷机前，请确保你已经准备好了以下东西，缺一不可：

- 一台国行 **Redmi Note 10 Pro (chopin)**，电量保持 60% 以上，避免刷到一半关机变砖
- 一条稳定的数据线，避免中途断连，建议用原装或者质量好的数据线
- 电脑已安装 **ADB & Fastboot** 工具
- 手机已解锁 Bootloader
- 可以正常访问的网络，下载资源和查资料用



以下操作默认都解锁了bootloader，联发科处理器1200 以下的版本可以支持强行解锁bl锁，网上教程一堆， 这里不做主要叙述。

## 刷入流程

### 1. 进入 Fastboot 模式

将手机关机，同时按住 **音量下键 + 电源键**，手机将进入 Fastboot 画面。

用数据线连接电脑，打开命令行终端，输入：

```bash
fastboot devices
```

如果能看到一串设备编号，说明连接成功了；如果什么都没显示，检查驱动和数据线。

### 2. 刷入 Recovery 镜像

使用以下命令刷入，刷入的是下载的 AOSP 的 Recovery（boot.img）：

```bash
fastboot flash boot path/to/your/boot.img
```

> 💡 Note10 Pro 支持双分区，默认应该是会刷入到当前活动分区 boot_a 分区，保险起见也可以两个分区都刷入。

刷入成功后重启到 Recovery，进入 Recovery 模式：

```bash
fastboot reboot recovery
```

### 3. 进入 ADB Sideload 模式

成功进入 Recovery 模式后，这个版本的 Recovery 是支持触控的，也可以用音量键选择，电源键确认。

然后选择 `Apply Update` 选项，进入后点击 `Apply from ADB`，此时会有提示 `ADB Sideload` 的字样，说明准备就绪了。

### 4. 刷入 AxionOS 主镜像

然后就可以刷入主要镜像了，将准备好的 AxionOS 镜像下载好，执行以下命令进行刷入：

```bash
adb sideload path/to/your/AxionOS-image.zip
```

然后就是漫长的等待... 期间不要断开连接！

### 5. 双清并检分区

在刷入完成后，Recovery 会提示是否重启什么的，**一定要选择否**！

然后回到主界面，选择 `Factory reset`，一路确认下去进行一下双清，这一步很重要，不双清可能会进不去系统。

然后再回到主界面，看一下自己的活跃槽位是哪个（左上角的 active slot: a/b）。

如果在 fastboot 中只刷入了 a 分区的话，这里需要修改到 a 分区，如果两个分区都刷了，则可以忽略此步骤。

切换分区主要步骤为：`Advanced` -> `Switch Slot` -> `选择你的Slot槽位`

### 6. 首次启动

因为这个 OS 自带 GMS，所以不需要再手动刷入一些支持包了，直接选择重启就可以了。

### 7. 获取 Root 权限（可选）

这里我不追求花里胡哨的功能，仅仅只是求一个简单的 root 权限并且自带隐藏功能，于是就选择 Kitsune Mask（不过听说团队不维护这个版本了，最新版好像停留在了 27001）。

具体方法：

1. 先在手机上安装 Kitsune Mask 软件
2. 使用 Kitsune Mask 进行修补 boot.img 镜像
3. boot.img 可以使用 AxionOS.zip 内部的 payload.bin 提取（用 payload-dumper-go 工具）
4. 然后将修补后的 img 复制到电脑里
5. 重启手机到 fastboot 模式下，重新将这个新的 img 再刷入一次就行
6. 之后重启进入手机，Kitsune Mask 可能第一次会提示需要进一步修补操作
7. 此时点安装，然后点击直接安装选项安装重启即可

此时整个带有 root 的系统就已经配置好了！

### 解决类原生连接wifi无法使用问题

这是类原生最常见的问题，类原生基本默认的服务器都是google，国内无法正常连接，一下有两种解决方法：

**方法一：ADB 命令修改（无需 root）**

此操作无需 root，只需要手机启用 adb 权限即可：

```bash
adb shell settings delete global captive_portal_https_url
adb shell settings delete global captive_portal_http_url
# 修改一下服务器的地址：
adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204
```

执行完毕后切换一下飞行模式刷新一下状态就可以正常上网了。

**方法二：使用 Captivemgr 软件（需要 root 或 shizuku）**

使用这个软件进行修复，需要 root 权限或者使用 shizuku 授权：

- 软件下载：[Captivemgr](https://wwboz.lanzouw.com/iJEE73ob8rmb)，密码：2a6h

授权后，在软件选择点击一个备选服务器，然后应用，然后再点击一下最下方的刷新图标或者自己手动切换一下飞行模式即可。

<img src="https://cdn.jsdelivr.net/gh/atdunbg/hexo_image_assets@main/images3eef9a4a83c8fd581dd2598c3021decf.jpg" style="zoom:70%;" />

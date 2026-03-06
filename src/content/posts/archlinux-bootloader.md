---
title: 解决Windows更新后重写引导记录导致Archlinux引导消失的问题
published: 2025-12-26
description: ''
image: 'https://hexoimage.pages.dev/file/49f93be93d3b83ea337a5.png'
tags: [Archlinux, Linux]
category: 'Archlinux'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## 问题

在windows和linux双系统和双分区引导的情况下，windows系统更新后有时候会自动更新引导记录,此时如果有linux引导，会被直接覆盖，但是linux的引导分区和文件仍在，此时linux引导会直接被复写，导致再次启动时linux引导消失找不到。

## 解决办法

通过U盘安装盘进行修复

## U盘启动盘制作

### Ventoy

推荐在u盘中使用[Ventoy](https://www.ventoy.net/en/index.html)进行制作一个最精简的多功能的U盘启动盘。

ventoy安装会格式化U盘，安装前尽量先把U盘资料备份一下，在ventoy安装好后，U盘就具有了存储和启动盘双功能，使用的启动镜像不需要烧录，直接将iso复制到U盘里即可，在启动的时候ventoy会自动检测可以启动的启动镜像。

### 修复引导

这里用的是Archlinux系统，所以就从[Archlinux download](https://archlinux.org/download/)选择合适源下载一个archlinux的iso安装镜像。


通过u盘进入iso系统后先去查看自己的分区情况。

```bash
fdisk -l
```


如下，这是我截取的有关linux的分区配置
```plaintext
/dev/nvme0n1p5 1219518464 1221615615   2097152     1G EFI 系统
/dev/nvme0n1p6 1221615616 1230004223   8388608     4G Linux swap
/dev/nvme0n1p7 1230004224 1534091263 304087040   145G Linux 文件系统
```

现在需要挂载这几个分区到mnt中

```bash
mount /dev/nvme0n1p7 /mnt
mount /dev/nvme0n1p5 /mnt/boot

# 挂载一下必要目录
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
mount --bind /run /mnt/run
```

通过arch-chroot 进行重新生成配置

```bash
arch-chroot /mnt

# 进入后根据实际情况重新安装一下grub
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=XXXX

# 生成grub配置文件
grub-mkconfig -o /boot/grub/grub.cfg
```

若 windows和linux用的同一个分区，在以上操作执行后,尽量重新生成一下initramfs
```bash
mkinitcpio -P
```

退出U盘镜像并重启
```bash
exit
umount -R /mnt
reboot
```
之后archlinux应该是可以重新能够引导了

---
title: 云计算 - Linux开源虚拟化KVM
published: 2023-04-19
description: ''
image: 'https://hexoimage.pages.dev/file/2369b0203a6961af7cd62.jpg'
tags: [云计算, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## 虚拟化概述

### 虚拟化的定义

> - 在计算技术中, 虚拟化意味着创建设备或资源的虚拟版本,如服务器、存储设备、网络或者操作系统等等..

- 虚拟化技术
  - 系统虚拟化
    - 这种虚拟化通常表现为在单一系统上运行多个操作系统
    - 这些虚拟操作系统同时运行,每个操作系统又是相互独立
  - 存储虚拟化
  - 网络虚拟化
  - GPU虚拟化
  - 软件虚拟化
  - 硬件支持虚拟化
- 纯软件仿真
  - 通过模拟完整的硬件环境来虚拟化来宾平台。
  - 模拟X86、ARM、PowerPC等多种CPU
  - 效率比较低
  - 产品或方案
    - QEMU、Bochs、 PearPC

### 虚拟化层翻译

> - 多数的虚拟化而采用虚拟机管理程序Hypervisor

- Hypervisor是一个软件层或子系统
  - 也称为VMM ( Virtual Machine Monitor ,虚拟机监控器)
- 允许多种操作系统在相同的物理系统中运行
- 控制硬件并向来宾操作系统提供访问底层硬件的途径
- 向来宾操作系统提供虚拟化的硬件

![img](https://s1.vika.cn/space/2023/05/05/886244eea6b940a185ac22acb1f2e96b)

#### 无硬件辅助的全虚拟化

> - Full Virtualization without Hardware Assist

- 基于二进制翻译的全虚拟化
- Full Virtualization with Binary Translation
- Hypervisor运行在Ring 0
- Guest OS运行在Ring 1
- 机制:异常、捕获、翻译
- 示例:
  - VMware Workstation
  - QEMU
  - VirtualPC

#### 半虚拟化Para virtualization

> - 也称为:超虚拟化、操作系统辅助虚拟化

- Hypervisor运行Ring 0
- Guest OS不能直接运行在Ring 0 , 需要对Kernel进行修改,将运行在Ring 0上的,指令转为调用Hypervisor
- Guest OS.上的APP运行在Ring 3
- 示例:Xen

#### 硬件辅助的全虚拟化

> - Full Virtualization with Hardware Assist

- Intel VT和AMD-V创建一个 新的Ring -1单独给Hypervisor使用
- Guest OS可以直接使用Ring 0而无需修改
- 示例:
  - VMware ESXi
  - Microsoft Hyper-V
  - Xen3.0
  - KVM

### LXC和Docker

> - 一种轻量级/操作系统虚拟化方式，由Linux内核支持

- 起源: chroot系统调用,对当前程序及其子进程改变根目录
- 优势:
  - 更快速的交付和部署
  - 更高效的虚拟化
  - 更轻松的迁移和扩展
  - 更简单的管理

| 特性       | 容器               | 虚拟机     |
| ---------- | ------------------ | ---------- |
| 启动       | 秒级               | 分钟级     |
| 硬盘使用   | 般为MB             | 般为GB     |
| 性能       | 接近原生           | 弱于       |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |

## KVM安装

> - CPU必须支持虚拟化技术,在BIOS设置为启动

- 目前,多数服务器基础桌面计算机均处理启用状态.

> - "嵌套"式实验环境
>   - 在虚拟机中再做虚拟化

- VMware嵌套虚拟化
  - 产品: Workstation、 Player、 ESXi
  - 支持: ESXi、 Hyper-V、 KVM、Xen
- KVM嵌套虚拟化
  - 支持: ESXi、Hyper-V、 KVM、Xen

![img](https://s1.vika.cn/space/2023/05/05/cbbf6a1b2c394cd6a1558cec6a82fa57)

### 实验环境准备

> - "嵌套" 式实验环境
>   - VMware Workstation Player或VMware Workstation
>   - 创建虚拟机,在此虚拟机上安装KVM



// TODO: 待补充

### KVM的远程管理

> - ssh

- VNC
- X-Windows

### KVM三种网络模式

> Bridged（桥接模式）、NAT（网络地址转换模式）、Host-Only（仅主机模式）。

#### Bridged（桥接模式）

**什么是桥接模式？桥接模式就是将主机网卡与虚拟机虚拟的网卡利用虚拟网桥进行通信。在桥接的作用下，类似于把物理主机虚拟为一个交换机，所有桥接设置的虚拟机连接到这个交换机的一个接口上，物理主机也同样插在这个交换机当中，所以所有桥接下的网卡与网卡都是交换模式的，相互可以访问而不干扰。在桥接模式下，虚拟机ip地址需要与主机在同一个网段，如果需要联网，则网关与DNS需要与主机网卡一致。**

#### NAT（地址转换模式）

**刚刚我们说到，如果你的网络ip资源紧缺，但是你又希望你的虚拟机能够联网，这时候NAT模式是最好的选择。NAT模式借助虚拟NAT设备和虚拟DHCP服务器，使得虚拟机可以联网。在NAT模式中，主机网卡直接与虚拟NAT设备相连，然后虚拟NAT设备与虚拟DHCP服务器一起连接在虚拟交换机VMnet8上，这样就实现了虚拟机联网。**

#### Host-Only（仅主机模式）

**Host-Only模式其实就是NAT模式去除了虚拟NAT设备，然后使用VMware Network Adapter VMnet1虚拟网卡连接VMnet1虚拟交换机来与虚拟机通信的，Host-Only模式将虚拟机与外网隔开，使得虚拟机成为一个独立的系统，只与主机相互通讯**

> - 桥接模式：自动生成的IP地址会随着主机的IP随时变化。

- NAT模式：下虚拟机的IP地址一旦生成，就不会改变了。
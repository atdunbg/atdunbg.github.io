---
title: 云计算 - Linux系统管理
published: 2023-03-27
description: ''
image: 'https://hexoimage.pages.dev/file/2369b0203a6961af7cd62.jpg'
tags: [云计算, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## 文件系统

> - 文件系统格式操作系统用于明确存储设备或分区上的文件的方法和数据结构,即在储存设备上组织文件的方法.

- 操作系统中负责管理和储存文件信息的软件机构称为文件下管理系统,简称文件系统.
- 文件系统时命名文件以及放置文件逻辑级储存和恢复的系统.

## 文件系统类型

> - 本地文件系统(基于磁盘的文件系统):
>   - Windows系统: FAT,NTFS
>   - Linux系统: EXT2,EXT3,EXT4,XFS
>   - Unix系统: ZFS,JFS,JFS2,HFS

- 网络文件系统:
  - NTFS,GFS,GFS2,NFS,CIFS
- 虚拟文件系统: 基于内存的文件系统
  - TMPFS
  - PROC
  - SYSFS
  - …
- 交换分区(swap)

## inode 和 block 概述

> 文件是存储在硬盘上的，硬盘的最小存储单位叫做扇区sector，每个扇区存储512字节。操作系统读取硬盘的时候，不会一个个扇区地读取，这样效率太低，而是一次性连续读取多个扇区，即一次性读取一个块block。这种由多个扇区组成的块，是文件存取的最小单位。块的大小，最常见的是4KB，即连续八个sector组成一个block。
>
> 文件数据存储在块中，那么还必须找到一个地方存储文件的元信息，比如文件的创建者、文件的创建日期、文件的大小等等。这种存储文件元信息的区域就叫做inode，中文译名为索引节点，也叫i节点。因此，一个文件必须占用一个inode，但至少占用一个block。

- 元信息 → inode
- 数据 → block

### inode

> - inode表包括ext2,ext3或ext4文件系统上的所有文件列表

- inode(索引节点)时表的入口,包括文件信息(元数据)
  - 文件类型,许可权限,UID,GID
  - 链接数量(指向该文件的路径数目)
  - 文件大小和可变的时间戳
  - 文件数据在磁盘上的块指针
  - 文件的其他数据

![img](https://s1.vika.cn/space/2023/04/05/db1f2d302f744dbd86b07f6057c5bba7)

## EXT3/EXT4文件系统之日志的功能

- 日志的作用
  - 在系统崩溃后,通过扫描日志文件就可以把文回复到一致的状态

### 三种日志模式

> - 完整数据模式(Full Data)

- 预定模式(Ordered)
- 写回模式(WriteBack)

### 磁盘配额(quota)

> - 在内核中实现配额

- 在单个文件系统上实现

- 针对每个用户或组具有单独的策略

  - 对块(blocks)或节点(inodes)的数量进行限制
  - 可以实现软限制或硬限制

- 分区**mount**选项: usrquota, grpquota

- 初始化数据库:

  ```
  quotacheck -cugm /filesystem
  ```

### 为用户配额

> - 实现方法
>   - 启用和停止Perez: quotaon, quotaoff
>   - 直接修改配置:edquota, username

- 从Shell设置:

  ```
  setquota username 4096 5120 40 50 /foo
  ```

- 定义模板用户

  ```
  edquota -p user1 user2
  ```

### 配额状态报告

> - 用户审查: quota

- 配额总览: requota

## 访问控制列表(ACL)

- **ACL的定义及作用**
- **设置ACLs**

### ACLs

> - ACLs全称Access control lists(访问控制列表)
>   - 用于对文件或者目录作做更精细控制

- 主要通过三个方面控制资源

  - 拥有者
  - 拥有组
  - mask

- 命令:

  ```
  setfacl -m/x[修改/删除] u/g/m/d[拥有者/拥有组/mask掩码/默认权限]:name file|directory
  
  setfacl -m u:gandolf:rwx file|directory     
  setfacl -m g:anzgul:rw file|directory
  setfacl -m m::rwx file|directory
  setfacl -m d:u:frodo:rw directory
  setfacl -x u:samwise file|directory
  ```

- 使用mount选项实现

  ```
  mount -o acl /mountpoint
  ```

- 在安装期间设置文件系统

  ```
  tunefs -l /dev/sda1 | grep options
  ```

### 硬链接和软链接

#### 硬链接

命令

- **创建硬链接**

  ```
  ln filename [linkname]
  ```

![img](https://s1.vika.cn/space/2023/04/05/ef50ed44ce6d41eebbf1501d88aad00c)

> - 只要还有一个链接存在,文件就存在

- 当链接数为零时,文件被删除
- 不能跨硬盘分区

#### 软链接

命令

```
ln -s filename linkname
```

## 高级权限

- suid
- sgid
- sticky bit

![img](https://s1.vika.cn/space/2023/04/05/634f4cc1fd3b49aaac8545bde3da882d)

### 含义

> - 在文件上的含义
>   - suid: 命令运行时具有命令所有者拥权限,不是命令的执行者
>   - sgid: 命令运行时具有命令所在组权限的合并

- 在目录上面的含义
  - sgid: 在带有sgid为设置的目录下创建的文件又目录的组的权限的累加
  - sticky bit: 带有sticky bit设置的目录,下面的文件只能被锁又这或者root用户删除,无论目录的写权限是啊如何设置的

| 权限       | 描述                                   | 数字表示                                    |
| ---------- | -------------------------------------- | ------------------------------------------- |
| drwsr-xr-x | 基本权限是 rwxr-xr-x 高级权限是 suid   | 基本权限是 755 高级权限是 4 完整权限是 4755 |
| drwSr-xr-x | 基本权限是 rwxr-xr-x 高级权限是 suid   | 基本权限是 655 高级权限是 4 完整权限是 4655 |
| drwxrwsr-x | 基本权限是 rwxrwxr-x 高级权限是 sgid   | 基本权限是 775 高级权限是 2 完整权限是 2775 |
| drwxrwSr-x | 基本权限是 rwxrw-r-x 高级权限是 sgid   | 基本权限是 765 高级权限是 2 完整权限是 2765 |
| drwxrwxrwt | 基本权限是 rwxrwxrwx 高级权限是 sticky | 基本权限是 777 高级权限是 1 完整权限是 1777 |

### 符号法

> - 语法
>
>   ```
>   chmod [-R] mode file
>   ```

- mode(模式)

  - u,g或者o表示文件所属用户,组以及其他用户
  - - 或者 - 表示允许或者禁止
  - s和t表示高级权限

- 示例:

  ```
  u+s:设置的是suid
  g+s:设置的是sgid
  o+t:设置的是sticky bit
  ```

### 数字法

> - 权限通过累加的方式来计算:
>   - 4(suid) 2(sgid) 1(sticky)

- 示例
  - chmod 4775 file

## 储存高级

### GTP(GIUD Partition Table): 全局唯一标识磁盘分区表

![img](https://s1.vika.cn/space/2023/04/05/a140d5f97570432d9d49789d18462ff8)

![img](https://www.itgeeker.net/wp-content/uploads/mrb-gpt.png)

### GPT分区工具**parted**

#### LVM

> - LVM全称 Logical Volume Manager(逻辑券管理器)

- 为了便于操作卷,包括重定义文件系统的大小,额定义的抽象层
- 允许在多个五路设备上重新组织文件系统
- 设备被认定为物理卷(PV)
- 一个或多个物理卷可以用于创建成一个卷组(VG)
- 卷组由固定大小的物理区域(PhysicalExten,PE)定义
- 逻辑卷在卷组上创建按,并由PE组成
- 文件系统创建在逻辑卷之上

#### LVM工作模式

> - 非条带化(线性)

- 条带化
- 镜像
- 快照

### 调整逻辑卷大小

> - 扩展卷
>   - Ivextend可以扩展逻辑卷
>   - resize2fs可以在联机或脱机状态下扩展ext4文件系统

- 收缩卷
  - 必须在脱机状态下实施( umount )
  - 需要先进行文件系统校验( e2fsck )
  - 先收缩文件系统性( resize2fs )
  - 最后，lvreduce可用于收缩卷

## 图形化

### X Window又叫做X11或X

> - 1987年X的第11版发行,即X11

- 是基于网络的显示协议,提供了窗口功能,包含建立图形用户界面的标准工具和协议
- X Window是Linux的图形子系统
- 开发X Window的团体:
  - XFree86
  - X.org
- Xorg是红帽公司、普华公司用在X Window系统中的特定版本

### X Window的组成

> - 服务端

- 客户端

![img](https://s1.vika.cn/space/2023/04/06/e1a1aac64cc6432ea2592afd6392d936)

### 桌面环境

> - 在X图形系统基础上，桌面环境为计算机提供完全的图形用户界面(GUI)

- 提供桌面环境解决方案的团体:
  - GNOME
  - KDE
  - xfce4
  - XDM
  - …

> - **GUI**

- X Window + Window Manager + Display Manager
- 配置文件
  - /etc/X11/xorg.conf
  - X -configure

# 进程,线程,LWP

> - 进程是资源管理的最小单元；

- 线程是程序执行的最小单元。
- 轻量级进程(LWP)是建立在内核之上并由内核支持的用户线程，它是内核线程的高度抽象，每一个轻量级进程都与一个特定的内核线程关联。内核线程只能由内核管理并像普通进程一样被调度

## 操作系的启动过程

### 1,第一阶段:硬件引导

![img](https://s1.vika.cn/space/2023/04/06/38a65e8374db47d7b8d1da102f72cae9)

> - 备份:
>   - dd if=/dev/sda of= /tmp/mbr. bak bs=512 count= 1
>   - dd if=/dev/sda of= /tmp/mbr. bak bs =446 count=1
>   - dd if=/tmp/mbr.bak of=/dev/sda bs=512 count=1
>   - dd if= /tmp/mbr .bak of= /dev/sda bs= 512 count=1

- 生成bootloader
  - grub-install /dev/sda

### 2,第二阶段:加载管理启动程序

![img](https://s1.vika.cn/space/2023/04/06/003a055acdf846c68fa1cf7df3fb8bbc)

> - /boot/grub/grub.conf

- 最小需求:
  - title xxx
  - root (hdX,Y)
  - kernel /vmlinuz-version ro root=根文件系统名称.
    - Kernel包含的文件
      - /boot/vmlinuz -version
      - /boot/initramfs-version.img
      - /lib/modules/
  - initrd /initramfs-version.img

### 3,第三阶段: 加载内核，并挂载根文件系统

#### 内核初始化

> - 启动期间内核功能
>   - 设备检测
>   - 设备驱动初始化
>   - 以只读方式装载根文件系统.
>   - 调入最初的进程( init )

### 4,第四阶段: Sys V init初始化

> - /etc/init/rcS.conf

- /etc/rc.d/rc.sysinit
  - 重要的任务包括:
    - 激活udev和selinux
    - 设置/etc/sysctl.conf中定义的核心参数
    - 设置主机名
    - 启用交换分区
    - 根文件系统检查并且重装加载
    - 激活RAID和LVM设备
    - 启用磁盘限额管理
    - 检查并加载其它文件系统
    - 清除过期的锁和PID文件
- /etc/inittab
- /etc/rc.d/rc[0-6].d
- /etc/init/control-alt-delete.conf
- /etc/init/tty.conf
- /etc/init/serial.conf
- /etc/init/prefdm.conf

### 5,第五阶段: 完成启动

### 系统故障排除

#### Rescue

> - Rescue mode: 拯救模式,拯救系统
>   - 用于修复操作系统的一个平台
>   - 类似winPE,liveCD

- 进入Rescue mode:
  - 通过光盘引导,PXE引导,制作USB引导等

## 新Linux发行版

### GRUB2

> - 配置文件:
>   - /boot/grub2/grub.cfg或/boot/efi/EFI/redhat/grub.cfg

- 生成配置文件:
  - grub2-mkconfig -0 /boot/grub2/grub.cfg
- 修改配置文件
  - /etc/default/grub
- Grub2 特性L:
  - 支持Intel , AMD , PowerPC架构
  - 支持固件类型: BIOS , EFI/UEFI
  - 支持主引|导记录MBR和GPT
  - 支持非Linux文件系统:苹果的扩展分层文件系统( HFS+ )和微软的NTFS

### gdisk工具

支持GPT格式

## Archlinux

### 安装

安装指南

[官方wiki安装指南 ](https://wiki.archlinuxcn.org/wiki/安装指南)

### pacman包管理器

> - pacman是archlinux包管理器，负责安装、删除和升级软件。

- 它的最大亮点是将一-个简单的二进制包格式和易用的构建系统(ABS)结合。
- pacman 软件仓库:
  - 在/etc/pacman.conf文件中定义使用的软件仓库，可以直接设置或从其它文件包含，只需要维护-一个列表。
  - [core]提供了最基本的包，安装盘也提供有
  - [extra]提供的是不适合[core] 库标准的软件包
  - [community]提供的是由TU认证的AUR包

### pacman常用命令

> - 安装指定的包:
>   - pacman -S package_name….
>   - pacman -S extra/package_name

- 安装包组:
  - pacman -S gnome
- 升级软件包:
  - pacman -Syu
- 查看那些包属于改组:
  - pacman -Sg gnome
- 删除软件包,保留全部依赖关系:
  - pacman -R package_name
- 删除软件包,仅保个别依赖关系:
  - pacman -Rs package_name
- 删除软件包,不删除依赖该软件的其他程序:
  - pacman -Rdd package_name
- 删除软件包,并删除所有依赖该软件的程序:
  - pacman -Rsc package_name
- 查询可用的软件包:
  - pacman -Ss package_ name
- 查询已安装的软件包:
  - pacman -Qs package_ name
- 查询文件是由哪个软件包提供:
  - pacman -Qo filename
- 查询软件包信息:
  - pacman -Si package_ name
- 查询已安装软件包所包含的文件:
  - pacman -QI package name

## 服务管理(systemd)

> **systemd** 是一个 Linux 系统基础组件的集合，提供了一个系统和服务管理器，运行为 PID 1 并负责启动其它程序。功能包括：支持并行化任务；同时采用 socket 式与 D-Bus 总线式启用服务；按需启动守护进程（daemon）；利用 Linux 的 cgroups 监视进程；支持快照和系统恢复；维护挂载点和自动挂载点；各服务间基于依赖关系进行精密控制。systemd 支持 SysV 和 LSB 初始脚本，可以替代 sysvinit。除此之外，功能还包括日志进程、控制基础系统配置，维护登陆用户列表以及系统账户、运行时目录和设置，可以运行容器和虚拟机，可以简单的管理网络配置、网络时间同步、日志转发和名称解析等。

更多有关[systemd ](https://wiki.archlinuxcn.org/wiki/Systemd)的详细介绍.

## Ubuntu

**ubuntu是基于Debian GNU/Linux，由全球化的专业开发团队(Canonical Ltd)打造的开源GNU/Linux操作系统，发行周期为6个月。**

### ubuntu设计的目标

**ubuntu的目标是更多地的以用户为本以及桌面应用**

### Ubuntu风格

> - ubuntu提供的最新的、同时又相当稳定的主要由自由
>   软件，附带一部分当今比较流行的第三方软件构建而成的
>   操作系统

- ubuntu对GNU/Linux的普及特别是桌面普及作出了巨大贡献

### Ubuntu 系统衍生版本

![img](https://s1.vika.cn/space/2023/04/07/73973831bc804bd680f9c8c66169252c)

### Ubuntu安装

略

### Ubuntu包管理器

ubuntu派生自Debian,所以使用相同的包管理与仓库工具

#### dpkg (Debian Package Management System)

**ubuntu/Debian下的二进制软件包通常是以.deb格式发布的，使用dpkg进行软件管理，如安装、删除、查询等功能**

> - 安装软件:
>
>   ```bash
>   dpkg -i packagename.deb
>   ```

- 删除软件:

  ```bash
  dpkg -r packagename
  ```

- 查询软件包信息:

  ```bash
  dpkg –info packafename.deb
  dpkg –status packagename
  ```

- 查询软件包所含文件

  ```bash
  dpkg –listfiles packagename
  dpkg –contents packagename.deb
  ```

- 查询文件归属

  ```bash
  dpkg –search filename
  ```

- 查询系统中的包

  ```bash
  dpkg –l
  ```

#### apt (Advanced Packaging Tool)

**apt是ubuntu/debian及其派生发行版的软件包管理器，可以自动下载，配置，安装二进制或者源代码格式的软件包**

> - 安装软件
>
>   ```bash
>   apt-get install package
>   ```

- 删除软件

  ```bash
  apt-get remove package
  ```

- 查询软件包信息

  ```bash
  apt-cache show package
  ```

- 查询文件归属

  ```bash
  apt-file search filename
  ```

- 查询软件包所含文件

  ```bash
  apt-file list package
  ```

- 查询系统中的包

  ```bash
  apt-cache pkgnames
  ```

### apt前端程序

aptitude: apt 的高级的字符和命令行前端
aynaptic: 图形界面的apt前端
dselect: 使用菜单界面的包管理工具
gnome-apt: 图形界面的apt前端

### PPA (Personal Package Archives)

**PPA是ubuntu的私人软件仓库，允许用户上传原码包，由launchpad编译并发布作为apt的仓库**

#### 命令行添加PPA

```bash
sudo add-apt-repository ppa:user/ppa-name
sudo apt-get update
sudo apt-get install package
```



#### 命令行删除PPA

```bash
sudo add-apt-repository –remove ppa:user/ppa-name
```


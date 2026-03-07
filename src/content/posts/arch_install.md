---
title: 记一次ArchLinux的安装过程
published: 2023-03-27
description: ''
image: 'https://hexoimage.pages.dev/file/49f93be93d3b83ea337a5.png'
tags: [Archlinux, Linux]
category: 'Archlinux'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## ArchLinux+KDE的安装过程

## 1. 1下载镜像文件

Archlinux的官网:[https://archlinux.org/ ](https://archlinux.org/)

点击Download

按照自身情况选择一个镜像源

国内推荐[清华源 ](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/2023.04.01/)

下载iso镜像文件

## 1.2 **选择安装方式**

### 1.2.1本机安装

folding cyan,本机安装
本机安装, 推荐用 [ventoy ](https://www.ventoy.net/cn/)制作U盘启动盘进行安装

![img](https://www.ventoy.net/static/img/screen/screen_uefi.png)

#### (1).制作启动盘

- 准备一个大容量U盘(建议8G往上, 以后想装其他系统直接吧ISO文件复制到U盘里即可)
- 确保U盘里没有重要文件(请提前备份好重要文件)

![img](https://s1.vika.cn/space/2023/04/12/4a4bcbaa4c6341e29ea9bfb84e3bc731)

- 打开Ventoy2Disk.exe
- 找到要制作的U盘, 点击开始安装即可

然后将archlinux的iso镜像复制在U盘中

#### (2).启动archlinux镜像

**启动电脑时按F2(不同电脑快捷键可能不同,请自行百度)**

然后选择U盘启动,进入ventoy,选择archlinux.

endfolding

### 1.2.2虚拟机安装

folding cyan,虚拟机安装

**此处演示的为 [VMware ](https://www.vmware.com/)虚拟机**

- 打开 VMware

![img](https://s1.vika.cn/space/2023/04/12/64af68c7fa604fadabd2195870740c7d)

- 选择新建虚拟机,选择典型(推荐)配置
- 选择安装光盘映像文件(iso), 选择下载好的archlinux的ISO镜像.

![img](https://s1.vika.cn/space/2023/04/12/64af68c7fa604fadabd2195870740c7d)

- **下一步**
- 操作系统选择Linux,内核选择 其他 Linux 5.x 内核 64 位.

![img](https://s1.vika.cn/space/2023/04/14/9178cbdb8638488ca6b693d02520db85)

- **下一步**

 虚拟机名字和创建文字按照自己情况适当调整

- **下一步**

最大磁盘大小按照自己情况修改(我这里改为20GB)

选择 **将虚拟磁盘储存为单个文件**

![img](https://s1.vika.cn/space/2023/04/14/babb449048224249882bb8bdafba1f4f)

- **下一步**
- 点击**自定义硬件**, 修改此虚拟机的内存,我这里修改的为**4G**
- 点击**完成**
- 点击**编辑虚拟机设置**, 依次点击 **选项–>高级–>固件类型 中 选中UEFI模式**

![img](https://s1.vika.cn/space/2023/04/14/28c6a3ea59b9437b9051320301d7c763)

**至此,虚拟机配置就完成了**

## 1.3安装archlinux

### 1.3.1进入镜像系统

![img](https://s1.vika.cn/space/2023/04/14/d59ffd614b6242d09be1773f835df77c)

首先 先禁用 **reflector服务**, 防止自动更新服务器列表

```bash
systemctl stop reflector.service
```

### 1.3.2**网络连接**, 有线网会自动连接, 请忽略此步

无线网连接

```bash
#执行iwctl指令,进入交互式命令界面
iwctl

#累出设备名,如无线网卡应看到wlan0
device list					

#用wlan0扫描网络
station wlan0 scan		 	

#列出网络
station wlan0 get-networks	


# 连接指定无线网 输入密码
station wlan0 connect [无线网名字]	

#退出iwctl
exit或者quit					
```

ping一下一个网站, 看看网络是否连接成功

```bash
#例

ping www.baidu.com
```

### 1.3.3同步网络时间

```bash
timedatectl set-ntp true
```

### 1.3.4修改软件源 把中国源放在前列

```bash
# Ctrl+w		搜索指定文本
# Ctrl+6		标记指定文本
# Ctrl+k		剪切选中文本
# Ctrl+u		粘贴文本
# Ctrl+x		退出编辑

nano /etc/pacman.d/mirrorslist				#打开镜像源配置文件,将中国的镜像源放置最前列
```

### 1.3.5刷新但不更新软件包

```bash
pacman -Syy
```

### 1.3.6(可选操作)安装openssh

```bash
#安装openssh远程软件
pacman -S openssh		

#启用sshd服务
systemctl start sshd	

#设置当前root密码
passwd root

#查看ip地址
ip a					
```

> - **使用ssh连接archlinux,方便复制粘贴命令**
>
> ```bash
> ssh [ip地址]@root
> #输入密码即可成功连接
> ```

### 1.3.7磁盘分区

#### fdisk软件分区

```bash
fdisk -l		#查看磁盘列表
```

![](https://s1.vika.cn/space/2023/04/14/a486688cc9a6498ba62fe18295522538)

```
fdisk /dev/sda		#对sda磁盘进行分区
```

> - fdisk操作命令
>   - m: 帮助
>   - g(小写g): 创建GPT格式磁盘
>   - n: 创建分区
>   - p: 查看分区
>   - q: 不保存退出
>   - w: 保存并退出 所有操作在执行"w"前都不会生效

![img](https://s1.vika.cn/space/2023/04/14/19d395dd4761416eb96503de9016e74f)

作为演示, 分以下四个分区

- 512MB的ESP启动分区
- 2G的交换分区
- 10G作为根目录/
- 剩下的作为home目录

![img](https://s1.vika.cn/space/2023/04/14/f7f0817f25c442ab9c46d675c786a7e6)

#### cfdisk软件分区

folding cyan,cfdisk软件分区

cfdisk分区软件操作比较简单,具体分区布局看下图

![img](https://s1.vika.cn/space/2023/04/14/121193dfec9b4aa0a20d08e8291ee9f8)

分好区后选择write并键入yes即可使分区生效

endfolding

> ```bash
> fdisk -l		#分好区后用此指令可以查看分区的状态
> ```

### 1.3.8格式化磁盘

```bash
#根据自己情况适当修改,不可照抄
mkfs.vfat /dev/sda1

mkswap /dev/sda2

mkfs.ext4 /dev/sda3

mkfs.ext4 /dev/sda4

swapon /dev/sda2
```

### 1.3.9挂载磁盘

```bash
#挂载根目录/
mount /dev/sda3 /mnt		#必须先挂载根目录,才能再挂载其他目录


#创建home,boot文件夹
mkdir /mnt/home
mkdir /mnt/boot

#挂载
mount /dev/sda4 /mnt/home
mount /dev/sda1 /mnt/boot
```

### 1.3.10往/mnt里安装系统

最基础的四个包是: base base-devel linux linux-firmeware

其余的按自己需求安装

```bash
pacstrap /mnt base base-devel linux linux-firmware dhcpcd iwd vim sudo bash-completion nano net-tools openssh man git wget zsh fish
```

### 1.3.11生成fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

- **查看是否成功生成**

```bash
cat /mnt/etc/fstab
```

![img](https://s1.vika.cn/space/2023/04/15/93edfde4bf124627a369e5196063059d)

### 1.3.12从live切换到刚安装的系统

```bash
arch-chroot /mnt
```

编辑**hostname**

```bash
#我这里填写的arch

echo [arch] > /etc/hostname			#将arch写入到/etc/hostname文件里

cat /etc/hostname					#查看/etc/hostname文件里的内容
```

编辑**hosts**

```bash
#我这里名字是arch,可自行更改

nano /etc/hosts

#向hosts文件里添加以下内容
127.0.0.1	localhost
::1			localhost
127.0.0.1	arch
```

- 设置**时区**和**硬件时间**设置

```bash
#设置时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#硬件时间设置
hwclock --systohc
```

### 1.3.13编辑语言环境

```bash
nano /etc/locale.gen
```

ctrl+w搜索en_US注意大小写

alt+w搜索下一个 找到en_US.UTF-8.UTF-8 然后把他取消注释

保存退出

```bash
locale-gen		#使刚才编辑的语言环境生效
```

### 1.3.14设置root密码

```bash
passwd root   	#当前账户就是root 可以不用打root
```

### 1.3.15添加新用户

```bash
用户名以arch为例

useradd -m -G wheel -s /bin/bash arch		#这里新建用户arch

#为arch设置密码
passwd arch
```

- 设置arch用户名的密码

  ```bash
  #编辑arch用户的权限
  EDITOR=nano visudo
  ```

  ctrl+w搜索%wheel

  找到**# %wheel ALL=(ALL:ALL)ALL**取消注释

### 1.3.16安装 cpu微码和引导软件

```bash
pacman -S intel-ucode grub efibootmgr os-prober
#如果是amd的cpu 则输入amd-ucode


#安装grub引导 如果不知道系统什么架构可以使用'uname -a'查看一下
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB


生成grub
grub-mkconfig -o /boot/grub/grub.cfg
```

![img](https://s1.vika.cn/space/2023/04/15/96749548992142d385ecb12fd4212472)

os-prober查找已安装的操作系统, 推荐双系统使用者安装此工具(虚拟机没必要)

```bash
pacman -S os-prober
```

### 1.3.17安装KDE桌面 字体 浏览器等软件包等

```bash
pacman -S plasma konsole dolphin     #kde桌面和终端，文件管理器

pacman -S ntfs-3g					#可以读取ntfs格式磁盘,根据自己情况选择性安装

#中文字体
pacman -S adobe-source-han-serif-cn-fonts adobe-source-han-sans-cn-fonts wqy-zenhei wqy-microhei noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-dejavu


#一堆软件,以下不是必须安装.可以根据自己情况选择性安装
pacman -S firefox ark gwenview packagekit-qt5 packagekit appstream-qt appstream man neofetch net-tools networkmanager openssh git wget
```

> - vmware虚拟机的自适应分辨率,**实体机请勿安装**
>
> ```bash
> pacman -S gtkmm gtk2 gtkmm3 open-vm-tools xf86-input-vmmouse xf86-video-vmware
> 
> #开机启动 显示管理器 网络管理 ssh 虚拟机自适应分辨率
> systemctl enable NetworkManager sddm vmtoolsd sshd
> #编辑配置文件
> nano /etc/mkinitcpio.conf
> MODULES=(vsock vmw_vsock_vmci_transport vmw_balloon vmw_vmci vmwgfx)
> #使刚才配置文件生效
> mkinitcpio -p linux
> ```

**至此系统基本安装完毕, 按照以下步骤重启准备进入系统**

- **exit**退回到**live**系统中
- **umount -R /mnt** 卸载/mnt目录
- **reboot**重启

![img](https://s1.vika.cn/space/2023/04/15/0bae9f13712841b59652d6ee34fa9227)

输入之前设置的密码即可进入系统

![img](https://s1.vika.cn/space/2023/04/15/7a196807ebbe4020bee0efd8f7c03965)

### 1.3.18最后调整

```bash
#修改pacman.conf

sudo nano /etc/pacman.conf

#取消'Color'前的注释,这样系统报错时会彩色显示,方便排查

#取消以下两行的注释
[multilib]
Include = /etc/pacman.d/mirrorslist



#再在最后面添加以下两行内容
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch


#保存并退出

#更新一下软件包
pacman -Sy
```

![img](https://cloud.atdunbg.xyz/2023-3-28-17.png)

**安装archlinuxcn-keyring包导入GPG key**

```bash
sudo pacman -S archlinuxcn-keyring
```

再次更新下源

```bash
sudo pacman -Sy
```

- yay paru都是aur助手, 任选一种, 还有其他的aur助手软件可以自行搜索

```bash
pacman -S yay paru
```

如果报错则执行以下命令

```bash
rm -rf /etc/pacman.d/gnupg     	#rm命令谨慎操作
pacman-key --init
pacman-key --populate archlinux
pacman-key --populate archlinuxcn
```

- 安装fcitx5输入法

  ```bash
  pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-pinyin-moegirl fcitx5-pinyin-zhwiki fcitx5-material-color
    
  #编辑运行环境 使fcitx5输入法生效
  EDITOR=nano sudoedit /etc/environment
    
  #输入以下内容
  GTK_IM_MODULE=fcitx
  QT_IM_MODULE=fcitx
  XMODIFIERS=@im=fcitx
  SDL_IM_MODULE=fcitx
    
  #重启以下系统即可
  ```

### 1.3.19结束安装

> 至此,系统已经全部安装完成.

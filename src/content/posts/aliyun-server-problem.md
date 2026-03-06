---
title: 关于服务器BPS/IOPS过高问题解决
published: 2025-11-16
description: ''
image: 'https://cdn.jsdelivr.net/gh/atdunbg/hexo_image_assets/images20251116230026021.png'
tags: ["服务器"]
category: '故障排除'
draft: false 
lang: ''
---


### 问题描述



> 配置： 2H2G
>
> 问题：服务器`BPS/IOPS` 一直处于高负载状态，系统一直在频繁与磁盘交换数据
>
> 造成的结果：服务器无法连接，服务器的服务全部失去连接，控制台无法通过普通重启来重启服务器，只能强制重启或关闭
>
> 原因分析：运行内存不足导致，由于内存不够系统需要频繁的与磁盘不停的交换数据，占用了大量的IO。







![shotcut](https://cdn.jsdelivr.net/gh/atdunbg/hexo_image_assets/images20251116230026021.png)



### 解决办法1

 升级配置，最简单最简单最无脑。



### 解决办法2

 通过拓展swap分区来缓解此问题



#### 查看系统的swap分区情况

通过`swapon`查看

```bash
swapon --show
```

我这里没有任何输出，说明根本不存在swap分区。



通过free看一下运行内存情况。

```bash
free -h
```

这里也可以看到swap全是0

```txt
               total        used        free      shared  buff/cache   available
Mem:           1.6Gi       831Mi       242Mi       1.8Mi       752Mi       844Mi
Swap:          0		   0		   0
```



#### 创建并配置swap

创建并启用一个swap (<span style="background-color: red;">注</span>：以下操作均需要<span style="color: red;">root</span>权限)

```bash
# 创建 swap 文件
fallocate -l 4G /swap

# 设置权限
chmod 600 /swap

# 格式化为swap
mkswap /swap

# 启用swap
swapon /swap

# 永久添加到fstab
echo '/swap none swap defaults 0 0' >> /etc/fstab
```



#### 配置 swappiness

检查`swappiness`（取值范围为 0 - 100，数值越大，使用swap的可能性越大）

```bash
cat /proc/sys/vm/swappiness

# 输出
0
```

我这里为0。



编辑 `/etc/sysctl.conf`将`vm.swappiness` 修改为20

```bash
vim /etc/sysctl.conf

# 修改 vm.swappiness
# vm.swappiness = 20
```



#### 更新内核参数

更新内核参数，使`swappiness`配置生效

```bash
sysctl -p
```



### 验证结果

再次查看内存和swap情况

 ```bash
 # 查看swap
 swapon --show
 
 #输出
 NAME      TYPE SIZE   USED PRIO
 /swap     file   4G 547.6M   -2
 
 
 # 查看内存
 free -h
 
 # 输出
                total        used        free      shared  buff/cache   available
 Mem:           1.6Gi       746Mi       665Mi       1.8Mi       414Mi       930Mi
 Swap:          4.0Gi       780Mi       3.2Gi
 ```


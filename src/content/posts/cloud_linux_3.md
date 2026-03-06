---
title: 云计算 - Linux服务与安全
published: 2023-04-27
description: ''
image: 'https://hexoimage.pages.dev/file/2369b0203a6961af7cd62.jpg'
tags: [云计算, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## 网络基础

### Socket 通讯

- 所谓socket通常也称作”套接字” ,用于描述IR地址和端口,是一个通信链的句柄。应用程序通常通过”套接字”向网络发出请求或者应答网络请求。

![img](https://s1.vika.cn/space/2023/04/19/c3c2efcc5f0840f4bb365212449401c1)

### C/S, B/S架构

**C/S（Client/Server）：客户端-服务器结构**

- C/S结构在技术上很成熟，它的主要特点是交互性强、具有安全的存取模式、网络通信量低、响应速度快、利于处理大量数据。因为客户端要负责绝大多数的业务逻辑和UI展示，又称为胖客户端。它充分利用两端硬件，将任务分配到Client 和Server两端，降低了系统的通讯开销。C/S结构的软件需要针对不同的操作系统系统开发不同版本的软件，加之产品的更新换代十分快，已经很难适应百台电脑以上局域网用户同时使用。

**B/S（Browser/Server）：浏览器-服务器结构，是目前应用系统的发展方向**

- BS是伴随着Internet技术的兴起，对C/S架构的改进，为了区别于传统的C/S 模式，特意称为B/S模式。在这种结构下，通过W3浏览器来进入工作界面，极少部分事务逻辑在前端（Browser）实现，主要事务逻辑在服务器端（Server）实现，形成三层（3-tier）结构。这样使得客户端电脑负荷大大简化（因此被称为瘦客户端），减轻了系统维护、升级的支出成本，降低了用户的总体成本（TCO）。

| 系统架构     | C/S                              | B/S                                    |
| ------------ | -------------------------------- | -------------------------------------- |
| 配置成本     | 高，客户机和服务器都需要配置软件 | 低，只需配置服器，客户机只需安装浏览器 |
| 维护更新成本 | 高，服务器和客户机均要维护更新   | 低，只维护更新服务器                   |
| 响应速度     | 快,没有中间环节                  | 慢                                     |
| 个性化定制   | 强                               | 弱                                     |

## 服务的基础

linux下的服务管理有两类:

- System V 服务
- Transient 服务

### System V 服务

System V， 曾经也被称为 AT&T System V，是Unix操作系统众多版本中的一支。它最初由 AT&T 开发，在1983年第一次发布。一共发行了4个 System V 的主要版本：版本1、2、3 和 4。System V Release 4，或者称为SVR4，是最成功的版本，成为一些UNIX共同特性的源头，例如 ”SysV 初始化脚本“ (/etc/init.d)，用来控制系统启动和关闭，System V Interface Definition (SVID) 是一个System V 如何工作的标准定义。

> - 通常被成为”System V” 或 “SysV”

- 许多脚本都是用文件系统目录的格式来组织的
- 可启用或者禁用资源服务
- 经常使用几个配置文件
- 大多数服务启动一个或多个进程
- 命令被“包裹”在脚本中.
- 服务由/etc/init.d/目录中的脚本管理
  - 例如: /etc/init.d/sshd status
  - service sshd status

#### chkconfig

> - 管理运行级别中的服务定义

- 在引导时启动cups服务: chkconfig cupS on
- 不会改变System V服务的当前运行状态
- 用于独立的和瞬时的服务
- 被其它应用程序调用,其中包括system-config-services命令
- 要列出服务在运行级别中的分配情况,需运行chkconfig –list 命令

#### /etc/sysconfig文件

> - 用于配置服务的运行方式

- named
- sendmail
- dhcpd
- samba
- syslog

### Transient 服务

> - 瞬时( Transient )服务被xinetd进程所管理

- 进入的请求首先被xinetd 代理

- 配置文件/etc/xinetd.conf , /etc/xinetd.d/service

- 用chkconfig控制的服务:

  ```
  chkconfig tftp on
  ```

### 计划任务

> - 一次性计划任务

- 周期性计划认任务
  - 系统的
  - 用户的
- Anacron

### 一次性计划任务

> - 包名: atd

- 命令:
  - at
  - batch - 当系统负载低于0.8时才运行
- 按Ctrl+D完成

**at**命令后需要跟上时间

时间的表示方式:

> - HH:MM

- midnight - 12:00 a.m.
- noon - 12:00 p.m.
- teatime - 4:00 p.m.
- MONTHDAYYEAR - 例如: January 15 2015
- MMDDYY - 例如: 011315
- now + TIME - now + 5 days

### 周期性的计划任务

> - 系统的- crontab

- 用户的- crond
  - 创建:crontab -e
  - 查看:crontab -l
  - 删除:crontab -r
- Anacron运行那些在系统当机期间未执行的cron任务
  - 假定计算机不是连续运行的
  - 对笔记本电脑,工作站及其它非连续运行的系统来说很重要
  - 对需要临时停机的服务器也有作用
- 配置文件: /etc/anacrontab
  - 字段1: 如果任务在指定的天数内没有运行
  - 字段2: 重启后在执行任务之前需要等待多久
  - 字段3: 任务标识符
  - 字段4: 需要运行的任务

### Rsyslog 服务

**把日志集中存储在一个安全的地方, 通过日志分析系统的运行情况. Rsyslog全称”the Rocket-fast SYStem for LOG processing”,是一种应用于UNIX和Linux计算机系统在IP网络转发日志消息开源软件实用的程序。它实现了基本的syslog协议,扩展了基于内容过滤的过滤能力,丰富灵活的配置选项,并增加了诸如使用TCP传输的特点。**

> - 格式: selector action
>   - selector : facility.level
>     - facility : who or what
>     - level : when
>   - action :如何处理这些信息

folding cyan, Facility

| Facility Number | Keyword  | Facility Description                     |
| --------------- | -------- | ---------------------------------------- |
| 0               | kern     | kernel messages                          |
| 1               | user     | user-level messages                      |
| 2               | mail     | mail system                              |
| 3               | daemon   | system daemons                           |
| 4               | auth     | security/authorization messages          |
| 5               | syslog   | messages generated internally by syslogd |
| 6               | Ipr      | line printer subsystem                   |
| 7               | news     | network news subsystem                   |
| 8               | uucp     | UUCP subsystem                           |
| 9               |          | clock daemon                             |
| 10              | authpriv | security/authorization messages          |
| 11              | ftp      | FTP daemon                               |
| 12              |          | NTP subsystem                            |
| 13              |          | log audit                                |
| 14              |          | log alert                                |
| 15              | cron     | clock daemon                             |
| 16              | local0   | local use 0 (local0)                     |
| 17              | local1   | local use 1 (local1)                     |
| 18              | local2   | local use 2 (local2)                     |
| 19              | local3   | local use 3 (local3)                     |
| 20              | local4   | local use 4 (local4)                     |
| 21              | local5   | local use 5 (local5)                     |
| 22              | local6   | local use 6 (local6)                     |
| 23              | local7   | local use 7 (local7)                     |

endfolding

folding cyan, Level

| Code | Severity      | Description   | General Description              |
| ---- | ------------- | ------------- | -------------------------------- |
| 0    | Emergency     | emerg(panic)  | System is unusable               |
| 1    | Alert         | alert         | Action must be taken immediately |
| 2    | Critical      | crit          | Critical conditions              |
| 3    | Error         | err(error)    | Error conditions                 |
| 4    | Warning       | warning(warn) | Warning conditions               |
| 5    | Notice        | notice        | Normal but significant condition |
| 6    | Informational | info          | Informational messages           |
| 7    | Debug         | debug         | Debug-level messages             |

endfolding

> - 日志文件

- /var/log/messages
- /var/log/dmesg
- /var/log/boot.log
- /var/log/maillog
- /var/log/secure
- /var/log/lastlog - 记录所有用户的最近登录信息。要用lastlog命令查看
- /var/log/btmp - 记录所有失败登录信息。用lastb命令查看
- /var/log/wtmp - 记录正常登录系统的信息。用w命令查看

### Logrotate

> - /etc/logrotate.conf
>   - weekly-每周rotate–次
>   - rotate 4 -保留四个日志文件
>   - create -创建一 个新的文件来存储日志
>   - compress -保留的日志文件是否要压缩,文件太大可以启动该参数
>   - minsize 1M-日志文件容量超过1M后才进行rotate

#### Logrotate 转发

> - 支持三种转发形式:
>   - UDP - @IP 1.1-1.1
>   - TCP - @@IP
>   - RELP - :omrelp:(最可靠)

- 启用UDP
  - $ModLoad imudp
  - $UDPServerRun 514
- 启用TCP
  - $ModLoad imtcp
  - $InputTCPServerRun 514
- $template TemplateName, “格式”, < options>
- 引号模板:
  - ? TemplateName

### ntpl (Network Time Protocol)

> - 时间同步使系统日志便于分析

- 许多应用需要精确的时间
- 如果没有校正，工作站的硬件时钟会随着时间逐渐产生漂移.
- NTP通过控制- -秒的长度来抵消时钟漂移
- NTP客户端应当配置三个时钟服务器
- 配置文件: /etc/ntp.conf
- 配置工具: system-config-date

## Tcp-warppers

![img](https://s1.vika.cn/space/2023/04/21/b80cddb42a8548989ffa16c3175e7a1a)

### 服务和应用程序的访问控制

> 服务特有的配置
>
> > 有些守护进程如httpd, smbd, squid等有自己的安全机制
> > 通用配置
> > 和libwrap.so相连接的所有程序都使用公共的配置文件
> > 因为xinetd和libwrap.so相连接,所以它的服务也受此影响
> > 检查主机和(或)远程用户名

### tcp_ wrappers配置

> - 检查访问权限的三三个步骤:
>   - 访问被明确允许.了 吗?
>   - 或者,访问被明确拒绝了吗?
>   - 或者,默认设置是允许访问!

- 配置被存放在两个文件里:
  - /etc/hosts.allow文件里保存允许的访问
  - /etc/hosts.deny文件里保存拒绝的访问
- 基本语法:
  - daemon_ *list: client* list [:options]

### 守护进程的说明

> - 守护进程名称:
>   - 应用程序传递它们的可执行文件名称
>   - 可以制定多个服务
>   - 使用通配符ALL来匹配所有守护进程

- 高级语法:
  - daemon@host: client_list …

### 宏定义

> - 主机名宏定义
>   - LOCAL
>   - KNOWN, UNKNOWN, PARANOID

- 主机和服务宏定义
  - ALL
- EXCEPT
  - 可用于客户和服务列表
  - 可嵌套
- 扩展选项
  - 语法:
    - daemon_ list: client list [:opt1 :p2..]I
  - spawn:
    - can be used to start additional programs
    - special expansions are available (%C, %s)
    - 例如:
    - in.telnetd: ALL : spawn echo “login attempt from %C to %s”| mail -S warning root
  - deny:
    - 可作为hosts.allow中的一个选项
    - 例如:
    - ALL: ALL: DENY

## SELinux

### MAC VS DAC

> - DAC- Discrentionary Access Control 自主访问控制
>   - 权限
>   - 拥有者、拥有组和其它人

- MAC - Mandatory Acess Control ( 强制访问控制)
  - 基于角色:
    - 一个组只代表一个或多个用户
    - 一个角色可以代表多个用户,也代表一个用户集可以执行的权限
  - 使用最小特权原则

![img](https://s1.vika.cn/space/2023/04/21/7dd55bcd388443eeb1a7b8e212cee6bb)
![img](https://s1.vika.cn/space/2023/04/21/61a109862768471a9b20bacbf16f88dd)

### SELinux - Secutiry-Enhanced Linux

**基于内核级别的MAC**

- SELinux是美国国家安全局( NSA= The National Security Agency )和SCC( Secure Computing Corporation )开发的Linux的一一个扩张强制访问控制安全模块。

![img](https://s1.vika.cn/space/2023/04/21/d34dc5807a5946b2bca55e836f6a0ed4)

> - 所有文件和进程都具备“安全环境”( security context )

- 环境包含几个元素,根据安全的需要使用不同的元素
  - user.role:type:sensitivity:category
  - user_ *u:object* *r:tmp* _t:s0:cO
- 查看:
  - ls -Z (查看文件或目录)
  - ps -Z (查看进程)
    - 通常和其它选项配对使用,例如-ef

| 登录名    | SELinux用户  | MLS范围        | Service |
| --------- | ------------ | -------------- | ------- |
| *default* | unconfined_u | s0-s0:c0.c1023 | *       |
| root      | unconfined_u | s0-s0:c0.c1023 | *       |
| system_ u | system_u     | s0-s0:c0.c1023 | *       |

#### role

> - object_ r -定义系统中的文件的通用的角色,必须是拥有system_ r角色的程序才能访问

- system_ _r - - -般为进程的角色

> - 一组叫做”策略( policy)”的规则会决定控制的严格程度

- 进程要么是被限制的(restricted) ,要么是无束缚的( unconfined)
- 策略被用来定义被限制的进程能够使用哪些资源
- 默认情况下将拒绝没有被明确允许的行为

#### Security Level

> - MLS - Multi-Lever Security (多等级安全)

- MLS未启用前:
  - user_ *u:role* *r:type* t
- MLS启用后:
  - user:role:type:sensitivity[:category…]- sensitivity [:category…]
- security level由两部分组成
  - sentitivity [ :category… ]
- sentitivity:
  - sO
  - s1
  - …
- category:
  - c0
  - …
  - c1023

### SELinux不能做什么?

> **不能替代杀毒软件**
> **不能替代认证机制、防火墙或其它安全系统**
> **它不是集所有功能于一身的安全解决方案**

### 启用和关闭SELinux

> - 修改/etc/sysconfig/selinux

- 三种模式:
  - enforcing -启动SELinux (策略生效,支持动态切换到permissive
  - permissive-策略不生效,相当于disabled,但是支持动态切换到enforcing ,并且访问生成日志
  - disabled -关闭SELinux
- 策略类型:
  - targeted :默认策略
  - MLS

### Booleans

> - Booleans :
>   - booleans允许在运行时改变SELinux策略
>   - 不必重新编译SELinux策略

- 查看booleans:
  - getsebool -a
- 设置booleans :
  - setsebool -P booleans_ name on|off(‘-P’:使修改值永久生效)

## **DNS 服务**

**DNS : Domain Name System**

> - 常用的主机名称服务
>   - 文件( /etc/hosts )
>   - DNS

- 早期,使用HOSTS存储主机名到IP地址的映射,由SRI (Stanford Research Institute)斯坦福研究所的NIC (网络信息中心)负责维护，各个主机通过 FTP进行更新

## Bind

> - 类型:系统V ( System V )管理的服务

- 软件包: bind, bind-utils,bind-chroot
- 守护进程: /usr/sbin/named
- 脚本: /etc/init.d/named
- 端口: 53 (domain)
- 配置文件: /etc/named.conf, /var/named/*
- 相关软件包: openssl
- service named configtest
- service named start
- chkconfig
- named on

### 区块文件结构

> - 资源记录都有五个字段) :
>   - Jomain -被查询的域或子域)
>   - ttl-记录被保存在缓存中的时间,以秒为单位
>   - class -记录类别，(通常是IN)
>   - type-记录类型,例如A或NS
>   - rdata一域映射的资源数据
>   - 从概念上讲,用户会查询domain (域名) , 而domain则映射到rdata来查找答案

### SOA查询

> - SOA ( Start Of Authority )记录将一 个服务器标记为主服务器

- 初步观察结果
  - 域字段叫做始发地址
  - rdata字段被引申为支持额外数据r 下-一个演示片对此进行了解释
  - 一般来说, -一个域通常有一 个主名称服务器,它保存数据的主要副本
  - 域或区块的其它规范性名称服务器被称为“从服务器”,它们会将其数据与主服务器同步
- SOA rdata
  - 主名称服务器的FQDN
  - 联系邮件地址
  - 序列号码
  - 在刷新序列号码之前刷新延迟时间
  - 从服务器的重试间隔
  - 当从服务器无法连接它的主服务器时，记录会过期
  - 否定性答复(“no such host”)的TTL最小值

| 记录类型 | 说明                   |
| -------- | ---------------------- |
| A        | 主机地址记录           |
| CNAME    | 别名                   |
| MX       | 接收邮件的服务器主机名 |
| NS       | 域名服务器             |
| PTR      | 反向查询记录           |
| SOA      | 该区域数据的授权机构   |

### DNS 主从

> - 从区块说明

```
zone "example.com"
{
    type slave;
    masters { mymasters; };
    file "slaves/example.com.zone";
};
```

- 示范性区块说明:
  - 只想根据master选项中的主机的区块文件传送( AXFR和IXFR )
  - 将传送到的数据保存在/var/named/slaves/example.com.zone
  - 重载named自动创建文件

### 访问控制列表(ACL)

> - 简单的说，ACL将一个名称分配给一个地址匹配列表

- 一般可以用来代替匹配列表(允许嵌套! )
- 最好的办法是在/etc/named.conf文件的开始处定义ACL
- 声明示例
  - acly”trusted {192.168.1.21; }
  - acl “classroom” { 192.168.0.0/24; trusted;};
  - acl “cracker” { 192.168.1.0/24; };
  - acl “mymasters” { 192.168.0.254; };
  - acl “myaddresses” { 127.0.0.1; 192.168.0.1; };
- 内置ACL
  - BIND预定义了几个ACL:
    - none - 不匹配任何IP地址
    - any - 匹配所有IP地址
    - localhost - 匹配名称服务的任何IP地址

## chroot

## bind-chroot软件包

> - 在/var/named/chroot中安装chroot环境

- 将现有的配置文件转移到chroot环境
- 更新/etc/sysconfig/named文件中named选项:
  - ROOTDIR=/var/named/chroot
- 提示
  - 安装了bind-chroot软件包后查看/etc/sysconfig/named
  - 启动了named后运行ps -ef| grep named来校验启动选项

## FTP 服务

![img](https://s1.vika.cn/space/2023/04/21/9a3fce5b446e40c3baf827cd6364401d)

### FTP软件

> - Vsftpd - Very Secure FTP Daemon
>   - 非常安全

- Pureftpd - the Pure FTP Daemon
  - 轻量级的
  - 快速的
  - 安全的口
- Proftpd - the Popular FTP Daemon
  - 配置简单
  - 支持虚拟主机
- Ncftpd
  - 高性能的

### 文件传输协议(FTP) - vsftpd

> - vsftpd -红帽企业版及普华Linux的默认ftp服务器
>   - 不再由xinetd,管理，
>   - 允许系统、匿名或虚拟(仅用于FTP服务)用户的访问
>   - 匿名目录层次结构由vsftpd RPM提供
>   - /etc/vsftpd/vsftpd.conf是主配置文件

### NFS

**NFS一Network File System**
**允许网络中的计算机之间通过TCP/IP网络共享资源**

**RPC- Romote Procedure Call**
**该协议允许运行于一台计算机的程序调用另一台计算机的子程序**

> - 类型:系统 V(System V)

- 软件包: nfs-utils
- 守护进程: rpc.nfsd, rpc.lockd, rpciod, rpc.mountd, rpc.rquotad, rpc.statd
- 脚本: /etc/init.d/nfs, /etc/init.d/nfslock
- 端口:2049(nfsd)
- 配置文件: /etc/exports
- 相关软件包: tcp_ wrappers

### 用于防火墙的端口选项

> - mountd, statd和lockd可以被强制使用一个静态端口

- 在/etc/sysconfig/nfs中设置MOUNTD_ PORT、STATD_ PORT LOCKD_ TCPPORTHE和LOCKD_ UDPPORT变量
  - MOUNTD_ PORT=”4002”
  - STATD_ PORT= “4003”
  - LOCKD_ TCPPORT= “4004”
  - LOCKD_ UDPPORT= “4004”

## WEB 服务

**Aparch**

### 服务侧写: httpd

> - 类型:系统V(SystemV)管理服务

- 软件包: httpd , httpd-devel , httpd-manual
- 守护进程: /usr/sbin/httpd
- 脚本: /etc/init.d/httpd
- 端口: 80(http)、443 ( https )
- 配置: /etc/httpd/* , /var/www/*
- 相关软件包: mod_ _ssl

### 邮件服务

> - MTA - Mail Transfer Agent

- MDA - Mail Delivery Agent
- MUA一Mail User Agent
- MRA一Mail Retiveral Agent

![img](https://s1.vika.cn/space/2023/04/22/70a968c6417346fba7159232e6adc2a6)

> - 安装:
>   - Sendmail
>   - Postfix

- 基本配置
- 监听的接口
- 测试

### SMTP命令

> - HELO连接者的主机名

- EHLO连接者的主机名( 使用ESMTP )
- MAIL FROM:
- RCPT TO:
- SIZE=bytes (指定发送邮件的大小)
- DATA
- QUIT
- VRFY username

### SMTP限制

> - 在/etc/mail/sendmail.mc中启用,使用
>
>   ```
>   FEATURE(blacklist recipients')dnl
>   ```

- 在/etc/mail/access中添加限制

  ```
  From:90trialspammer@aol.com     REJECT
  Connect:spamRus.net             REJECT
  Connect:204.168.23              REJECT
  Connect:10.3                    OK
  From:virtualdomain1.com         RELAY
  To:user@dom9.com                ERROR:550 mail discarded
  To:nobody@                      ERROR:550 bad name
  ```

### 服务侧写: dovecot

> - 类型:系统V管理的服务

- 软件包: dovecot
- 守护进程: /usr/sbin/dovecot口
- 脚本: /etc/init.d/dovecot 0
- 端口: 110 (pop), 995 (pop3s), 143 (imap), 993 (imaps)
- 配置: /etc/dovecot/dovecot.conf, /etc/dovecot/conf.d/
- 相关软件包: procmail, fetchmail, openssl

## 防火墙

### 防火墙功能

> - 内容过滤(元数据的过滤,内容过滤)

- NAT
- 状态检测
- Qos
- 一体化:
  - VPN
  - IPS(入侵检测)
  - AV (防毒墙)

### Iptable

![img](https://s1.vika.cn/space/2023/04/22/9ff63d7b61af4a5284f29d52d3b39bd6)

### Netfilter

> 在内核中过滤:无守护进程
> 在OSr参考模型(OSIReferenceModel)的第2、3、4层插入策略
> 只查看数据包标题
> 由内核中的netfilter 模块和iptables用户空间软件
> mangle: 用于对数据包相关字段的修改,如设置TOS、TTL
> nat: 只用于NAT转换时的访问控制
> filter: 默认表,用于一般的过滤

![img](https://s1.vika.cn/space/2023/04/22/6a93d3347db147be80059866d679f6bc)

### Netfilter

![img](https://s1.vika.cn/space/2023/04/22/96b00e25733d485d893d321274bdf70b)

```
iptable -t filter -A INPUT -s 192.168.0.1 -j DROP
# -t: 指定表
# -A: 添加策略
# -s: 指定源地址
# -j: 跳转
```

#### 规则目标

> - 内置自标: DROP, ACCEPT

- 扩展目标: LOG, REJECT,定制链( custom chain )
- REJECT给发送者返回-个通知
- LOG连接系统日志内核工具
- LOG匹配不会从链中退出
- 目标是可选的,但是每条规则最多只能有一个目标,如没有目标,就默认使用链的策略

#### 匹配规则

> - 按顺序配列的规则

- 按规则顺序测试数据包
- 首次匹配后会评估目标:通常退出链
- 规则可以指定多个匹配条件
- 必须满足规则说明中的每个条件才算是匹配(逻辑AND )
- 如果无匹配规则应用链策略

### SNAT

> - MASQUERADE
>   - iptables -t nat -A POSTROUTING -0 eth0 -j MASQUERADE

- SNAT
  - iptables -t nat -A POSTROUTING j SNAT –to-source 1.2.3.45

### /etc/passwd

| 字段 | 含义      | 说明                                                         |
| ---- | --------- | ------------------------------------------------------------ |
| 1    | 用户名    | 是uid的字符串标记方式                                        |
| 2    | 密码      | 在旧的unix系统中，该字段是用户加密后的密码，现在已经不再使用，而是将密码放在/etc/shadow中，所以此处都只是一个字母X |
| 3    | UID       | 系统用来区分不同用户的整数                                   |
| 4    | GID       | 系统用来区分不同用户组的整数                                 |
| 5    | 说明栏    | 类似于“注释”                                                 |
| 6    | 家目录    | 用户登录后，默认所处的目录，即家目录                         |
| 7    | 登录SHELL | 用户登录后，所使用的SHELL                                    |

### /etc/shadow

| 字段 | 含义                     | 说明                                                        |
| ---- | ------------------------ | ----------------------------------------------------------- |
| 1    | 用户名                   | 是VID的字符串标记方式                                       |
| 2    | 密码                     | 经过如密后的密码                                            |
| 3    | 密码的最近修改日         | 这个数字是从1970年1月1号至密码修改日的天数                  |
| 4    | 密码不可修改的天数       | 修改密码后，几天后不可修改密码，如果是0，意味着随时可以修改 |
| 5    | 密码重新修改的天数       | 密码什么时候过期                                            |
| 6    | 密码失效前提前警告的天数 | 设定密码过期前提前几天开始提醒                              |
| 7    | 密码失效宽限天数         | 密码过期后多少天，密码将失效                                |
| 8    | 账号失效日期             | 这个数字是从1970年1月1号至账号失效日的天数                  |
| 9    | 保留字段                 | 预留                                                        |

## 集中认证

> - 集中认证产品
>   - LDAP - AD , IPA, Oracle/IBM Directory Server
>   - NIS
>   - SAMBA
>   - LDAP + kerberos
>   - radius
>   - …

### LDAP

**Lightweight Directory Access Protocol (轻量型目录访问协议)**

> - 目录是一-个特殊的数据摩,通常存储一-些小的信息

- 例子:
  - 电话簿是- -个存储名字和电话的目录
  - DNS是一个存储主机名与IP的目录
  - NIS是- -个存储了系统信息,用户名和密码,还有email地址等的目录
- 使用目录服务
  - 查寻email地址和联系人信息
  - 管理和同步用户信息
  - 可以被其它网络服务使用
  - 存储和查找其它相关的信息
- LDIF
  - 一个标准的基于文本格式的文件,描述目录条目
  - 一个条目由一-列属性组成，每一行一个属性
  - dn,是一个条目独一的名字，必须位于第一行
  - 条目与条目之间用空行来分隔

### Sample Entry in LDIF Form

> - dn: uid=bjensen, ou=people, dc=example, dc=com

- objectclass: top
- objectclass: person
- objectclass: organi zationalPerson
- objectclass: inetOrgPerson
- cn:Barbara Jensen
- cn: Barb Jensen
- sn: Jensen
- uid: bjensen
- mail: bj ensen@example . com
- telephoneNumber: +1 919 754 3700
- postalAddress: Example， Inc.$123 Main
- Street$Any Town, NC 12345$USA
- title: Account Manager

#### 目录Schema

> - attribute types :规定属性的值的格式化,以及怎么比较相同类型的两个属性

- object classes :代表的一类相似的对象,规定哪些属性是必须的,哪些是可选的

#### Objects Classes

> - 一个object class组织相关的信息
>   - 定义了哪些属性是强制的,必须的
>   - objectclass属性定义了一个条目属于哪些object classes

- 有两种类型的object classes
  - 一个条目必须有一个structural object class
  - 一个条目可以有一 个或多个auxiliary object classes

## Kerberos

### 安全网络认证系统

> - 有三个参与者:
>   - Key Distribution Centor ( KDC )
>   - 网络服务
>   - 客户端用户

### 初始化认证

> - 用户输入用户名和密码

- 登录程序向KDC请求TGT
- KDC发送给登录程序-一个用用户的密码加密的TGT
- 如果登录程序能用用户输入的密码解密TGT ,用户就被成功认证

### 票据认证

> - 客户端向KDC发送访问服务所需要的票据的请求

- KDC发送给客户端两个相同的副本
  - 一个是用TGT加密的副本
  - 一个是用服务的密码加密的副本
- 客户端发送给网络服务
  - 一个是用服务的密码加密的副本
  - 一个是用票据加密的时间戳

### 标识参与者

> - 标识用户和网络服务
>   - 使用primary , instance和realm

- 格式: primary/instance@realm
- 例子:
  - student@ABC. COM
  - user1/admin@ ABC.COM
  - host/server1.abc.com@ ABC.COM
  - nfs/[host.abc.com@ABC.COM ](mailto:host.abc.com@ABC.COM)

## 目录服务 IPA

> - IPA:是一个集成解决方案
>   - Identity , Policy yand Audit

- IPA使用以下组件:
  - Red HatIDirectory Server
  - MIT kerberos
  - NTP
  - BIND
  - Web Management Tools
  - IPA command-line Tools

## 数据安全

### 随机数发生器

### 熵

> - 熵-用于描述系统混乱无序程序的物理量
>   - **熵越大,不确定性越大**

- 内核维护了一个熵池用来收集来自设备驱动程序和其它来源的环境噪音
- 内核提供来源:
  - /dev/random - 会阻塞,耗时长,但安全
  - /dev/urandom - 不会阻塞,需要借助键盘或鼠标等事件,随机程度不高,适合生成较低强度的密码

### 单向散列

**单项散列函数,又叫hash函数, 是一种将任意长度的数据缩小成固定长度指纹的一种方法**

#### 特性 - 确定性

如果两个散列值是不相同的(根据同- -函数) ,那么这两个散列值所对应的原始输入也是不同的

### 常见算法

MD2，MD5，MDC2,RMD160,SHA,SHA1

#### 常见工具

> - shalsum [ –check ] file

- md5sum [ –check ] file
- openssl
- gpg
- rpm -V

#### 应用场合

- 数据完整性检查
- 按照关键字查找数据记录

单项散列是不能取代**对称加密**和**不对称加密**,它们是互补的

对称加密

加密数据和解密数据, 基于同一个KEY

优点: 相比不对称加密,效率高
缺点: 相比不对称加密,安全性差

### 常用算法:

DES, 3DES , Blowfish, RC2 , RC4, RC6 ,IDEA, CAST5

#### 常见工具

- passwd
- gpg ( 3DES , CAST5 , Blowfish)
- openssl

#### 应用

信息量的数据, 一般用对称加密
对称加密和非对称加密常会结合使用

### 不对称加密

- 又叫公开密钥加密,是指一对加密密钥与解密密钥,用密码对当中的一个加密，必须是另一个密钥才能解密。公开的密钥为公钥,不公开的密钥叫私钥。
- 如果加密密钥公开,这用于客户给私钥所有者.上传加密的数据,这被称作公开
  密钥加密。
- 如果解密密钥公开,用私钥加密的信息,可以用公钥对其解密，由于客户验证持有私钥- -方发布的数据或文件是可靠的,接收者由此可知这条信息确实来自于拥有私钥的某人,这被称做**数字签名**。

#### 常见算法

> - RSA

- DSA
- EIGamal
- ECC
- Deffie-Hallman中的公钥加密算法

### GnuPG

**PGP - Pretty Good Privacy**

- 是PGP公司开发的加密签名工具套件
- openGPG是最广泛使用的email加密工具，最初是基于PGP开发的

#### **对称加密**

- gpg -C filename
- gpg -0 filename1 -d filename.gpg

#### **不对称加密**

- gpg –gen-key
- gpg –list-keys
- gpg –export –armor <key’s name> filename
- gpg –import filename
- gpg -e –armor-r <key’s name> filename

#### **数字签名和加密**

- gpg -sea -r <key’s name> filename
- gpg -d filename.asc

### PKI

**PKI - Public Key Infrastructure(公钥基础设施),是一套创建、存储、分发用于验证公钥的数字证书系统**

#### PKI组件

- CA- Certificate Authority
- RA - Registration Authority
- 最终用户

### 数字证书

- 用于认证
- 将公司、个人和公钥绑定
- 由CA颁发或自行签发证书

![img](https://s1.vika.cn/space/2023/04/22/4ebaca7a8b564601b2090880c79a884f)

### X.509

X.509是PKI中针对证书格式、证书吊销列表和授权证书等所制定的标准

> - 所包含的内容:
>   - 版本
>   - 序列号
>   - 算法ID
>   - 发行者
>   - 有效期
>   - 主题
>   - 证书签名
>   - 证书签名算法

### SSL

**SSL- Secure Sockets Layer**是一种安全协议,是Netscape公司在推出WEB浏览器首款时提出的,为网络通信提供数据安全及数据完整性。

工作在OSI的第六层.

- 优势:它是与第七层的应用层协议独立的,高层的应用层协议能透明的建立于SSL协议之上

#### TLS和SSL

- IETF将SSL做了标准化,即RFC2246,并将其称为TLS
- TLS - Transport Layer Security
- 从技术上, TLS和SSL相差不大

![img](https://s1.vika.cn/space/2023/04/22/a5abc6d4c7bf4fb6af33411ac4fe31c5)

#### TLS和SSL握手协议

![img](https://s1.vika.cn/space/2023/04/22/a78f6604d31e4d609204b2df67f887f7)

#### SSL应用

- SSH
- HTTPS
- IMAPS
- POP3S

### Openssl

**OpenssI是一个开源的SSL/TLS协议的实现工具,能用于生成keys或者加密解密数据,也能创造和管理X. 509数字证书。**

> - 加密
>   - openssI enc-des3 -salt - -a -in plaintext - -out ciphertext.des3

- 解密
  - openssI enc-d -des3 - salt -a -in ciphertext.des3 - out plaintext

**单项散列**

> - 命令
>   - openssl agst- -sha1 /boot/grub/grub.conf
>   - openssl passwd -1

**生成RSA公钥和私钥**

> - 生成不加密的私钥
>   - Openssl genrsa > somename.key

- 生成加密的私钥
  - OpenssI genrsa -aes128 2048 > somename.key
- 生成公钥
  - OpenssI rsa -in somename.key -pubout - -out public.key

**不对称加解密**

> - 加密
>   - openssl rsautl -encrypt -pubin -inkey public.key -in plaintext -out encrypted.txt

- 解密
  - openssI rsautl -decrypt -inkey private.key - -in encrypted.txt -out plaintext.txt

**生成CSR文件**

> - 命令
>   - openssI req -new -key somfile.key -out somefile.csr

#### 撤销证书

> - 命令
>   - openssI ca -revoke stolen.crt
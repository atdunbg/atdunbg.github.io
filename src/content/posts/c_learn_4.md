---
title: C语言学习-4
published: 2022-12-01
description: ''
image: 'https://t.alcy.cc/fj'
tags: [C语言, 笔记]
category: '笔记'
draft: false 
lang: ''
---

<meta name="referrer" content="no-referrer"/>

##  指针

### 1、了解数据在内存中如何存取

- 定义变量后，系统会为该变量分配内存单元。

  ```
  int i=5; //编译系统根据所定义变量类型（int）分配4个字节的存储空间供使用，且该存
  储空间的名字为i，内部存储数据为5；
  ```

- 内存中每一个字节都有一个编号——》地址

  - 根据地址能定位至内存中的某一确定位置

- 使用地址和变量名均可访问到数据（即对内存中数据的访问有两种形式：直接访问和间接访问）

  - 直接访问：按变量名存取变量值（知道房间名，直接看门牌去）
  - 间接访问：通过存放变量地址的变量去访问变量。（不知道房间名，也不知道地址，询问服务人员得知在2楼第1间，进入房间）

举例：
![1.jpg](https://s1.vika.cn/space/2022/12/01/db0523ab80ff4e09973fbc6332acd4ed)

### 2、什么是指针

- 指针：地址
- 指针变量：专门用来存放另一变量的地址（指针）的变量。
  - 区分指针和指针变量
    - 指针变量中存放指针
    - 指针是一个具体的地址

## 指针变量

### 1、定义指针变量

- 定义指针的一般形式

  ```
  类型名 *指针变量名
  int *p;                 //定义一个指针变量p，规定其可以指向整型变量。
  ```

注意事项：
note red modern
指针变量前面的"*"表示该变量为指针型变量，指针变量名是p，而不是 *p。

在定义指针变量时必须指定**基类型**（因为不同类型的数据在内存中所占的字节数和存放方式是不同的）
指向整形数据的指针类型表示为"int*"，读作指向int的指针，或 int指针

指针变量中只能存放地址（指针），试图将一个整数赋给一个指针变量是不合法的。

endnote

### 2、引用指针变量

- 给指针变量赋值

  ```c
  p = &a;                 //把a的地址赋给指针变量p；
  ```

- 引用指针变量指向的变量

  ```c
  p = &a;
  printf("%d",*p); //输出p所指向的变量的值，即a的值，*p的使用与a相同
  ```

- 引用指针变量的值

  ```c
  printf("%o",p); //以八进制输出指针变量p的值，p指向a，则输出a的地址
  ```

- **强调两个运算符。**

> "&"取地址运算符 &a是变量a的地址
> "*" 指针运算符（间接访问运算符） *p代表指针变量p指向的对象

例：

```c
#include <stdio.h>
int main()
{
    int a=50 , *p ;
    p=&a ;
    *p=100;
    printf("%d, %d, %o\n", a, *p, p);               //100, 100, 30577024
    printf("%o, %o\n",&*p, &a);              //30577024, 30577024
    printf("%d, %d\n",*&a, *p);                 //100, 100
    return 0;
}
```

### 3、指针变量作为函数参数

以输入a和b两个整数，按大小顺序输出为例

```c
#include<stdio.h>
int main()
{ 
    int *p1, *p2, *p, a, b;
    scanf("%d, %d", &a, &b);
    p1=&a; p2=&b;
    if ( a<b )
     {
        p=p1; p1=p2; p2=p;
     }
    printf("a=%d, b=%d\n", a, b);
    printf("max=%d, min=%d\n", *p1, *p2);
    return 0;
}


//a=5 , b=7
//max=7 , min=5
void swap(int x, int y)
{
    int t;
    t=x; x=y; y=t;
}
#include<stdio.h>
int main( )
{ 
    int a, b;
    scanf("%d,%d",&a,&b);
    if ( a<b ) 
        swap(a, b);
    printf("%d,%d\n", a,b);
    return 0;
}


//5,7
void swap(int *p1, int *p2)
{
    int *p;
    p=p1; p1=p2; p2=p; }
#include<stdio.h>
int main( )
{ 
    int a, b, *pa, *pb;
    scanf("%d, %d", &a, &b);
    pa=&a; pb=&b;
    if ( a<b ) 
        swap(pa, pb);
    printf("%d,%d\n",*pa,*pb);
    return 0;
}


//5, 7
void swap(int *p1, int *p2)
{ 
    int *p; //加上int c; p=&c; 即可成功
    *p=*p1; *p1=*p2; *p2=*p;
}
#include<stdio.h>
int main( )
{ 
    int a, b, *pa, *pb;
    scanf("%d, %d", &a, &b);
    pa=&a; pb=&b;
    if ( a<b ) 
        swap(pa, pb);
    printf("%d, %d\n", a, b);
    return 0;
}



//Run-Time Check Failure #3 - The variable 'p' is being used without being initialized.
void swap(int *p1, int *p2)
{ 
    int p;
    p=*p1; *p1=*p2; *p2=p; }
#include<stdio.h>
int main( )
{ 
    int a, b, *pa =&a, *pb =&b;
    scanf("%d, %d", pa, pb);
    if ( a<b ) 
        swap(pa, pb);
    printf("%d, %d\n", a, b);
    return 0;
}



//7, 5
```

- **函数调用不能改变实参指针变量的值，但可以改变其所指向的变量的值。**
- 主调函数和被调函数之间数值传递的方式
  - 实参—->形参的数据传递；return语句。
  - 全局变量。
  - 形参为指针。
  - 函数参数（形参或实参）为数组名或指针

```c
void fun(int a,int b,int *c,int *d)
{ *c=a+b ; *d=a-b ; }
#include<stdio.h>
int main( )
{ 
    int x , y , z , w ;
    scanf("%d,%d",&x , &y ) ;
    fun( x , y, &z , &w ) ;
    printf("%d,%d\n" , z , w ) ;
    return 0;
}
```

## 通过指针引用数组

- 关于数组

  ```c
  int a[5];                           //定义一个长度为5的整型数组，内含5个数组元素：
  a[0],a[1],a[2],a[3],a[4]  
                                        //对于数组元素的引用与普通变量相同
                                        //数组名a代表数组中首个元素的地址，即a[0]的地址
  ```

  更多关于数组

  点此跳转 

### 1、数组元素的指针

- 指针变量既然可以指向变量，自然也可以指向数组元素。

  ```c
  inta[5]={1,2,3,4,5};//定义a为包含5个整型数据的数组
  ```

  ```c
  int*p;               //定义p为指向整型变量的指针变量
  p=&a[0];         //把a[0]元素的地址赋给指针变量
  ```

  等价于

  ```c
  int*p=&a[0];//定义时直接进行初始化
  ```

  等价于

  ```c
  int*p=a;//因为数组名a代表的就是&a[0]
  ```

### 2、在引用数组元素时的指针运算

**运算：数据的加减乘除**
**指针是内存地址编号，运算的意义？**
**一定条件下，允许对指针进行加减运算。**
**该条件指：指针指向数组元素。**

- 如果指针变量p已指向数组中的某个元素
  *p+1指向数组中该元素的下一个元素//指针运算中加减的数值是默认乘以（该数据类型所占内存字节数）之后参与运算的

  - p-1指向数组中该元素的上一个元素

  - p++,++p,p–,–p,+=,-=均是合法运算

  - 的初值未&a[0]，则p+i和a+i就是数组元素a[i]的地址。

  - *(p+i)或*(a+i)就是p+i或a+i所指向的数组元素

  - 若指针p和q均指向同一数组中的元素，则执行p-q，所得结果表示两者所指元素中间的差值个数。
    *p+q无意义。

    ```c
    #include<stdio.h>
    int main()
    {
        int a[3]={100,200,300};
        int *p=a;                //等价于int*p=&a[0];
        int *q=&a[1];
        printf("%d",*p);                   //100
        printf("%d",*(p+2));             //300
        printf("%d",*(q-1));              //100
        printf("%d",*(a+2));             //300
        printf("%d",q-p);                 //1
        return 0;
    }
    ```

### 3、通过指针引用数组元素

- 引用一个数组元素，可以用下面两种方法：
  - 下标法a[i]
  - 指针法*(a+i)或*(p+i)//a是数组名，p是指向数组中首元素的指针变量。
    查看课本P231页例8.6

note red modern
**注意：**

- 可以通过改变指针变量的值指向不同的元素例p++，但需注意不能通过数组名a变化的方法，因为数组名a为一个指针型常量。
- 使用指针变量时，需要注意指针变量的当前值。

endnote

### 4、用数组名做函数参数

- 就第七章所学，当用数组名做参数时，形参数组中各元素值发生改变，实参数组元素值随之变化作解释

- 实参数组名代表该数组首元素地址

- 形参用来接收从实参传递过来的数组首元素地址。

- 因此，形参是一个指针变量（因为只有指针变量才能存放地址）

- 实际上，C编译将形参数组名作为指针变量来处理。

  ```c
  fun(int arr[],int n);        //等效于fun(int *arr,int n);
  ```

- 实参数组名代表一个固定的地址，或者说是指针常量，但形参数组名并不是一个固定的地址，而是按指针变量处理。因此在函数执行期间，它可以再被赋值。

**若有一个实参数组，要想在函数中改变此数组中元素的值，实参与形参对应关系有以下四种情况：**

- 形参和实参都用数组名

  ```c
  #include<stdio.h>
  void fun(int b[])
  {
      int i;
      for(i=0;i<=4;i++)
      {
          b[i]=100;
      }
  }
  int main()
  {
      int a[5]={0};
      int i;
      fun(a);
      for(i=0;i<=4;i++)
      {
          printf("%d",a[i]);
      }
      return 0;
  }
  ```

- 实参用数组名，形参用指针变量

  ```c
  #include<stdio.h>
  void fun(int*b)
  {
      int i;
      for(i=0;i<=4;i++)
      {
          *(b+i)=100;
      }
  }
  int main()
  {
      int a[5]={0};
      int i;
      fun(a);
      for(i=0;i<=4;i++)
      {
           printf("%d",a[i]);
      }
      return 0;
  }
  ```

- 实参形参都用指针变量

  ```c
  #include<stdio.h>
  void fun(int*b)
  {
      int i;
      for(i=0;i<=4;i++)
      {
          *(b+i)=100;
      }
  }
  int main()
  {
      int a[5]={0};
      int i;
      int *p;
      p=a;
      fun(p);
      for(i=0;i<=4;i++)
      {
          printf("%d",a[i]);
      }
      return 0;
  }
  ```

- 实参为指针变量，形参为数组名

  ```c
  #include<stdio.h>
  void fun(int b[])
  {
      int i;
      for(i=0;i<=4;i++)
      {
         b[i]=100;
      }
  }
  int main()
  {
      int a[5]={0};
      int i;
      int *p;
      p=a;
      fun(p);
      for(i=0;i<=4;i++)
      {
          printf("%d",a[i]);
      }
      return 0;
  }
  ```

## 通过指针引用字符串

### 1、引用字符串的两种方法：

- 字符数组内存放字符串，用数组名和%s输出
- 用字符指针变量指向一个字符串常量，通过字符指针变量引用字符串常量。

### 2、字符指针作函数参数

**实参与形参对应关系有以下四种情况**

- 形参和实参都用字符数组名
- 实参用数组名，形参用字符指针变量
- 实参形参都用指针变量
- 实参为指针变量，形参为字符数组名
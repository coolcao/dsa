---
title: 学习笔记-数据结构与算法js实现-【2】栈
date: 2016-11-30 19:04:39
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

栈是一种遵从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的 末尾，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
在现实生活中也能发现很多栈的例子。例如，下图里的一摞书或者餐厅里堆放的盘子。
栈也被用在编程语言的编译器和内存中保存变量、方法调用等。

<!--more-->

## 方法列表
|属性或方法名|类型|说明|
|----|----|----|
|push(element)|方法|向栈顶推入元素|
|pop()|方法|弹出栈顶元素|
|peek()|方法|返回栈顶元素，并不改变栈|
|isEmpty()|方法|判断栈是否为空|
|clear()|方法|清空栈|
|size()|方法|返回栈的元素个数|

## 栈的实现
```js
class Stack {
    constructor() {
        this.data = [];
    };

    /**
     * 向栈中推入元素
     * @param  {element} item 要推入的元素
     * @return {null}
     */
    push(item) {
        let size = this.size();
        this.data[size] = item;
    };

    /**
     * 删除并返回栈顶元素
     * @return {element} 栈顶元素
     */
    pop() {
        let size = this.size();
        let e = this.peek();
        delete this.data[size - 1];
        this.data.length = size - 1;
        return e;
    };

    /**
     * 只返回栈顶元素，不修改栈
     * @return {element} 栈顶元素
     */
    peek() {
        let size = this.size();
        let e = this.data[size - 1];
        return e;
    }

    /**
     * 判断栈是否为空
     * @return {Boolean} 栈为空，返回true,否则返回false
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * 清空栈
     * @return {null}
     */
    clear() {
        this.data = [];
    };

    /**
     * 返回栈中元素的个数
     * @return {Number} 栈中元素的个数
     */
    size() {
        return this.data.length;
    };

    toString() {
        return this.data;
    };
};
```
栈依然是线性的结构，因此这里实现的时候还是用数组实现的。定义一个类Stack，里面有一个属性data用于存储数据。
然后依次实现栈的入栈出栈方法。

## 栈的应用
### 十进制转换二进制
我们在上学的时候就知道，十进制转换二进制使用辗转相除，将余数逆向输出。对，就是这个逆向输出，说明了我们可以使用栈来解决这个问题。
转换的过程：

![十进制转换二进制](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/decimal2binary.png)

实现的代码：

```js
const divideBy2 = function divideBy2(decNumber) {
    let s = new Stack();
    let str = '';
    while (decNumber > 0) {
        s.push(Math.floor(decNumber %2));
        decNumber = Math.floor(decNumber / 2);
    }
    while (!s.isEmpty()) {
        str += s.pop().toString();
    }
    return str;
}
```

### 回文判断
回文是指一个单词或短语，从前往后写和从后往前写都是一样的。比如单词'dad','racecar'等。
由于判断时，前后顺序颠倒，我们也可以使用栈结构来判断。
我们将原始字符串字符正序压入栈，然后再逐个出站，得到一个新的字符串，只要判断这个字符串和原始字符串相同即可。

代码实现：

```js
const isPalindrome = function isPalindrome(word) {
    if(Object.prototype.toString.call(word) != '[object String]'){
        throw new Error('参数word只能为字符串类型');
    }
    let s = new Stack();
    for(let c of word){
        s.push(c);
    }
    let rword = '';
    while (s.length() > 0) {
        rword += s.pop();
    }
    if(word === rword){
        return true;
    }
    return false;
}
```


### 递归演示
栈常常被用来实现编程语言，使用栈实现递归即为一例。这里我们模拟一下使用栈来模拟递归操作。
我们来看一下阶乘。

```
5! = 5 * 4 * 3 * 2 * 1 = 120
```

代码实现的递归：

```js
const factorial = function (n) {
    if(n === 0){
        return 1;
    }else{
        return n * factorial(n - 1);
    }
}
```

使用栈来模拟计算5!的过程，首先将数字5到1压入栈，然后将数字逐个弹出连乘，就得到了答案。

```js
var fact = function fact(n) {
    let s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    let product = 1;
    while (s.size() > 0) {
        product *= s.pop();
    }
    return product;
}
```

## 小结
栈也是相当比较简单的线性数据结构，js的数组原生实现push(),pop()方法就是栈的入栈出栈方法。在实际编码中，我们直接将数组当做栈，灵活运用push()，pop()方法来实现功能。

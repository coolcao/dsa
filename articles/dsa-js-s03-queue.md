---
title: 学习笔记-数据结构与算法js实现-【3】队列
date: 2016-12-01 11:28:35
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

队列也是一种线性数据结构，与栈类似，但不同的是，栈是后进先出（LIFO），而队列是先进先出（First-In-First-Out，FIFO）。
队列只能在队尾添加元素，称为入队。在队头删除元素，称为出队。

![队列入队出队示意图](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/queue.png)

<!--more-->

## 方法列表
|方法或属性|类型|说明|
|----|----|----|
|enqueue()|方法|入队|
|dequeue()|方法|出队|
|front()|方法|返回队列头元素|
|backend()|方法|返回队列尾元素|
|isEmpty()|方法|判断队列是否为空|
|size()|方法|返回队列元素个数|

## 代码实现
```js
class Queue{
    constructor(){
        this.data = [];
    };
    toString(){
        return 'Queue:' + JSON.stringify(this.data);
    };
    /**
     * 入队
     * @param  {element} item 要入队的元素
     * @return {Queue} 入队后的队列
     */
    enqueue(item){
        let length = this.size();
        this.data[length] = item;
        return this;
    };

    /**
     * 出队
     * @return {element} 出队元素
     */
    dequeue(){
        let e = this.data[0];
        let length = this.size();
        for (let i=0; i < length - 1; i++) {
            this.data[i] = this.data[i+1]
        }
        this.data.length --;
        return e;
    };

    /**
     * 清空队列
     * @return {null}
     */
    empty(){
        this.data = [];
    };

    /**
     * 判断队列是否为空
     * @return {Boolean} 队列为空，返回true,否则返回false
     */
    isEmpty(){
        return this.data.length == 0;
    };

    /**
     * 读取队首元素
     * @return {element} 队首元素
     */
    front(){
        return this.data[0];
    };

    /**
     * 读取队尾元素
     * @return {element} 队尾元素
     */
    backend(){
        return this.data[this.data.length - 1];
    };

    /**
     * 返回队列中元素个数
     * @return {Number} 队列中元素个数
     */
    size(){
        return this.data.length;
    };
}
```

## 队列应用
### 基数排序
对于 0~99 的数字，基数排序将数据集扫描两次。第一次按个位上的数字进行排序，第二 次按十位上的数字进行排序，最后，将盒子中的数字取出，组成一个新的列表，该列表即为排好序的数字。
假如有如下数字：
91, 46, 85, 15, 92, 35, 31, 22
经过基数排序第一次扫描后，数组被分配到如下盒子里：
Bin 0:
Bin 1: 91, 31
Bin 2: 92, 22
Bin 3:
Bin 4:
Bin 5: 85, 15, 35
Bin 6: 46
Bin 7:
Bin 8:
Bin 9:
根据盒子的顺序，对数字进行第一次排序的结果是：
91, 31, 92, 22, 85, 15, 35, 46
然后根据十位上的数值再将上次排序的结果分配到不同的盒子中:
Bin 0:
Bin 1: 15
Bin 2: 22
Bin 3: 31, 35
Bin 4: 46
Bin 5:
Bin 6:
Bin 7:
Bin 8: 85
Bin 9: 91, 92
最后，将盒子中的数字取出，组成一个新的列表，该列表即为排好序的数字:
15, 22, 31, 35, 46, 85, 91, 92

代码实现：

```js
const sortByBase = function(array, base) {

    if (!Array.isArray(array)) {
        throw new Error('参数array必须为数组类型');
    }
    if (Object.prototype.toString.call(base) != '[object Number]') {
        throw new Error('参数base必须为整型');
    }

    //初始化10个盒子
    let q = [];
    let label = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i of label) {
        q[i] = new Queue();
    }

    array.forEach(function(item) {
        let n = item % (base * 10) / base >>> 0;
        q[n].enqueue(item);
    });

    let r = [];
    for (let i of label) {
        let _queue = q[i];
        while (!_queue.isEmpty()) {
            r.push(_queue.dequeue());
        }
    }
    return r;
}
let array = [91, 46, 85, 15, 92, 35, 31, 22];
array = sortByBase(array,1);
array = sortByBase(array,10);
console.log(array);
```

## 优先队列
在一般情况下，从队列中删除的元素，一定是率先入队的元素。但是也有一些使用队列的 应用，在删除元素时不必遵守先进先出的约定。这种应用，需要使用一个叫做优先队列的 数据结构来进行模拟。
从优先队列中删除元素时，需要考虑优先权的限制。
我们修改原先队列中的结构，将队列元素抽象成一个element，包含两个属性：data和code优先级：

```js
class Element{
    constructor(data,priority){
        this.data = data;   //保存数据
        this.priority = priority;   //保存优先级,优先级为[0,1,2,3,4,5,6,7,8,9]值越大，优先级越高默认优先级0
    };
    toString(){
        return this.data + ':' + this.priority;
    };
};
```

这时候，我们的入队和出队操作要考虑优先级了，修改如下：

```js
/**
 * 入队
 * @param  {any} data               要插入数据
 * @param  {Number} priority        优先级，默认为0
 * @return {PriorityQueue}          队列本身
 */
enqueue(data, priority = 0) {
    if (!data) {
        throw new Error('参数data不能为空');
    }

    let length = this.size();
    this.data[length] = new Element(data, priority);
    return this;
};

/**
 * 出队
 * @return {[type]} [description]
 */
dequeue() {
    let priority = 0;
    let index = 0;
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].priority > priority) {
            index = i;
            priority = this.data[i].priority;
        }
    }

    let e = this.data[index];
    let length = this.size();
    for (let i=index; i < length - 1; i++) {
        this.data[i] = this.data[i+1]
    }
    this.data.length --;
    return e;
};
```

我们在入队时，没有根据优先级做任何操作，而是只在出队时，根据优先级大小选择优先出队。
当然，也可以在入队时，直接根据优先级选择入队位置，而在出队时，队头出队即可。

## 练习
* 修改 Queue 类，形成一个 Deque 类。这是一个和队列类似的数据结构，允许从队列两端 添加和删除元素，因此也叫双向队列。
双向队列就是在原先队列的基础上，加了一个允许从两端添加和删除。这和原生的数组的push(),pop(),shift(),unshift()是一样的。
其实原生数组已实现了，但是为了学习，我们再自己实现一遍。

```js
class Deque{
    constructor(){
        this.data = [];
    }
    /**
     * 尾部添加元素
     * @param  {element} element 要添加的元素
     * @return {null}
     */
    push(element){
        let size = this.size();
        this.data[size] = element;
    }
    /**
     * 尾部删除并返回删除的元素
     * @return {element} 删除的元素
     */
    pop(){
        let size  = this.size();
        let e = this.data[size - 1];
        this.data.length = size - 1;
        return e;
    }
    /**
     * 头部添加元素
     * @param  {element} element 要添加的元素
     * @return {null}
     */
    unshift(element){
        let size = this.size();
        for(let i=size;i>0;i--){
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = element;
    }
    /**
     * 头部删除元素，并返回删除的元素
     * @return {element} 演出的元素
     */
    shift(){
        let size = this.size();
        let e = this.data[0];
        for(let i=0;i<size - 1;i++){
            this.data[i] = this.data[i + 1];
        }
        this.data.length = size - 1;
        return e;
    }
    size(){
        return this.data.length;
    }
}
```

这里只实现了几个主要的方法，其他方法很简单了。这样我们就简单实现了双向队列。

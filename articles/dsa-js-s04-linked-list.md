---
title: 学习笔记-数据结构与算法js实现-【4】链表
date: 2016-12-02 14:59:53
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

要存储多个元素，数组可能最常用的数据结构。但是数组有一个缺点：在大多数语言中，数组的大小是预先固定的，从数组的起点或中间插入值或移除项，成本会很高，因为要移动很多项。
尽管js中的数组大小不是固定的，而且js数组原生已经实现了中间添加删除等操作，但js数组底层使用的是对象实现的，与C,Java等语言相比，效率很低。
这时，我们可以考虑使用链表来代替。

<!--more-->

链表存储有序的元素集合，但不同于数组，链表中的数据在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。下图展 示了一个链表的结构:

![链表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/linkedlist.png)

相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然 而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何 位置的任何元素，而要想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到 所需的元素。
然而要标识出链表的起始节点却有点麻烦，许多链表的实现都在链表最前面有一个特殊节 点，叫做头节点。

## 链表的实现
上面分析过，每个链表的节点由两部分组成：节点数据和指向下个节点的引用。
因此，链表我们设计两个类：Node类，节点类，LinkedList类，链表类。

```js
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
    toString(){
        return this.element;
    }
}
```

Node类用以表示节点类，里面有两个属性:element保存元素值，next保存下个元素的引用，如果没有下个元素，则next为空。

对于链表的插入操作，我们要指定插入元素的位置，即在谁的后面插入。将其next指向新插入的元素，而新元素的next指向之前元素的next即可。
删除操作，将待删除元素的上一个节点的next指向其下一个节点即可。
完整实现：

```js
class LinkedList {
    constructor() {
        this.head = new Node(Symbol.for('head'));
    }

    /**
     * find 查找元素，找到返回元素，如果没找到，返回null
     * @param  {element} element 要查找的元素
     * @return {Node}         查找到的节点
     */
    find(element) {
        if(!element){
            return null;
        }
        let currentNode = this.head;
        while (currentNode && currentNode.element !== element) {
            currentNode = currentNode.next;
            if (currentNode === null) {
                break;
            }
        }
        return currentNode;
    }

    /**
     * findPrev 查找元素的上一个节点,如果找不到返回null
     * @param  {element} element 要查找的元素
     * @return {Node}         元素的上一个节点
     */
    findPrev(element) {
        let prevNode = null;
        let currentNode = this.head;
        while (currentNode && currentNode.element !== element) {
            prevNode = currentNode;
            currentNode = currentNode.next;
            //如果最后一个节点已经遍历完，说明没有该元素，则其前驱也没有，返回null
            if (currentNode === null) {
                prevNode = null;
                break;
            }
        }
        return prevNode;
    }

    /**
     * insert 插入新元素
     * @param  {element} ne 要插入的新元素
     * @param  {element} e  插入到原链表中这个元素后面
     * @return {null}
     */
    insert(ne, e) {
        let currentNode = this.find(e) || this.head;
        let next = currentNode.next;
        let newNode = new Node(ne);
        currentNode.next = newNode;
        newNode.next = next;
    }

    /**
     * remove 删除节点，先找到该节点前面的节点，然后进行删除
     * @param  {element} element 要删除的节点元素
     * @return {null}
     */
    remove(element) {
        let prevNode = this.findPrev(element);
        if(prevNode){
            prevNode.next = prevNode.next.next;
        }

    }

    /**
     * 判断链表是否为空
     * @return {Boolean} 为空返回true,否则返回false
     */
    isEmpty(){
        let head = this.head;
        return head.next == null;
    }

    /**
     * 返回链表中元素个数
     * @return {Number} 链表中元素个数
     */
    size(){
        let i = 0;
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
            i++;
        }
        return i;
    }


    display() {
        let currentNode = this.head;
        let s = 'head';
        while (currentNode.next) {
            currentNode = currentNode.next;
            s = s + '-->' + currentNode.element;
        }

        return s;
    }
}
```

## 双向链表
双向链表是含有两个引用 previous和next分别指向其前一个和后一个节点的引用。
这里我们要修改节点类，加入previous引用。

![双向链表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/double_linked_list.png)

```js
class Node {
    constructor(element) {
        this.next = null;
        this.previous = null;
        this.element = element;
    }
    toString(){
        return this.element;
    }
}
```

由于加入了前后节点的引用，因此插入和删除方法都要修改一下，最后完整代码：

```js
class DoubleLinkedList {
    constructor() {
        this.head = new Node(Symbol.for('head'));
    }

    /**
     * find 查找元素，找到返回元素，如果没找到，返回null
     * @param  {element} element 要查找的元素
     * @return {Node}         要返回的节点
     */
    find(element) {
        if(!element){
            return null;
        }
        let currentNode = this.head;
        while (currentNode.element !== element) {
            currentNode = currentNode.next;
            if (currentNode === null) {
                break;
            }
        }
        return currentNode;
    }

    /**
     * findLast 查找链表的最后一项
     * @return {Node] 链表中的最后一个节点
     */
    findLast() {
        let currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    /**
     * insert 插入新元素
     * @param  {element} ne 要插入的新元素
     * @param  {element} e  插入到原链表中这个元素后面
     * @return {null}
     */
    insert(ne, e) {
        let currentNode = this.find(e) || this.head;

        let next = currentNode.next;
        let newNode = new Node(ne);

        currentNode.next = newNode;
        newNode.next = next;
        newNode.previous = currentNode;
        if(next){
            next.previous = newNode;
        }
    }

    /**
     * remove 删除节点，先找到该节点前面的节点，然后进行删除
     * @param  {element} element 要删除的节点
     * @return {null}
     */
    remove(element) {
        let currentNode = this.find(element);
        if(currentNode){
            let nextNode = currentNode.next;
            let prevNode = currentNode.previous;
            if(nextNode){
                nextNode.previous = prevNode;
            }
            if(prevNode){
                prevNode.next = nextNode;
            }
        }
    }
    display() {
        let currentNode = this.head;
        let s = 'head';
        while (currentNode.next) {
            currentNode = currentNode.next;
            s = s + ' < -- > ' + currentNode.element;
        }
        return s;
    }
}
```

## 循环链表
循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链 表之间唯一的区别在于，最后一个元素指向下一个元素的指针(tail.next)不是引用null， 而是指向第一个元素(head)，如下图所示。

![循环链表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/looplinkedlist.png)

双向循环链表有指向head元素的tail.next，和指向tail元素的head.prev。

![双向循环链表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/doublelooplinkedlist.png)

这里我们以单向循环链表为例，实现如下：

```js
class LinkedList {
    constructor() {
        this.head = new Node(Symbol.for('head'));
        this.head.next = this.head;
    }

    /**
     * find 查找元素，找到返回元素，如果没找到，返回null
     * @param  {string} element 要查找的元素
     * @return {Node}         要返回的节点
     */
    find(element) {
        if(!element){
            return null;
        }
        let currentNode = this.head;
        while (currentNode.element !== element) {
            currentNode = currentNode.next;
            if (currentNode === this.head) {
                break;
            }
        }
        return currentNode == this.head?null:currentNode;
    }

    /**
     * findPrev 查找元素的上一个节点,如果找不到返回null
     * @param  {element} element 要查找的元素
     * @return {Node}         元素的上一个节点
     */
    findPrev(element) {
        let prevNode = null;
        let currentNode = this.head;
        while (currentNode.element !== element) {
            prevNode = currentNode;
            currentNode = currentNode.next;
            //如果最后一个节点已经遍历完，说明没有该元素，则其前驱也没有，返回null
            if (currentNode === this.head) {
                prevNode = null;
                break;
            }
        }
        return prevNode;
    }

    /**
     * insert 插入新元素
     * @param  {element} ne 要插入的新元素
     * @param  {element} e  插入到原链表中这个元素后面
     * @return {null}
     */
    insert(ne, e) {
        let currentNode = this.find(e) || this.head;
        let newNode = new Node(ne);
        let nextNode = currentNode.next;
        currentNode.next = newNode;
        newNode.next = nextNode;
    }

    /**
     * remove 删除节点，先找到该节点前面的节点，然后进行删除
     * @param  {element} element 要删除的节点
     * @return {null}
     */
    remove(element) {
        let prevNode = this.findPrev(element);
        if(prevNode){
            prevNode.next = prevNode.next.next;
        }

    }
    display() {
        let currentNode = this.head;
        let s = 'head';
        while (currentNode.next !== this.head) {
            currentNode = currentNode.next;
            s = s + ' -- > ' + currentNode.element;
        }
        s += ' --> head';
        return s;
    }
}
```

## 链表相关题目
> ### 输入一个链表，输出该链表中倒数第k个节点。例如，输入 head->1->2->3->4->5 ,倒数第2个节点为4。

我们已经有size()方法获取链表的大小了，因此如果要获取倒数第k个也不难。直接使用这个size做相关操作即可。

```js
/**
 * 找出链表中倒数第n个元素
 * @param  {LinkedList} llist   链表
 * @param  {Number} n
 * @return {element}         找到的倒数第n个值
 */
var findKthToTail = function findKthToTail(llist, n) {
    let size = llist.size();
    let rvalue = null;
    if (n <= size) {
        let head = llist.head;
        let currentNode = head.next;
        for (let i = 0; i < size - n; i++) {
            currentNode = currentNode.next;
        }
        rvalue = currentNode.element;
    }
    return rvalue;
}

```

我们获取到链表的大小后，然后遍历链表，当遍历到倒数第n个时返回其值即可。


> ### 逆转链表:有一个单向链表，写一个方法将其逆转

这里要将其逆转，只要遍历时记住上一个节点，让其next引用指向上一个节点即可。

```js
var reverseLinkedList = function reverseLinkedList(llist){
    let pre = null;
    let head = llist.head;
    let current = head.next;
    while (current){
        let next = current.next;
        current.next = pre;
        if(!next){
            head.next = current;
            return llist;
        }
        pre = current;
        current = next;
    }
    return llist;
}
```

> ### 如何判断一个单向链表中是否存在环
![存在环的单向链表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/loopinlinkedlist.png)

#### 方案1:
链表中存在环，必然有节点会重复访问，我们将访问过的节点存在到一个数组里，每当访问一个节点时，先检查这个数组里有没有这个节点，如果有，那说明已经访问过了，必然存在环。

```js
var existLoop = function existLoop(llist){
    let visted = [];
    let current = llist.head;
    while (current.next) {
        current = current.next;
        if(visted.indexOf(current.element) > -1){
            return true;
        }
        visted.push(current.element);
    }
    return false;
}
```

#### 方案2:
方案1中要使用额外的空间，而且每次计算该点是否被访问过时，还要重复遍历已访问的数组。那么，我们如果不使用额外的空间如何做？
想象一下，如果存在环，一直遍历这个链表会怎样？对的，一直绕着环转。
一个人绕着环转多没意思，我们加一个人，两个人，速度一快一慢，如果存在环，快的迟早会追上慢的。

```js
var existLoop = function existLoop(llist){
    let head = llist.head;
    let slow = head;
    let fast = head;
    while (slow.next) {
        slow = slow.next;
        fast = fast.next && fast.next.next;
        if(!fast){
            return false;
        }
        if(fast.element == slow.element){
            return true;
        }
    }
}
```

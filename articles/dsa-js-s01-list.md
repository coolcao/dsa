---
title: 学习笔记-数据结构与算法js实现-【1】列表
date: 2016-11-28 01:05:30
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

列表是一组有序的数据，列表中每个数组项被称为元素。
不含任何元素的列表称为*空列表*。列表中包含的元素个数被称为列表的length。
可以在列表末尾append一个元素，也可以在一个给定的元素后或列表的起始位置insert一个元素。
使用remove方法从列表中删除元素，使用clear方法清空列表中所有的元素。

<!--more-->

使用getElement()方法显示当前元素。
列表拥有描述当前位置的属性。列表有前有后，分别对应front和end。使用next()方法可以从当前元素移动到下一个元素，使用prev()方法可以移动到当前元素的前一个元素。还可以使用moveTo()方法直接移动到指定位置。

## 方法列表
|方法或属性名称|类型|说明|
|----|----|----|
|pos|属性|当前位置|
|length()|方法|返回当前列表中元素的个数|
|clear()|方法|清空列表|
|getElement()|方法|返回当前位置元素|
|insert(n,e)|方法|在位置n插入元素e|
|append(e)|方法|在列表末尾添加元素|
|remove(e)|方法|从列表中删除元素|
|front()|方法|将列表的当前位置移动到第一个位置|
|end()|方法|将列表的当前位置移动到最后一个位置|
|prev()|方法|将当前位置移动到前一个位置|
|next()|方法|将当前位置移动到后一个位置|
|hasNext()|方法|是否有下一个元素|
|hasPrev()|方法|是否有前一个元素|
|currPos()|方法|返回当前位置|
|moveTo()|方法|将当前位置移动到指定位置|

## 定义List类
```js
class List {
    constructor() {
        this.pos = 0; //用于标记当前位置
        this.data = []; //用于存储数据
    }

    /**
     * 返回列表长度
     * @return {number} 列表长度
     */
    length() {
        return this.data.length;
    }

    /**
     * 清空列表
     * @return {null} 清空列表
     */
    clear() {
        this.data = [];
        this.pos = 0;
    }

    toString() {
        return 'List [' + this.data.toString() + ']';
    }

    /**
     * 返回当前位置元素
     * @return {element} 当前位置元素
     */
    getElement() {
        return this.data[this.pos];
    }

    /**
     * 列表末尾追加元素
     * @param  {element} element 要追加的元素
     * @return {null}
     */
    append(element) {
        let length = this.length();
        this.data[length] = element;
    }

    /**
     * 插入元素
     * @param  {element} element 要插入的元素
     * @param  {number} n       插入位置
     * @return {null}
     */
    insert(element, n) {
        let length = this.length();
        if (n > length || n < 0) {
            throw new Error('插入位置不正确');
        }
        for (let i = length; i > n; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[n] = element;
    }

    /**
     * 从列表表移除元素
     * @param  {element} element 要移除的元素
     * @return {boolean}         移除成功返回true,失败返回false
     */
    remove(element) {
        let pos = this.find(element);
        if (pos.length > 0) {
            for (let p of pos) {
                // this.data.splice(p,1);
                this.removeAt(p);
            }
        }
    }

    /**
     * 移除指定位置的元素
     * @param  {Number} pos 指定位置
     * @return {element} 移除的元素，如果没有，则返回null
     */
    removeAt(pos) {
        let length = this.length();
        if (pos < 0 || pos >= length) {
            return null;
        }
        let e = this.data[pos];
        for (let i = pos; i < length; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.data.length = length - 1;
        return e;
    }

    /**
     * 查找元素位置
     * @param  {element} element 要查找的元素
     * @return {number}         元素的位置组成的数组
     */
    find(element) {
        let ps = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === element) {
                ps.push(i);
            }
        }
        return ps;
    }

    /**
     * 将当前位置移动到第一个位置
     * @return {null}
     */
    front() {
        this.pos = 0;
    }

    /**
     * 将当前位置移动到最后一个位置
     * @return {null}
     */
    end() {
        this.pos = this.length() - 1;
    }

    /**
     * 将当前位置向前移动一位
     * @return {null}
     */
    prev() {
        if (this.pos > 0) {
            this.pos - 1;
        }
    }

    /**
     * 将当前位置向后移动一位
     * @return {null}
     */
    next() {
        if (this.pos < this.data.length - 1) {
            this.pos++;
        }
    }

    /**
     * 判断是否有前一位
     * @return {Boolean} 有前一位返回true,没有返回false
     */
    hasPrev() {
        let has = true;
        if (this.pos === 0) {
            has = false;
        }
        return has;
    }

    /**
     * 判断是否有后一位
     * @return {Boolean} 判断是否有后一位，有返回true,没有返回false
     */
    hasNext() {
        let has = true;
        if (this.pos + 1 === this.data.length) {
            has = false;
        }
        return has;
    }

    /**
     * 返回当前位置
     * @return {number} 当前位置
     */
    currentPos() {
        return this.pos;
    }

    /**
     * 将当前位置移动到指定位置
     * @param  {number} pos 制定位置
     * @return {null}
     */
    moveTo(pos) {
        this.pos = pos;
    }


    /**
     * 判断元素是否在列表中
     * @param  {element} element 要判断的元素
     * @return {Boolean}
     */
    contains(element) {
        for (let e of this.data) {
            if (e === element) {
                return true;
            }
        }
        return false;
    }

}
```

列表是最简单的数据结构，这里我们定义了一个List类，里面有两个属性:pos用于标记当前位置，data用于存储数据。然后实现了一些列表的方法。
注意，在实现方法的时候，并没有直接使用js数组的原生方法，比如删除插入的splice()方法等，因为我们学习的是数据结构的思维，而不是封装着用。
说实在的，如果真是用的话，那么列表还真不如直接用js原生的数组来的高效。

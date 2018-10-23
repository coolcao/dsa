---
title: 学习笔记-数据结构与算法js实现-【5】集合
date: 2016-12-05 15:18:29
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

集合是包含不同元素的数据结构。
集合最重要的两个特点：首先，集合中的元素是无序的。其次，集合中不允许 相同成员的存在。

<!--more-->

## 基础知识
集合是由一组无序且唯一(即不能重复)的项组成的。这个数据结构使用了与有限集合相同 的数学概念，但应用在计算机科学的数据结构中。

* 不包含任何成员的集合称为空集，全集则是包含一切可能成员的集合。
* 如果两个集合的成员完全相同，则称两个集合相等。
* 如果一个集合中所有的成员都属于另外一个集合，则前一集合称为后一集合的子集。

### 对集合的操作
* 并集
将两个集合中的元素进行合并，得到一个新的集合。
* 交集
两个集合中共同的元素组成的一个新的集合。
* 补集
属于一个集合而不属于另一个集合的成员组成的集合。

## 方法列表
|方法或属性|类型|说明|
|----|----|----|
|add()|方法|添加元素|
|clean()|方法|清空集合|
|remove(value)|方法|删除元素|
|has(value)|方法|检查是否集合中是否存在某值|
|values()|方法|返回集合中所有元素|
|size()|方法|返回集合中元素个数|
|toString()|方法|重写toString()方法|

## 实现
```js
let removeByIndex = Symbol('remove');

class Set {
    constructor() {
        this.data = [];
    }
    /**
     * 添加元素
     * @param {element} item 要添加的元素
     * @return {Boolean} 添加成功，返回true，如果集合中已存在该元素，返回false
     */
    add(item) {
        if (this.has(item)) {
            return false;
        }
        let size = this.size();
        this.data[size] = item;
        return true;
    }

    /**
     * 清空集合
     */
    clean(){
        delete this.data;
        this.data = [];
    }

    [removeByIndex](array,index){
        let length = array.length;
        for(let i=index;i<length-1;i++){
            array[i] = array[i + 1];
        }
        array.length --;
    }

    /**
     * 移除元素
     * @param  {element} item 要移除的元素
     * @return {Boolean}      存在这个元素，移除成功返回true，不存在，返回false
     */
    remove(item) {
        let index = this.data.indexOf(item);
        if (!!~index) {
            this[removeByIndex](this.data,index);
            // this.data.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 检查集合中是否存在某值
     * @param  {element}  item 要检查的值
     * @return {Boolean}      存在，返回true，不存在，返回false
     */
    has(item) {
        return !!~this.data.indexOf(item);
    }

    /**
     * 返回集合中所有值
     * @return {Array} 集合
     */
    values() {
        return this.data;
    }

    /**
     * 返回集合大小
     * @return {Number} 集合中元素个数
     */
    size() {
        return this.data.length;
    }

    /**
     * 重写toString方法
     * @return {String} 序列化后的字符串
     */
    toString(){
        return this.data;
    }
}
```

## 集合操作
*  并集:对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
*  交集:对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
*  差集:对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
*  子集:验证一个给定集合是否是另一集合的子集。

### 并集
并集的数学概念，集合A和B的并集，表示为A∪B，定义如下:
`A∪B = { x | x ∈ A∨x ∈ B }`
意思是x(元素)存在于A中，或x存在于B中。下图展示了并集操作:

![并集](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/set_union.png)

```js
/**
* 并集
* @param  {Set} set 集合
* @return {Set}     并集
*/
union(set) {
  if (set instanceof Set) {
      let s = new Set();
      for (let item of this.data) {
          s.add(item);
      }
      let set_values = set.values();
      for (let sv of set_values) {
          if (!this.has(sv)) {
              s.add(sv);
          }
      }
      return s;
  } else {
      throw new Error('set必须是Set类型');
  }
}
```

### 交集
交集的数学概念，集合A和B的交集，表示为A∩B，定义如下:
`A∩B = { x | x ∈ A∧x ∈ B }`
意思是x(元素)存在于A中，且x存在于B中。下图展示了交集操作：

![交集](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/set_inter.png)

```js
/**
* 交集
* @param  {Set} set 集合
* @return {Set}     要返回的Set
*/
intersect(set) {
  if (set instanceof Set) {
      let s = new Set();
      let svs = set.values();
      for(let sv of svs){
          if(this.has(sv)){
              s.add(sv);
          }
      }
      return s;
  } else {
      throw new Error('set必须是Set类型');
  }
}
```

### 差集
差集的数学概念，集合A和B的差集，表示为AB，定义如下:
`A-B = { x | x ∈ A ∧ x  B }`
意思是x(元素)存在于A中，且x不存在于B中。下图展示了集合A和B的差集操作:

![差集](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/set_diff.png)

```js
/**
* 差集
* @param  {Set} set 集合
* @return {Set}     差集
*/
difference(set) {
  if (set instanceof Set) {
      let s = new Set();
      for(let item of this.data){
          s.add(item);
      }
      let svs = set.values();
      for(let sv of svs){
          if(this.has(sv)){
              s.remove(sv);
          }
      }
      return s;
  } else {
      throw new Error('set必须是Set类型');
  }
}
```

### 子集
子集的数学概念，集合A是B的子集(或集合B包含 7 了A)，表示为A⊆B，定义如下:
`∀x { x ∈ A → x ∈ B }`
意思是集合A中的每一个x(元素)，也需要存在于B中。下图展示了集合A是集合B的子集:

![子集](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/set_subset.png)

```js
/**
* 判断是否是子集
* @param  {Set} set 要判断的集合
* @return {Boolean}     是子集返回true,否则返回false
*/
subset(set) {
  if (set instanceof Set) {
      let svs = set.values();
      if(set.size() > this.length()){
          return false;
      }
      for(let sv of svs){
          if(!this.has(sv)){
              return false;
          }
      }
      return true;
  } else {
      throw new Error('set必须是Set类型');
  }
}
```

## 小结
Set结构在ES6中已经新添加了这个新数据结构，但是我们还是从头开始子集实现了一下，目前来说，已比较完善，虽然代码效率可能不如原生的高，而且我们也没用数组的原生方法,目的就是学习一下其思想，练习自己编程思维。

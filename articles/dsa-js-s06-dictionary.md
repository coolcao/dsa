---
title: 学习笔记-数据结构与算法js实现-【6】字典
date: 2016-12-05 19:18:23
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

字典是一种以键 - 值对形式存储数据的数据结构。
其中键名是用来查询特定元素的。字典是以[键，值]的形式来存储元素。
字典也称作映射(Map)。
ES6新添加了Map结构。
这里我们以Object为基础，实现一个Map类。

<!--more-->

## 方法列表
|方法或属性|类型|说明|
|----|----|----|
|set(key,value)|方法|向字典中添加新元素|
|remove(key)|方法|通过使用键值来从字典中移除键值对应的数据值|
|has(key)|方法|如果某个键值存在于这个字典中，则返回true，反之则返回false|
|get(key)|方法|通过键值查找特定的数值并返回|
|clear()|方法|将这个字典中的所有元素全部删除|
|size()|方法|返回字典所包含元素的数量。与数组的length属性类似|
|keys()|方法|将字典所包含的所有键名以数组形式返回|
|values()|方法|将字典所包含的所有数值以数组形式返回|
|entries()|方法|将字典中数据以[key,value]的形式输出|

## 代码实现

```js
class Dictionary {
    constructor() {
        this.data = Object.create(null);
    }
    toString() {
        return this.data;
    }

    /**
     * 添加键值对
     * @param {String|Symbol} key   键，只能String或Symbol类型
     */
    set(key, value) {
        if (Object.prototype.toString.call(key) != '[object String]' && Object.prototype.toString.call(key) != '[object Symbol]') {
            throw new Error('key 必须为字符串类型或Symbol类型');
        }
        this.data[key] = value;
    }

    /**
     * 删除键值对
     * @param  {String|Symbol} key 要删除的键
     * @return {Boolean} 删除成功返回true,删除失败返回false
     */
    remove(key) {
        if(this.has(key)){
            delete this.data[key];
            return true;
        }else{
            return false;
        }
    }

    /**
     * 根据键获取值
     * @param  {String|Symbol} key 键
     * @return {Any}     获取的值
     */
    get(key) {
        return this.data[key];
    }

    /**
     * 清空字典
     */
    clear() {
        delete this.data;
        this.data = Object.create(null);
    }

    /**
     * 返回字典大小
     * @return {Number} 字典中元素个数
     */
    size() {
        return Object.keys(this.data).length;
    }

    /**
     * 字典中是否存在某个键
     * @param  {String|Symbol}  key 键
     * @return {Boolean}     存在返回true,否则返回false
     */
    has(key) {
        let keys = this.keys();
        for (let k of keys) {
            if (k == key) {
                return true;
            }
        }
        return false;
    }

    /**
     * 以数组形式返回字典中的键
     * @return {Array} 字典中键组成的数组
     */
    keys() {
        return Object.keys(this.data);
    }

    /**
     * 以数组形式返回字典中的值
     * @return {Array} 字典中值组成的数组
     */
    values() {
        let keys = this.keys();
        return keys.map((key) => {
            return this.data[key];
        });
    }

    /**
     * 以数组形式返回字典中键值对，键值对以[key,value]形式
     * @return {Array} 字典中键值对组成的数组
     */
    entries(){
        let keys = this.keys();
        return keys.map(key => {
            return [key,this.data[key]]
        })
    }

}
```

> 在构造器中，我们使用`Object.create(null)`的形式创建一个空对象，而不使用`{}`的形式是因为，如果直接使用字面量，那么这个对象会默认有一个原型对象。而使用`Object.create(null)`创建的空对象，其原型对象为空。这更适合存储数据。

## 小结
由于js对象的便利性，我们很容易就实现了基础的字典类。
而由于我们直接使用js的Object实现的这个类，因此，key要做一下限制，只能为String或Symbol。
在ES6中新添加了一个Map类，而Es6的Map对于key则无这个限制。
基本的字典功能差不多就这些，如果想拓展一下，比如输出时需要按照key进行排序，则自行拓展即可。

'use strict';
/**
 * Set是一种包含不同元素的数据结构，集合中的元素是无序的，其次集合中不允许相同成员存在。
 */

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
    
}

module.exports = Set;
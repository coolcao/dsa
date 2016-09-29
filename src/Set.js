'use strict';
/**
 * Set是一种包含不同元素的数据结构，集合中的元素是无序的，其次集合中不允许相同成员存在。
 */

class Set {
    constructor() {
        this.data = [];
    }
    //添加元素
    add(item) {
        if (this.has(item)) {
            return false;
        }
        this.data.push(item);
        return true;
    }
    //集合中是否存在元素
    has(item) {
        return this.data.includes(item);
    }
    //移除元素
    remove(item) {
        let index = this.data.indexOf(item);
        if (index > -1) {
            this.data.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
    //返回集合大小
    size() {
        return this.data.length;
    }
    //并集，传入另一个集合
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
    //交集
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
    //差集
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
    //判断是否是自集
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
    //返回集合中的所有值
    values() {
        return this.data;
    }
}

module.exports = Set;
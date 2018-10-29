'use strict';
/**
 * 修改Set类，将存储方式数组改为链表。写一段程序测试你的修改。
 */
const LinkedList = require('../src/LinkedList.js');

class Set {
    constructor() {
        this.data = new LinkedList();
    }
    //添加元素
    add(item) {
        if (this.has(item)) {
            return false;
        }
        this.data.insert(item);
        return true;
    }
    //集合中是否存在元素
    has(item) {
        return this.data.find(item) != null;
    }
    //移除元素
    remove(item) {
        if(this.data.find(item)){
            this.data.remove(item);
            return true;
        }else{
            return false;
        }
    }
    //返回集合大小
    size() {
        let size = 0;
        let currentNode = this.data.head;
        while(currentNode.next){
            size ++;
            currentNode = currentNode.next;
        }
        return size;
    }
    //并集，传入另一个集合
    union(set) {
        if (set instanceof Set) {
            let s = new Set();
            let currentNode = this.data.head;
            while(currentNode.next){
                currentNode = currentNode.next;
                s.add(currentNode.element);
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
            let currentNode = this.data.head;
            while(currentNode.next){
                currentNode = currentNode.next;
                s.add(currentNode.element);
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
        let currentNode = this.data.head;
        let r = [];
        while(currentNode.next){
            currentNode = currentNode.next;
            r.push(currentNode.element);
        }
        return r;
    }
}




let s1 = new Set();
let s2 = new Set();

s1.add(1);
s1.add(2);
s1.add(3);
s1.add(4);
s1.add(5);

s2.add(2);
s2.add(4);
s2.add(6);
s2.add(8);
s2.add(0);

console.log(s1.union(s2).values());
console.log(s1.intersect(s2).values());
console.log(s1.difference(s2).values());

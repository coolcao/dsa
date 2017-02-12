'use strict';

/**
 * 双向循环列表
 */

class Node {
    constructor(data) {
        this.data = data;
        this.pre = null;
        this.next = null;
    }
    getData() {
        return this.data;
    }
}

class DoubleLoopLinkedList {
    //初始时，head的next和pre均指向head自身
    constructor(){
        this.head = new Node(Symbol.for('head'));
        this.head.next = this.head;
        this.head.pre = this.head;
    }
    /**
     * 插入新元素到链表，data为要插入的元素，pdata为插入元素位置上元素
     * @param {Element} data  要插入的元素
     * @param {Element} pdata 要插入元素的位置
     */
    insert(data,pdata){
        let head = this.head;
        let pnode = this.find(pdata);
        let newNode = new Node(data);
        newNode.next = pnode.next;
        newNode.pre = pnode;
        pnode.next.pre = newNode;
        pnode.next = newNode;
    }

    /**
     * 删除链表中的元素
     * @param  {Element} data 要删除的元素
     * @return {Element}      返回删除后的元素
     */
    remove(data){
        let node = this.find(data);
        //如果没有查找到，则返回null
        if(node === this.head){
            return null;
        }else{
            node.pre.next = node.next;
            node.next.pre = node.pre;
            node.next = null;
            node.pre = null;
            return data;
        }
    }

    /**
     * 查找节点
     * 双向循环链表，从两个方向开始查找，一旦找到，立即返回
     * @param  {Element} data 要查找的节点元素
     * @return {Node}      元素所处的节点位置
     */
    find(data){
        let head = this.head;

        //如果要查找的元素为空，直接返回头节点
        if(!data){
            return head;
        }
        let next = head.next;
        let pre = head.pre;
        while (next && pre) {
            if(next.getData() === data){
                return next;
            }else if(pre.getData() === data){
                return pre;
            }else if(next.next === this.head || pre.pre === this.head){
                return head;
            }else{
                next = next.next;
                pre = pre.pre;
            }
        }
    }

    /**
     * 双向循环链表不能正确JSON序列化，该方法用于显示双向循环链表
     */
    display() {
        let currentNode = this.head;
        let s = 'head';
        while (currentNode.next !== this.head) {
            currentNode = currentNode.next;
            s = s + ' -- > ' + currentNode.getData();
        }
        s += ' --> head';
        return s;
    }
}

module.exports = DoubleLoopLinkedList;


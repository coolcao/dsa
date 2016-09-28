'use strict';


class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
    toString(){
        return this.element;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node(Symbol.for('head'));
        this.head.next = this.head;
    }

    /**
     * [find 查找元素，找到返回元素，如果没找到，返回null]
     * @param  {[type]} element [要查找的元素]
     * @return {[type]}         [要返回的节点]
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
     * [findPrev 查找元素的上一个节点,如果找不到返回null]
     * @param  {[type]} element [要查找的元素]
     * @return {[type]}         [元素的上一个节点]
     */
    findPrev(element) {
        let prevNode = null;
        let currentNode = this.head;
        while (currentNode.element !== element) {
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
     * [insert 插入新元素]
     * @param  {[type]} ne [要插入的新元素]
     * @param  {[type]} e  [插入到原链表中这个元素后面]
     * @return {[type]}    [description]
     */
    insert(ne, e) {
        let currentNode = this.find(e) || this.head;
        let newNode = new Node(ne);
        let nextNode = currentNode.next;
        currentNode.next = newNode;
        newNode.next = nextNode;
    }

    /**
     * [remove 删除节点，先找到该节点前面的节点，然后进行删除]
     * @param  {[type]} element [要删除的节点]
     * @return {[type]}         [description]
     */
    remove(element) {
        let prevNode = this.findPrev(element);
        if(prevNode){
            prevNode.next = prevNode.next.next;
        }

    }
    display() {
        let currentNode = this.head;
        let s = 'head -- > ';
        while (currentNode.next !== this.head) {
            currentNode = currentNode.next;
            s = s + currentNode.element + ' -- > ';
        }
        s += 'head';
        return s;
    }
}

module.exports = LinkedList;

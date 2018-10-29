'use strict';

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
/**
 * 双向链表
 */
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

let dllist = new DoubleLinkedList();
dllist.insert(1,this.head);
dllist.insert(2,1);
console.log(dllist.display());

module.exports = DoubleLinkedList;

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
     * 链表末端添加元素
     * @param  {element} e 要添加的元素
     * @return {null}   
     */
    append(e){
        let head = this.head;
        let currentNode = head.next || head;
        while (currentNode.next) {
            currentNode = currentNode.next ;
        }
        currentNode.next = new Node(e);
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

var n1 = new Node(1);
var n2 = new Node(2);
var n3 = new Node(3);
var n4 = new Node(4);
var n5 = new Node(5);

var llist = new LinkedList();
llist.head.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
n5.next = n2;



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

console.log(existLoop(llist));


module.exports = LinkedList;

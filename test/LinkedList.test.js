'use strict';

const LinkedList = require('../src/LinkedList.js');

let llist = new LinkedList();
llist.append(1);
console.log(llist.display());

/**
 * 找出链表中倒数第n个元素
 * @param  {LinkedList} llist   链表
 * @param  {Number} n 
 * @return {element}         找到的倒数第n个值
 */
var findKthToTail = function findKthToTail(llist, n) {
    let size = llist.size();
    let rvalue = null;
    if (n <= size) {
        let head = llist.head;
        let currentNode = head.next;
        for (let i = 0; i < size - n; i++) {
            currentNode = currentNode.next;
        }
        rvalue = currentNode.element;
    }
    return rvalue;
}

var reverseLinkedList = function reverseLinkedList(llist){
    let pre = null;
    let head = llist.head;
    let current = head.next;
    while (current){
        let next = current.next;
        current.next = pre;
        if(!next){
            head.next = current;
            return llist;
        }
        pre = current;
        current = next;
    }
    return llist;
}



var existLoop = function existLoop(llist){
    let visted = [];
    let current = llist.head;
    while (current.next) {
        if(visted.indexOf(current.element) > -1){
            return true;
        }
        current = current.next;
    }
    return false;
}

console.log(reverseLinkedList(llist).display());

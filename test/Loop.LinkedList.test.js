'use strict';

const LinkedList = require('../src/LinkedList.js').LinkedList;
const Node = require('../src/LinkedList.js').Node;


//判断一个单向链表中是否存在环

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

/**
 * 判断一个链表中是否存在环
 * 遍历链表，如果有元素被变量两遍则存在环
 * @param  {LinkedList} llist 链表
 * @return {Boolean}       存在返回true,否则返回false
 */
var existLoop1 = function existLoop(llist){
    let visted = [];
    let current = llist.head;
    while (current.next) {
        if(visted.indexOf(current.data()) > -1){
            return true;
        }
        visted.push(current.data());
        current = current.next;
    }
    return false;
}


/**
 * 判断一个链表中是否存在环
 * @param  {LinkedList} llist 链表
 * @return {Boolean}       存在返回true,否则返回false
 */
var existLoop2 = function existLoop(llist){
    let head = llist.head;
    let slow = head;
    let fast = head;
    while (slow.next) {
        slow = slow.next;
        fast = fast.next && fast.next.next;
        if(!fast){
            return false;
        }
        if(fast.data() == slow.data()){
            return true;
        }
    }
}

console.log(existLoop1(llist));
console.log(existLoop2(llist));
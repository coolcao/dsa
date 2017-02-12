'use strict';

const LinkedList = require('../src/LinkedList.js').LinkedList;

let llist = new LinkedList();
llist.append(1);
llist.append(4);
llist.append(8);
llist.append(2);
llist.append(9);
llist.append(0);

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

console.log(findKthToTail(llist,2));

/**
 * 逆转链表
 * @param  {LinkedList} llist 要逆转的链表
 * @return {LinkedList}       逆转后的链表
 */
var reverseLinkedList = function reverseLinkedList(llist){
    let head = llist.head;
    let pre = null;
    let current = head.next;
    while (current){
        let next = current.next;
        current.next = pre;
        //如果当前节点已为最后一个节点，将头指针指向这个节点
        if(!next){
            head.next = current;
            return llist;
        }
        pre = current;
        current = next;
    }
    return llist;
}

console.log(reverseLinkedList(llist).display());


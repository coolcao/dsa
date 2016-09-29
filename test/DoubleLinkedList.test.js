'use strict';

const DoubleLinkedList = require('./DoubleLinkedList');

let dlist = new DoubleLinkedList();

dlist.insert(1,null);
dlist.insert(2,1);
dlist.insert(3,2);
dlist.insert(4,2);
dlist.insert(5,null);
console.log(dlist.display());

dlist.remove(3);
console.log(dlist.display());

console.log(dlist.findLast());

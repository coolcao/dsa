'use strict';

const LinkedList = require('./LinkedList.js');

let llist = new LinkedList();

llist.insert(1,null);
llist.insert(2,1);
llist.insert(3,2);
llist.insert(4,2);

llist.insert(5,null);

llist.insert(9,5);

console.log(llist.display());
llist.remove(2);
console.log(llist.display());
llist.remove(5);
console.log(llist.display());
llist.remove(1);
console.log(llist.display());
llist.remove(5);
console.log(llist.display());
llist.insert(0,9);
console.log(llist.display());

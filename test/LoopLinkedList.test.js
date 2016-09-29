'use strict';

const LoopLinkedList = require('./LoopLinkedList.js');

let lll = new LoopLinkedList();

lll.insert(1,null);
lll.insert(2,1);
lll.insert(3,1);
lll.insert(4,1);

console.log(lll.display());

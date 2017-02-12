'use strict';

const DoubleLoopLinkedList = require('../src/DoubleLoopLinkedList.js');

let dlll = new DoubleLoopLinkedList();
dlll.insert(1);
dlll.insert(2);
dlll.insert(3);
dlll.insert(4);
dlll.insert(5);
dlll.insert(9,3);

console.log(dlll.display());

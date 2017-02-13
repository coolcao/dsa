'use strict';

const CArray = require('../src/Sort/CArray.js');
const quickSort = require('../src/Sort/QuickSort.js');

let array = new CArray(10000);
console.time('bubbleSort');
array.bubbleSort();
console.timeEnd('bubbleSort');
// console.log(array.getData());
array.clear();
array.setData(10000);

console.time('quickSort');
quickSort(array.getData());
console.timeEnd('quickSort');






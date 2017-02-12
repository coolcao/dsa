'use strict';

const CArray = require('../src/Sort/CArray.js');

let array = new CArray(10);
console.log(array.getData());
array.insertionSort();
console.log(array.getData());



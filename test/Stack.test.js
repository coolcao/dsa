'use strict';

const Stack = require('./Stack.js');

let s = new Stack();

s.push(1);
s.push(2);
s.push(3);

console.log(s.pop());
console.log(s.pop());
console.log(s.length());
console.log(s.toString());
console.log(s.data.length);


'use strict';

const Stack = require('../src/Stack.js');

const divideBy2 = function divideBy2(decNumber) {
    let s = new Stack();
    let str = '';
    while (decNumber > 0) {
        s.push(Math.floor(decNumber %2));
        decNumber = Math.floor(decNumber / 2);
    }
    while (!s.isEmpty()) {
        str += s.pop().toString();
    }
    return str;
}

console.log(divideBy2(102));

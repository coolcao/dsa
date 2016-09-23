'use strict';

const Stack = require('./Stack.js');

/**
* 递归演示
* 递归实现中就用到了栈结构，这里我们简单使用栈模拟一下阶乘递归的实现
**/

const factorial = function factorial(num) {
    if(Object.prototype.toString.call(num) != '[object Number]'){
        throw new Error('参数num必须为Number类型');
    }
    let s = new Stack();
    while (num > 1) {
        s.push(num--);
    }
    let r = 1;
    while (s.length() > 0) {
        r *= s.pop();
    }
    return r;
}

console.log(factorial(5));
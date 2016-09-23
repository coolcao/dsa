'use strict';

/**
* 栈的应用
* 十进制数转换为其他进制
* 1.最高位为 n % b ,将此位压入栈
* 2.使用n/b代替n
* 3.重复1，2 直到n=0且没有余数
* 4.弹出栈内元素，按顺序就是其进制的字符串表示
* 只适用于 2-9进制
**/

const Stack = require('./Stack.js');

const mulBase = function mulBase(num,base) {
    if(Object.prototype.toString.call(num) != '[object Number]'){
        throw new Error(`参数num必须为Number类型`);
    }
    //这里base可以是整数或字符类型的2-9的值，如果其他类型的则不允许
    base = base >>> 0;
    if(base<0 || base>9){
        throw new Error(`参数base只能为2-9整数`);
    }
    let m = num % base;
    //q是商，这里只取整
    let q = num / base >>> 0;
    let s = new Stack();
    s.push(m);
    while (q != 0 ) {
        num = q;
        q = num / base >>> 0;
        m = num % base;
        s.push(m);
    }
    let r = '';
    while (s.length() > 0) {
        r = r + s.pop();
    }
    return r;
}

console.log(mulBase(100,8));



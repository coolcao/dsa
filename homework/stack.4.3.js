'use strict';

const Stack = require('../src/Stack.js');

/**
有一个盒子，里面塞满了糖果，红色的，蓝色的，绿色的，但是你不喜欢绿色的，写一段程序，在不改变其他糖果顺序的基础上，将绿色的糖果移除。
**/

let stack = new Stack();
stack.push('red');
stack.push('blue');
stack.push('blue');
stack.push('green');
stack.push('green');
stack.push('blue');
stack.push('red');
stack.push('red');

const removeGreen = function removeGreen(stack) {
    if(stack instanceof Stack){
        let s1 = new Stack();
        let s2 = new Stack();
        while (stack.length() > 0) {
            let item = stack.pop();
            if(item !== 'green'){
                s1.push(item);
            }
        }
        while (s1.length() > 0) {
            s2.push(s1.pop());
        }
        return s2;
    }else{
        throw new Error('stack must be a Stack type');
    }
}

console.log(removeGreen(stack).toString());




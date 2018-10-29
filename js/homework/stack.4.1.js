'use strict';

const Stack = require('../src/Stack.js');

/**
* 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算 术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例 子:2.3 + 23 / 12 + (3.14159×0.24
**/

/**
* 我们使用一个栈来记录表达式中遇到的括号数，如果遇到左括号，进栈，遇到又括号，出栈
* 最后如果栈为空，则说明匹配，否则不匹配
**/
var brackets_match = function brackets_match(exp) {
    if(Object.prototype.toString.call(exp) != '[object String]'){
        throw new Error('参数exp必须为字符串类型');
    }
    let s = new Stack();
    for(let c of exp){
        if(c === '('){
            s.push(1);
        }else if(c === ')'){
            if(s.size() === 0){
                return false;
            }
            s.pop();
        }
    }
    return s.size() === 0;
}

console.log(brackets_match('2.3 + 23 / 12 + (3.14159×0.24'));

/**
上面这个函数只是判断了括号是否匹配，并没能返回不匹配的位置
我们可以修改下程序，如果匹配，返回true 
如果不匹配，返回不匹配的括号的位置
**/

var brackets_match_result = function brackets_match_result(exp) {
    if(Object.prototype.toString.call(exp) != '[object String]'){
        throw new Error('参数exp必须为字符串类型');
    }
    let s = new Stack();
    for(let i=0;i<exp.length;i++){
        let c = exp[i];
        if(c === '('){
            s.push({index:i,char:exp[i]});
        }else if(c === ')'){
            if(s.size() === 0){
                return {match:false,result:s.toString()}
            }
            s.pop();
        }
    }
    if(s.size() === 0){
        return {match:true};
    }else{
        return {match:false,result:s.toString()}
    }
}
console.log(brackets_match_result('2.3 + 23 / 12 + (3.14159×0.24'));




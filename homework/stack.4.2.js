'use strict';

const Stack = require('../src/Stack.js');

/**
* 一个算数表达式的后缀表达形式如下：
* op1 po2 operator
* 使用两个栈，一个用来存储操作数，一个用来存储操作符，设计并实现一个javascript函数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
* 中缀表达式转换为后缀表达式的过程：
* 开始扫描
* 数字时，加入操作数栈
* 运算符时，
*   若为'('，入栈
*   若为')'，则以此把战中的运算符加入后缀表达式中，直到出现'('，从栈中删除'('
*   若为除括号外的其他运算符，当其优先级高于除'('意外的栈顶运算符时，直接入栈。否则从栈顶开始，依次弹出比当前处理的运算符优先级高和优先级相等的运算符，直到一个比它优先级低的或者遇到了一个左括号为止。
* 当扫描的中缀表达式结束时，栈中的所有运算符出栈。
**/

/**
* 从上面的过程中，我们可以看出，除括号意外的运算符，我们要比较优先级，这里，我们制定一份运算符优先级表，以备比较用
* 目前，仅对加，减，乘，除，取余做比较
**/


var obj = {
    '+':4,
    '-':4,
    '*':3,
    '/':3,
    '%':3
}

var toBackOp = function (exp) {
    if(Object.prototype.toString.call(exp) != '[object String]'){
        throw new Error('参数exp必须为String类型');
    }
    let numsStack = new Stack();
    let operatorStack = new Stack();
    for(let c of exp){
        let charCode = c.charCodeAt();
        //使用asii码判断是否是数字
        if(charCode >= 80 && charCode <=89){
            numsStack.push(c);
        }else{
            if(c == '('){
                operatorStack.push(c);
            }else if(c == ')'){
                while (operatorStack.length() > 0) {
                    let op = operatorStack.pop();
                    if(op == '('){
                        break;
                    }else{
                        numsStack.push(op);
                    }
                }
            }else{
                
            }
        }
    }
}


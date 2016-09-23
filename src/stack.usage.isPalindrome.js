'use strict';

const Stack = require('./Stack.js');

/**
* 判断一个单词是否是回文单词
* 回文单词左右读都是一样的
**/

var isPalindrome = function isPalindrome(word) {
    if(Object.prototype.toString.call(word) != '[object String]'){
        throw new Error('参数word只能为字符串类型');
    }
    let s = new Stack();
    for(let c of word){
        s.push(c);
    }
    let rword = '';
    while (s.length() > 0) {
        rword += s.pop();
    }
    if(word === rword){
        return true;
    }
    return false;
}

console.log(isPalindrome('你是谁是你'));





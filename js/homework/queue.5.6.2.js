'use strict';
/**
使用前面完成的Deque来判断一个单词是否是回文
**/

const Deque = require('./queue.5.6.1.js');

const isPalindrome = function isPalindrome(word) {
    if(Object.prototype.toString.call(word) != '[object String]'){
        throw new Error('参数word必须为字符串类型');
    }
    let dq = new Deque();
    for(let c of word){
        dq.push_back(c);
    }
    let rs = '';
    while (dq.length() > 0) {
        rs += dq.pop_back();
    }
    return rs == word;
}

let word = 'abba';
console.log(isPalindrome(word));
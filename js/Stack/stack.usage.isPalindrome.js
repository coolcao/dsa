'use strict';

const Stack = require('./Stack.js');

/**
* 判断一个单词是否是回文单词
* 回文单词左右读都是一样的
**/

const isPalindrome = function isPalindrome(word) {
    if(Object.prototype.toString.call(word) != '[object String]'){
        throw new Error('参数word只能为字符串类型');
    }
    let s = new Stack();
    for(let c of word){
        s.push(c);
    }
    let rword = '';
    while (s.size() > 0) {
        rword += s.pop();
    }
    if(word === rword){
        return true;
    }
    return false;
}

/**
 * 使用递归判断一个字符串是否是回文
 * 回文的第一个字符和最后一个字符必定相同
 * 去除第一个和最后一个，再继续比较
 * @param  {String}  word 要判断的字符串
 * @return {Boolean}      
 */
const isPalindromeByRecursion = function (word) {
    if(word.length === 1){
        return true;
    }else{
        let length = word.length;
        if(word.charAt(0) !== word.charAt(length - 1)){
            return false;
        }else{
            word = word.substr(1,length - 2);
            return isPalindromeByRecursion(word);
        }
    }
}

let str = 'abcdefedcba';

console.time('isPalindrome');
isPalindrome(str);
console.timeEnd('isPalindrome');
console.time('isPalindromeByRecursion');
isPalindromeByRecursion(str);
console.timeEnd('isPalindromeByRecursion');







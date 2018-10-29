'use strict';

const Dictionary = require('../src/Dictionary.js');

/**
使用Dictionary类写一个程序，该程序用来存储一段文本中各个单词出现的次数。程序显示每个单词出现的次数，但每个单词只显示一次。比如，下面一段话，“the brown fox jumped over the blue fox”,程序输出的是：
the:2
brown:1
fox:2
jumped:1
over:1
blue:1
**/

const count = function count(str) {
    if(Object.prototype.toString.call(str) != '[object String]'){
        throw new Error('参数str只能是字符串String类型');
    }
    let words = str.split(' ');
    let dict = new Dictionary();
    for(let w of words){
        if(dict.has(w)){
            dict.set(w,dict.get(w) + 1);
        }else{
            dict.set(w,1);
        }
    }
    return dict;
}


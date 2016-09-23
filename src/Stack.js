'use strict';

class Stack {
    constructor(){
        this.data = [];
    };
    /**
    * 返回栈的长度
    **/
    length(){
        return this.data.length;
    };

    /**
    * 向栈中插入元素
    **/
    push(item){
        this.data.push(item);
    };

    /**
    * 删除并返回栈顶元素
    **/
    pop(){
        return this.data.pop();
    };

    /**
    * 清空栈
    **/
    clear(){
        this.data = [];
    };

    /**
    * 只返回栈顶元素，不删除
    **/
    peek(){
        return this.data.slice(this.length() - 1)[0];
    }
    toString(){
        return this.data;
    };
};


 module.exports = Stack;



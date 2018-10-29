'use strict';

/**
修改Queue类，形成一个Deque类，这是一个和队列类似的结构，允许从队列两端添加和移动元素，因此也叫双向队列。写一段程序测试该类。
**/

class Deque{
    constructor(){
        this.data = [];
    }
    toString(){
        return "Deque:[" + this.data + "]";
    }
    //队尾添加元素
    push_back(item){
        return this.data.push(item);
    }
    //队尾删除元素
    pop_back(){
        return this.data.pop();
    }
    //队首删除元素
    pop_front(){
        return this.data.shift();
    }
    //队首添加元素
    push_front(item){
        return this.data.unshift(item);
    }
    //队列大小
    length(){
        return this.data.length;
    }
    //清空队列
    empty(){
        this.data = [];
    }
    //判断队列是否为空
    isEmpty(){
        return this.data.length == 0;
    }
    //返回队首元素
    front(){
        return this.data[0];
    }
    //返回队尾元素
    backend(){
        return this.data[this.data.length - 1];
    }

}


module.exports = Deque;
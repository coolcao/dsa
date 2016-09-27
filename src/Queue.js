/**
* 队列实现
**/
class Queue{
    constructor(){
        this.data = [];
    };
    toString(){
        return 'Queue:' + JSON.stringify(this.data);
    };
    /**
    * 入队
    **/
    enqueue(item){
        this.data.push(item);
    };

    /**
    * 出队
    **/
    dequeue(){
        return this.data.shift();
    };

    /**
    * 清空队列
    **/
    empty(){
        this.data = [];
    };

    /**
    * 判断队列是否为空
    **/
    isEmpty(){
        return this.data.length == 0;
    };

    /**
    * 读取队首元素
    **/
    front(){
        return this.data[0];
    };

    /**
    * 读取队尾元素
    **/
    backend(){
        return this.data[this.data.length - 1];
    };

    /**
    * 返回队列长度
    **/
    length(){
        return this.data.length;
    };
}


module.exports = Queue;
'use strict';

/**
优先队列：优先队列从队列中删除数据时，要考虑优先级，优先级高的先删除
**/

class Element{
    constructor(data,code){
        this.data = data;   //保存数据
        this.code = code;   //保存优先级,优先级为[0,1,2,3,4,5,6,7,8,9]值越大，优先级越高默认优先级0
    };
    toString(){
        return this.data + ':' + this.code;
    };
};

class PriorityQueue{
    constructor(){
        this.data = [];
    };
        toString(){
        let data = this.data.map((item)=>{
            return item.toString();
        });
        return 'Queue:[' + data + ']';
    };
    /**
    * 入队
    **/
    enqueue(data,code=0){
        if(!data){
            throw new Error('参数data不能为空');
        }
        this.data.push(new Element(data,code));
    };

    /**
    * 出队
    **/
    dequeue(){
        let priority = 0;
        let index = 0;
        for(let i=0;i<this.data.length;i++){
            if(this.data[i].code > priority){
                index = i;
                priority = this.data[i].code;
            }
        }
        return this.data.splice(index,1)[0];
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
};


module.exports = PriorityQueue;


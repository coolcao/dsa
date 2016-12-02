'use strict';

/**
优先队列：优先队列从队列中删除数据时，要考虑优先级，优先级高的先删除
**/

class Element {
    constructor(data, priority) {
        this.data = data; //保存数据
        this.priority = priority; //保存优先级,优先级为[0,1,2,3,4,5,6,7,8,9]值越大，优先级越高默认优先级0
    };
    toString() {
        return this.data + ':' + this.priority;
    };
};

class PriorityQueue {
    constructor() {
        this.data = [];
    };
    toString() {
        let data = this.data.map((item) => {
            return item.toString();
        });
        return 'Queue:[' + data + ']';
    };
    /**
     * 入队
     * @param  {any} data               要插入数据
     * @param  {Number} priority        优先级，默认为0
     * @return {PriorityQueue}          队列本身
     */
    enqueue(data, priority = 0) {
        if (!data) {
            throw new Error('参数data不能为空');
        }

        let length = this.size();
        this.data[length] = new Element(data, priority);
        return this;
    };

    /**
     * 出队
     * @return {[type]} [description]
     */
    dequeue() {
        let priority = 0;
        let index = 0;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].priority > priority) {
                index = i;
                priority = this.data[i].priority;
            }
        }

        let e = this.data[index];
        let length = this.size();
        for (let i=index; i < length - 1; i++) {
            this.data[i] = this.data[i+1]
        }
        this.data.length --;
        return e;
    };

    /**
     * 清空队列
     * @return {null} 
     */
    empty() {
        this.data = [];
    };

    /**
     * 判断队列是否为空
     * @return {Boolean} 空返回ture,否则返回false
     */
    isEmpty() {
        return this.data.length == 0;
    };

    /**
     * 返回队首元素
     * @return {Element} 队首元素
     */
    front() {
        return this.data[0];
    };

    /**
     * 队尾元素
     * @return {Element} 队尾元素
     */
    backend() {
        return this.data[this.data.length - 1];
    };

    /**
     * 返回队列长度
     **/
    size() {
        return this.data.length;
    };
};

module.exports = PriorityQueue;
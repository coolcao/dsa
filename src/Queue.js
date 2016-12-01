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
     * @param  {element} item 要入队的元素
     * @return {Queue} 入队后的队列
     */
    enqueue(item){
        let length = this.size();
        this.data[length] = item;
        return this;
    };

    /**
     * 出队
     * @return {element} 出队元素
     */
    dequeue(){
        let e = this.data[0];
        let length = this.size();
        for (let i=0; i < length - 1; i++) {
            this.data[i] = this.data[i+1]
        }
        this.data.length --;
        return e;
    };

    /**
     * 清空队列
     * @return {null} 
     */
    empty(){
        this.data = [];
    };

    /**
     * 判断队列是否为空
     * @return {Boolean} 队列为空，返回true,否则返回false
     */
    isEmpty(){
        return this.data.length == 0;
    };

    /**
     * 读取队首元素
     * @return {element} 队首元素
     */
    front(){
        return this.data[0];
    };

    /**
     * 读取队尾元素
     * @return {element} 队尾元素
     */
    backend(){
        return this.data[this.data.length - 1];
    };

    /**
     * 返回队列中元素个数
     * @return {Number} 队列中元素个数
     */
    size(){
        return this.data.length;
    };
}
module.exports = Queue;
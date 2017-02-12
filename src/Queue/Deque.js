'use strict';

class Deque{
    constructor(){
        this.data = [];
    }
    /**
     * 尾部添加元素
     * @param  {element} element 要添加的元素
     * @return {null}         
     */
    push(element){
        let size = this.size();
        this.data[size] = element;
    }
    /**
     * 尾部删除并返回删除的元素
     * @return {element} 删除的元素
     */
    pop(){
        let size  = this.size();
        let e = this.data[size - 1];
        this.data.length = size - 1;
        return e;
    }
    /**
     * 头部添加元素
     * @param  {element} element 要添加的元素
     * @return {null}         
     */
    unshift(element){
        let size = this.size();
        for(let i=size;i>0;i--){
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = element;
    }
    /**
     * 头部删除元素，并返回删除的元素
     * @return {element} 演出的元素
     */
    shift(){
        let size = this.size();
        let e = this.data[0];
        for(let i=0;i<size - 1;i++){
            this.data[i] = this.data[i + 1];
        }
        this.data.length = size - 1;
        return e;
    }
    size(){
        return this.data.length;
    }
}

let dq = new Deque();
dq.push(1);
dq.push(2);
dq.push(3);
dq.unshift(5);
dq.unshift(6);
console.log(dq);
console.log(dq.shift());
console.log(dq.shift());
console.log(dq.pop());
console.log(dq.pop());
console.log(dq);


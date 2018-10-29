'use strict';

class Stack {
    constructor() {
        this.data = [];
    };

    /**
     * 向栈中推入元素
     * @param  {element} item 要推入的元素
     * @return {null}      
     */
    push(item) {
        let size = this.size();
        this.data[size] = item;
    };

    /**
     * 删除并返回栈顶元素
     * @return {element} 栈顶元素
     */
    pop() {
        let size = this.size();
        let e = this.peek();
        delete this.data[size - 1];
        this.data.length = size - 1;
        return e;
    };

    /**
     * 只返回栈顶元素，不修改栈
     * @return {element} 栈顶元素
     */
    peek() {
        let size = this.size();
        let e = this.data[size - 1];
        return e;
    }

    /**
     * 判断栈是否为空
     * @return {Boolean} 栈为空，返回true,否则返回false
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * 清空栈
     * @return {null} 
     */
    clear() {
        this.data = [];
    };

    /**
     * 返回栈中元素的个数
     * @return {Number} 栈中元素的个数
     */
    size() {
        return this.data.length;
    };

    toString() {
        return this.data;
    };
};

module.exports = Stack;
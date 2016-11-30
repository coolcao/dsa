'use strict';

class List {
    constructor() {
        this.pos = 0; //用于标记当前位置
        this.data = []; //用于存储数据
    }

    /**
     * 返回列表长度
     * @return {number} 列表长度
     */
    length() {
        return this.data.length;
    }

    /**
     * 清空列表
     * @return {null} 清空列表
     */
    clear() {
        this.data = [];
        this.pos = 0;
    }

    toString() {
        return 'List [' + this.data.toString() + ']';
    }

    /**
     * 返回当前位置元素
     * @return {element} 当前位置元素
     */
    getElement() {
        return this.data[this.pos];
    }

    /**
     * 列表末尾追加元素
     * @param  {element} element 要追加的元素
     * @return {null}         
     */
    append(element) {
        let length = this.length();
        this.data[length] = element;
    }

    /**
     * 插入元素
     * @param  {element} element 要插入的元素
     * @param  {number} n       插入位置
     * @return {null}         
     */
    insert(element, n) {
        let length = this.length();
        if (n > length || n < 0) {
            throw new Error('插入位置不正确');
        }
        for (let i = length; i > n; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[n] = element;
    }

    /**
     * 从列表表移除元素
     * @param  {element} element 要移除的元素
     * @return {boolean}         移除成功返回true,失败返回false
     */
    remove(element) {
        let pos = this.find(element);
        if (pos.length > 0) {
            for (let p of pos) {
                // this.data.splice(p,1);
                this.removeAt(p);
            }
        }
    }

    /**
     * 移除指定位置的元素
     * @param  {Number} pos 指定位置
     * @return {element} 移除的元素，如果没有，则返回null    
     */
    removeAt(pos) {
        let length = this.length();
        if (pos < 0 || pos >= length) {
            return null;
        }
        let e = this.data[pos];
        for (let i = pos; i < length; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.data.length = length - 1;
        return e;
    }

    /**
     * 查找元素位置
     * @param  {element} element 要查找的元素
     * @return {number}         元素的位置组成的数组
     */
    find(element) {
        let ps = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === element) {
                ps.push(i);
            }
        }
        return ps;
    }

    /**
     * 将当前位置移动到第一个位置
     * @return {null} 
     */
    front() {
        this.pos = 0;
    }

    /**
     * 将当前位置移动到最后一个位置
     * @return {null} 
     */
    end() {
        this.pos = this.length() - 1;
    }

    /**
     * 将当前位置向前移动一位
     * @return {null} 
     */
    prev() {
        if (this.pos > 0) {
            this.pos - 1;
        }
    }

    /**
     * 将当前位置向后移动一位
     * @return {null} 
     */
    next() {
        if (this.pos < this.data.length - 1) {
            this.pos++;
        }
    }

    /**
     * 判断是否有前一位
     * @return {Boolean} 有前一位返回true,没有返回false
     */
    hasPrev() {
        let has = true;
        if (this.pos === 0) {
            has = false;
        }
        return has;
    }

    /**
     * 判断是否有后一位
     * @return {Boolean} 判断是否有后一位，有返回true,没有返回false
     */
    hasNext() {
        let has = true;
        if (this.pos + 1 === this.data.length) {
            has = false;
        }
        return has;
    }

    /**
     * 返回当前位置
     * @return {number} 当前位置
     */
    currentPos() {
        return this.pos;
    }

    /**
     * 将当前位置移动到指定位置
     * @param  {number} pos 制定位置
     * @return {null}     
     */
    moveTo(pos) {
        this.pos = pos;
    }


    /**
     * 判断元素是否在列表中
     * @param  {element} element 要判断的元素
     * @return {Boolean}        
     */
    contains(element) {
        for (let e of this.data) {
            if (e === element) {
                return true;
            }
        }
        return false;
    }

}

module.exports = List;
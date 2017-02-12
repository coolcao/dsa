'use strict';

class Dictionary {
    constructor() {
        this.data = Object.create(null);
    }
    toString() {
        return this.data;
    }

    /**
     * 添加键值对
     * @param {String|Symbol} key   键，只能String或Symbol类型
     */
    set(key, value) {
        if (Object.prototype.toString.call(key) != '[object String]' && Object.prototype.toString.call(key) != '[object Symbol]') {
            throw new Error('key 必须为字符串类型或Symbol类型');
        }
        this.data[key] = value;
    }

    /**
     * 删除键值对
     * @param  {String|Symbol} key 要删除的键
     * @return {Boolean} 删除成功返回true,删除失败返回false
     */
    remove(key) {
        if(this.has(key)){
            delete this.data[key];
            return true;
        }else{
            return false;
        }
    }

    /**
     * 根据键获取值
     * @param  {String|Symbol} key 键
     * @return {Any}     获取的值
     */
    get(key) {
        return this.data[key];
    }

    /**
     * 清空字典
     */
    clear() {
        delete this.data;
        this.data = Object.create(null);
    }

    /**
     * 返回字典大小
     * @return {Number} 字典中元素个数
     */
    size() {
        return Object.keys(this.data).length;
    }

    /**
     * 字典中是否存在某个键
     * @param  {String|Symbol}  key 键
     * @return {Boolean}     存在返回true,否则返回false
     */
    has(key) {
        let keys = this.keys();
        for (let k of keys) {
            if (k == key) {
                return true;
            }
        }
        return false;
    }

    /**
     * 以数组形式返回字典中的键
     * @return {Array} 字典中键组成的数组
     */
    keys() {
        return Object.keys(this.data);
    }

    /**
     * 以数组形式返回字典中的值
     * @return {Array} 字典中值组成的数组
     */
    values() {
        let keys = this.keys();
        return keys.map((key) => {
            return this.data[key];
        });
    }

    /**
     * 以数组形式返回字典中键值对，键值对以[key,value]形式
     * @return {Array} 字典中键值对组成的数组
     */
    entries(){
        let keys = this.keys();
        return keys.map(key => {
            return [key,this.data[key]]
        })
    }

}

module.exports = Dictionary;
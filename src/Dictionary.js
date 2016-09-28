'use strict';

class Dictionary {
    constructor() {
        this.data = [];
    }
    toString(){
        return this.data;
    }

    set(key,value){
        if(Object.prototype.toString.call(key) != '[object String]' && Object.prototype.toString.call(key) != '[object Symbol]'){
            throw new Error('key 必须为字符串类型或Symbol类型');
        }
        this.data[key] = value;
    }

    //删除键值
    remove(key){
        delete this.data[key];
    }

    //根据键获取值
    get(key){
        return this.data[key];
    }

    //清空
    clear(){
        this.data = [];
    }

    //返回字典大小
    size(){
        let n = 0;
        return Object.keys(this.data).length;
    }

    //是否存在键值
    has(key){
        let keys = this.keys();
        for(let k of keys){
            if(k == key){
                return true;
            }
        }
        return false;
    }

    keys(){
        return Object.keys(this.data);
    }

    values(){
        let keys = this.keys();
        return keys.map((key)=>{
            return this.data[key];
        });
    }

}

module.exports = Dictionary;
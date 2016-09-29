'use strict';
/**
 * 修改Set类， 使里面的元素按顺序存储，写一段代码测试你的修改。
 */

const Set = require('../src/Set.js');
class OrderSet extends Set{
    constructor(){
        super();
    }
    add(item){
        if (this.has(item)) {
            return false;
        }
        let index = 0;
        for(let i=0;i<this.data.length ;i++){
            if(item < this.data[i]){
                index = i;
                break;
            }
            if(i === this.data.length - 1){
                index = this.data.length;
            }
        }
        this.data.splice(index,0,item);
        return true;
    }
};

let set = new OrderSet();
set.add(3);
set.add(2);
set.add(5);
set.add(4);
set.add(8);
set.add(8);
set.add(7);
set.add(9);
set.add(0);
set.add(1);
set.add(6);

console.log(set);

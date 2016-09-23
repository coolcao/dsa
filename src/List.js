'use strict';

class List{
    constructor(){
        this.pos = 0;          //用于标记当前位置
        this.data = [];         //用于存储数据
    }

    /**
    * 清空列表
    **/
    clear(){
        this.data = [];
        this.pos = 0;
    }

    toString(){
        return 'List [' + this.data.toString() + ']';
    }

    /**
    * 返回当前元素
    **/
    getElement(){
        return this.data[this.pos];
    }

    /**
    * 在末尾追加
    **/
    append(element){
        this.data.push(element);
    }

    /**
    * 在当前位置插入pos插入
    **/
    insert(element){
        this.data.splice(this.pos,0,element);
    }

    /**
    * 从列表中删除元素
    **/
    remove(element){
        let pos = this.find(element);
        if(pos.length > 0){
            for(let p of pos){
                this.data.splice(p,1);
            }
        }
    }

    /**
    * 查找元素位置，返回元素所在可能位置数组，如果没有，返回空数组
    **/
    find(element){
        let ps = [];
        for(let i=0;i<this.data.length;i++){
            if(this.data[i] === element){
                ps.push(i);
            }
        }
        return ps;
    }

    /**
    * 将列表的当前位置移动到第一个元素
    **/
    front(){
        this.pos = 0;
    }

    /**
    * 将列表的当前位置移动到最后一个元素
    **/
    end(){
        this.pos = this.data.length - 1;
    }

    /**
    * 将当前位置前移一位
    **/
    prev(){
        if(this.pos > 0){
            this.pos - 1;
        }
    }

    /**
    * 将当前位置后移一位
    **/
    next(){
        if(this.pos < this.data.length - 1){
            this.pos ++;
        }
    }

    /**
    * 判断是否有前一位
    **/
    hasPrev(){
        let has = true;
        if(this.pos === 0){
            has = false;
        }
        return has;
    }

    /**
    * 判断是否有后一位
    **/
    hasNext(){
        let has = true;
        if(this.pos + 1 === this.data.length){
            has = false;
        }
        return has;
    }

    /**
    * 返回当前位置
    **/
    currentPos(){
        return this.pos;
    }

    /**
    * 将当前位置移动到指定位置
    **/
    moveTo(pos){
        this.pos = pos;
    }
    length(){
        return this.data.length;
    }

    /**
    * 判断给定的值是否在列表中
    **/
    contains(element){
        for(let e of this.data){
            if(e === element){
                return true;
            }
        }
        return false;
    }

}

module.exports = List;


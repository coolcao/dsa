'use strict';
/**
使用队列队数据进行排序
基数排序：
对于0`99的数字，将数据集扫描两次，第一次按个位上的数字进行排序
第二次按十位上的数字进行排序。每个数字根据对应位上的数值被分在不同的盒子里。
假设：有如下数字：
91,46,85,15,92,35,31,22
经过基数排序第一次扫描之后，数字被分配到如下的盒子
bin 0:
bin 1:91,31
bin 2:92,22
bin 3:
bin 4:
bin 5:85,15,35
bin 6:46
bin 7:
bin 8:
bin 9:
根据盒子的顺序，对数字进行第一次排序的结果如下：
91,31,92,22,85,15,35,46
然后根据十位上的数字再将上次排序的结果分配到不同的盒子中：
bin 0:
bin 1:15
bin 2:22
bin 3:31,35
bin 4:46
bin 5:
bin 6:
bin 7:
bin 8:85
bin 9:91,92
最后，将盒子中的数字取出，组成一个新的列表，该列表即为排好的数字：
15，22，31，35，46，85，91，92
**/

const Queue = require('./Queue.js');

/**
根据位数进行排序
参数array为要扫描的数字数组。
base为要根据分组的位，个位,base为1，十位,base为10,百位,base为100，依此类推。
**/
const sortByBase = function(array, base) {

    if (!Array.isArray(array)) {
        throw new Error('参数array必须为数组类型');
    }
    if (Object.prototype.toString.call(base) != '[object Number]') {
        throw new Error('参数base必须为整型');
    }

    //初始化10个盒子
    let q = [];
    let label = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i of label) {
        q[i] = new Queue();
    }

    array.forEach(function(item) {
        let n = item % (base * 10) / base >>> 0;
        q[n].enqueue(item);
    });

    let r = [];
    for (let i of label) {
        let _queue = q[i];
        while (!_queue.isEmpty()) {
            r.push(_queue.dequeue());
        }
    }
    return r;
}


let array = [91, 46, 85, 15, 92, 35, 31, 22];
array = sortByBase(array,1);
array = sortByBase(array,10);
console.log(array);

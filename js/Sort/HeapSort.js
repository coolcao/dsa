'use strict'

/**
 * 堆排序
 */

let swap = function(array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

//将一个数组最小堆化
let minHeapify = function(arr) {
    let min_heapify = function(start, end) {
        //建立父节点指针和子节点指针
        let dad = start;
        let son = dad * 2 + 1;

        //如果子节点超限，直接跳出函数
        if (son >= end) {
            return;
        }

        //先比较两个子节点，选择最小的
        if (son + 1 < end && arr[son] > arr[son + 1]) {
            son++;
        }
        //如果父节点小于子节点，交换父子节点，在继续子节点和孙节点比较
        if (arr[dad] >= arr[son]) {
            swap(arr, dad, son);
            min_heapify(son, end);
        }
    }

    let len = arr.length;
    //初始化，i从最后一个父节点开始调整
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        min_heapify(i, len);
    }
}

const heapSort = function(array) {
    let arr = array.slice(0);
    let result = [];

    //首先将数组最小堆化
    minHeapify(arr);

    //如果最小堆化后的数组长度大于0，取出第一个数，然后将剩下的数组继续最小堆化，直到数组为空结束
    while (arr.length > 0) {
        console.log(arr);
        result.push(arr.shift());
        minHeapify(arr);
    }
    return result;
};


let arr = [9, 4, 8, 2, 7, 11, 18, 39, 90];
console.log(heapSort(arr));
console.log(arr);

module.exports = heapSort;
'use strict';

/**
 * 快速排序
 * 首先在数组中选择一个元素作为“基准值”。
 * 将所有小于基准值的元素放到基准值的前面，大于基准值的元素放到基准值右面。
 * 放别对较小元素和较大元素的子数组进行快速排序
 * 最后进行合并成一个大数组
 * @param  {Array} array 要排序的数组
 * @return {Array}       排序后的数组
 */
let quickSort = function (array) {
    if(array.length === 0){
        return array;
    }
    let lesser = [];
    let greater = [];
    let pivot = array[0];
    for(let i=1;i<array.length;i++){
        if(array[i] < pivot){
            lesser.push(array[i]);
        }else{
            greater.push(array[i]);
        }
    }
    return quickSort(lesser).concat(pivot,quickSort(greater));
}

module.exports = quickSort;

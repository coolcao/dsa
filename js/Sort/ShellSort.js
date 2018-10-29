'use strict';

/**
 * 希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。
 * 希尔排序是非稳定排序算法。
 * 平均时间复杂度根据步长序列的不同而不同。
 * @param  {Array} array 要排序的数组
 * @return {Array}       排好序的数组
 */
let shellSort = function(array) {
    let gap, i, j;
    let temp;
    for (gap = array.length >> 1; gap > 0; gap >>= 1) {
        for (i = gap; i < array.length; i++) {
            temp = array[i];
            for (j = i - gap; j >= 0 && array[j] > temp; j -= gap) {
                array[j + gap] = array[j];
            }
            array[j + gap] = temp;
        }
    }
}

let array = [9, 4, 8, 2, 7, 11, 18, 39, 90, 3, 76];
shellSort(array);
console.log(array);

module.exports = shellSort;
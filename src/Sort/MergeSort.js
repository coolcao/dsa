'use strict';

/**
 * 归并操作（merge），也叫归并算法，指的是将两个已经排序的序列合并成一个序列的操作。归并排序算法依赖归并操作。
 * 时间复杂度：n*log.n
 * 最优时间复杂度：n
 * 平均时间复杂度：n*log.n
 * wiki百科：https://zh.wikipedia.org/wiki/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F#.E5.BD.92.E5.B9.B6.E6.93.8D.E4.BD.9C
 * 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
 *  设定两个指针，最初位置分别为两个已经排序序列的起始位置
 *  比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
 *  重复步骤3直到某一指针到达序列尾
 *  将另一序列剩下的所有元素直接复制到合并序列尾
 */

/**
 * 归并两个数组，已排好序的数组
 * @param  {Array} left   左边数组
 * @param  {Array} right  右边数组
 * @return {Array}        合并后的数组
 */
const merge = function merge(left,right) {
    if(!Array.isArray(left) || !Array.isArray(right)){
        throw new Error('参数必须为数组类型！');
    }
    let result = [];
    let il = 0;
    let ir = 0;
    while (il<left.length && ir<right.length) {
        if(left[il] < right[ir]){
            result.push(left[il++]);
        }else{
            result.push(right[ir++]);
        }
    }

    while (il<left.length) {
        result.push(left[il++]);
    }

    while (ir<right.length) {
        result.push(right[ir++]);
    }

    return result;

}

/**
 * 归并排序
 * 复杂度 n*log.n
 * 稳定排序
 * @param  {Array} array 要排序的数组
 * @return {Array}       排序完的数组
 */
const mergeSortRec = function (array) {
    if(!Array.isArray(array)){
        throw new Error('参数array必须为数组类型！');
    }
    let length = array.length;
    if(length <= 1){
        return array;
    }
    let mid = (length / 2) >>> 0;

    let left = [];
    let right = [];

    for(let i=0;i<length;i++){
        if(i<mid){
            left.push(array[i]);
        }else{
            right.push(array[i]);
        }
    }
    return merge(mergeSortRec(left),mergeSortRec(right));
}

// console.log(merge([1,2,3,4],[4,5,6,7]));

console.log(mergeSortRec([3,6,8,3,2,1,6,5,4,9,0]));

module.exports = mergeSortRec;
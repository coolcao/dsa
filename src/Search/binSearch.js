'use strict';

/**
 * 二分查找
 * @param  {Array} arr  要查找的数组，已排序数组
 * @param  {Number} data [要查找数据]
 * @return {Number}      找到返回其index，否则返回 -1
 */
let binSearch = function(arr, data) {
    if (!Array.isArray(arr)) {
        throw new Error('第一个参数arr必须为Array类型');
    }
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = ((start + end) / 2) >>> 0;
        if (arr[mid] < data) {
            start = mid + 1;
        } else if (arr[mid] > data) {
            end = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

/**
 * 递归二分查找
 * @param  {Array} arr  要查找的数组
 * @param  {Number} data 要查找的数据
 * @return {Number}      索引位置
 */
let binSearchByRecursion = function(arr, data) {
    let search = function(start, end) {
        if (start <= end) {
            let mid = ((start + end) / 2) >>> 0;
            if (arr[mid] === data) {
                return mid;
            } else {
                if (arr[mid] < data) {
                    start = mid + 1;
                } else if (arr[mid] > data) {
                    end = mid - 1;
                }
                return search(start, end);
            }
        }else{
            return -1;
        }
    }
    return search(0, arr.length-1);
}

/**
 * 计算重复次数
 * @param  {Array} arr  要统计的数组
 * @param  {Number} data 要统计的元素
 * @return {Number}      统计个数
 */
let count = function(arr, data) {
    let pos = binSearch(arr, data);
    let count = 0;
    if (pos > -1) {
        count++;

        /**
         * 二分查找数组为已排序数组
         * 如果元素有多个，那么其他元素肯定在找到位置的左右两侧
         * 我们在找到的位置设置左右两个游标
         * 同时移动左游标和右游标，当遇到相同数据，计数加1
         * 当左右两侧游标同时都不等于元素时，说明已统计完
         */

        let x = pos - 1;
        let y = pos + 1;
        while (arr[x] === data || arr[y] === data) {
            if (arr[x] === data) {
                count++;
            }
            if (arr[y] === data) {
                count++;
            }
            x--;
            y++;
        }

    }
    return count;
}

// let arr = [...Array(100).keys()];
// arr = arr.filter(function(item) {
//     return item % 2 == 0;
// });

let arr = [1, 2, 3, 3, 3, 3, 4, 4, 5, 6,6,7,7,8,8,9,10,11,12,14];

console.log(binSearchByRecursion(arr, 8));
// console.log('==========');
// console.log(binSearch(arr, 8));

module.exports = binSearch;
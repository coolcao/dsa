'use strict';

//生成测试数组数据用的类
class CArray {
    constructor(size = 0) {
        this.data = [];
        if (size) {
            this.setData(size);
        }
    }

    setData(size) {
        for (let i = 0; i < size; i++) {
            this.data.push(Math.floor(Math.random() * (size + 1)));
        }
    }

    insert(item) {
        if (item) {
            this.data.push(item);
        }
    }

    clear() {
        this.data = [];
    }

    getData() {
        return this.data;
    }

    /**
     * 交换两个位置的值
     * @param  {Number} i 第一个索引
     * @param  {Number} j 第二个索引
     */
    swap(i, j) {
        if (Object.prototype.toString.call(i) !== '[object Number]' || Object.prototype.toString.call(j) !== '[object Number]') {
            throw new Error('类型错误，索引必须为数字类型');
        }
        let tmp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = tmp;
    }

    /**
     * 冒泡排序
     * 逐一比较两个相邻的数，一轮下来，最大的数会“冒”到最后，然后再将倒数第二最大数“冒”到倒数第二位置，依次类推直到排序完成
     * 冒泡排序是一种稳定的排序算法
     */
    bubbleSort() {
        let size = this.data.length;
        for (let outer = size - 1; outer > 0; outer--) {
            for (let inner = 0; inner < outer; inner++) {
                if (this.data[inner] > this.data[inner + 1]) {
                    this.swap(inner, inner + 1);
                }
            }
        }
    }

    /**
     * 选择排序
     * 选择排序从数组的开头开始，将第一个元素和其他元素进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置
     * 然后再从第二个位置继续。这个过程一直进行，当进行到数组的倒数第二个位置时，所有元素已完成排序
     * 其实很简单，就是依次从未排好序的剩余元素中选择最小的，放到已排序的最后面
     */
    selectionSort() {
        let size = this.data.length;
        for (let i = 0; i < size - 1; i++) {
            let min = i;
            for (let j = i; j < size; j++) {
                if (this.data[min] > this.data[j]) {
                    min = j;
                }
            }
            //如果最小值就是当前游标的值，则不进行交换
            if (min !== i) {
                this.swap(i, min);
            }
        }

    }

    /**
     * 插入排序
     */
    insertionSort() {
        let size = this.data.length;
        for (let outer = 1; outer < size; outer++) {
            let tmp = this.data[outer];
            let inner = outer;
            while (inner > 0 && (this.data[inner - 1] >= tmp)) {
                this.data[inner] = this.data[inner - 1];
                inner--;
            }
            this.data[inner] = tmp;
        }
    }

    toString() {
        let size = this.data.length;
        let str = '';
        for (let i = 0; i < size; i++) {
            str += this.data[i] + ' ';
            if (i % 10 == 9) {
                str += '\n';
            }
        }
        return str;
    }
}

module.exports = CArray;
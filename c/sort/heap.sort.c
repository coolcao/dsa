#include <stdio.h>
#include "../common/utils.h"

#define LEN 15

/**
 * arr: 传入的数组
 * start: 开始位置
 * end: 结束位置
 * offset: 偏移量，即从哪个位置开始做最小堆
 */
void swapMin(int arr[], int start, int end, int offset) {
  int dad = start;
  int son = dad * 2 + 1 - offset;
  if (son >= end) {
    return;
  }

  // 先比较两个子节点，选择最小的
  if (son + 1 < end && arr[son] > arr[son + 1]) {
    son += 1;
  }
  // 如果父节点大于子节点，交换父子节点
  if (arr[dad] >= arr[son]) {
    swapArray(arr, dad, son);
  }
}

/**
 * arr: 传入的数组
 * start: 开始位置
 * end: 结束位置
 * offset: 偏移量，即从哪个位置开始做最大堆
 */
void swapMax(int arr[], int start, int end, int offset) {
  int dad = start;
  int son = dad * 2 + 1 - offset;
  if (son >= end) {
    return;
  }

  // 先比较两个子节点，选择最大的
  if (son + 1 < end && arr[son] < arr[son + 1]) {
    son += 1;
  }
  // 如果父节点小于子节点，交换父子节点
  if (arr[dad] <= arr[son]) {
    swapArray(arr, dad, son);
  }
}

/**
 * 构建最小堆
 * arr: 数组
 * start: 起始元素。从start元素往后的所有元素构建最小堆。start之前的表示已排好序
 * length: 数组的长度
 *
 */
void minHeapify(int arr[], int start, int length) {
  for (int i = length / 2 - 1 + start; i >= start; i--) {
    swapMin(arr, i, length, start);
  }
}

/**
 * 构建最大堆
 * arr: 数组
 * start: 起始元素。从start元素往后的所有元素构建最小堆。start之前的表示已排好序
 * length: 数组的长度
 *
 */
void maxHeapify(int arr[], int start, int length) {
  for (int i = length / 2 - 1 + start; i >= start; i--) {
    swapMax(arr, i, length, start);
  }
}

/**
 * 排序方法
 * arr: 数组
 * length: 数组长度
 *
 */
void sort(int arr[], int length) {
  for (int i = 0; i < length; i++) {
    minHeapify(arr, i, length);
    // maxHeapify(arr, i, length);
  }
}

/**
 * 获取一个无序数组中第k大（小）元素
 */
int getTopK(int arr[], int length, int k) {
  if (k <= 0 || k > length) {
    printf("参数错误\n");
    return -1;
  }
  for (int i = 0; i < k; i++) {
    maxHeapify(arr, i, length);
  }
  return arr[k - 1];
}

int main(int argc, char const *argv[]) {
  int a[LEN] = {10, 5, 3, 4, 7, 3, 2, 9, 7, 6, 12, 8, 3, 15, 20};
  // sort(a, LEN);
  int k = 3;
  printf("the %d's min is %d\n", k, getTopK(a, LEN, k));
  printArray(a, LEN);
  return 0;
}

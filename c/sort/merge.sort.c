#include <stdio.h>
#include "../common/utils.h"

#define LEN 12

/**
 * 对两个已经拍好序的子序列进行合并操作
 *
 */
void merge(int a[], int start, int mid, int end) {
  // 左侧序列的范围是 [start, mid]
  int leftLenght = mid - start + 1;
  // 右侧序列的范围是 [mid+1, end]
  int rightLenght = end - mid;
  int left[leftLenght], right[rightLenght];
  // 将左右两侧数据分别放到两个临时数组中
  for (int i = 0; i < leftLenght; i++) {
    left[i] = a[start + i];
  }
  for (int i = 0; i < rightLenght; i++) {
    right[i] = a[mid + 1 + i];
  }

  printf("left:");
  printArray(left, leftLenght);
  printf("right:");
  printArray(right, rightLenght);

  // 左右两部分进行合并
  int start1 = 0, start2 = 0;
  int i = start;
  while (start1 < leftLenght && start2 < rightLenght) {
    if (left[start1] < right[start2]) {
      a[i] = left[start1];
      start1 += 1;
    } else {
      a[i] = right[start2];
      start2 += 1;
    }
    i += 1;
  }

  while (start1 < leftLenght) {
    a[i++] = left[start1++];
  }

  while (start2 < rightLenght) {
    a[i++] = right[start2++];
  }

  printf("merge: ");
  printArray(a, leftLenght + rightLenght);
  printf("----------\n");
}

void sort(int a[], int start, int end) {
  int mid = (start + end) / 2;
  if (start != mid) {
    sort(a, start, mid);
  }
  if (mid + 1 != end) {
    sort(a, mid + 1, end);
  }
  merge(a, start, mid, end);
}

int main(int argc, char const *argv[]) {
  int a[LEN] = {3, 5, 6, 4, 7, 9, 8, 0, 1, 2, 19, 15};

  sort(a, 0, LEN - 1);
  printf("排序后：");
  printArray(a, LEN);
  return 0;
}

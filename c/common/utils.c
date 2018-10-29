#include <stdio.h>
#include "utils.h"
// 编译时，要一并将所依赖的这个工具类编译
// gcc sort/utils.c sort/merge.sort.c
void printArray(int a[], int length) {
  for (int i = 0; i < length; i++) {
    printf("%d ", a[i]);
  }
  printf("\n");
}

void swapArray(int a[], int i, int j) {
  int tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}
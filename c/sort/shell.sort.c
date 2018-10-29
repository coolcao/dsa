#include <stdio.h>
#include "../common/utils.h"

#define LEN 10

void sort(int a[], int length) {
  for (int gap = length / 2; gap > 0; gap /= 2) {
    printf("gap: %d\n", gap);
    for (int g = 0; g < gap; g++) {
      int tmplength = length / gap;

      // 针对每个子间隔序列进行插入排序
      for (int i = g + gap; i < tmplength * gap + g; i += gap) {
        for (int j = g; j < i; j += gap) {
          if (a[i] < a[j]) {
            int tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
          }
        }
      }
      printArray(a, LEN);
    }
    printf("--------------\n");
  }
}


int main(int argc, char const *argv[]) {
  int a[LEN] = {10, 5, 2, 4, 7, 3, 1, 9, 8, 6};
  sort(a, LEN);
  printArray(a, LEN);
  return 0;
}

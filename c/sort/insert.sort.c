#include <stdio.h>
#include "../common/utils.h"
#define LENGTH 5

void sort(int array[], int length) {
  for (int i = 1; i < length; i++) {
    printf("交换前：");
    printArray(array, length);
    for (int j = 0; j < i; j++) {
      if (array[i] < array[j]) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
    }
    printf("交换后：");
    printArray(array, length);
    printf("-------------------------------\n");
  }
}

int main(int argc, char const* argv[]) {
  int array[LENGTH] = {10, 5, 2, 4, 7};
  sort(array, LENGTH);
  printf("最终结果：");
  printArray(array, LENGTH);
  return 0;
}

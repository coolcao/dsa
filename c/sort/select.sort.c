#include <stdio.h>
#define LEN 5

void sort(int a[LEN]) {
  for (int i = 0; i < LEN - 1; i++) {
    printf("交换前：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
    int minIdx = i;
    for (int j = i + 1; j < LEN; j++) {
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    int tmp = a[minIdx];
    a[minIdx] = a[i];
    a[i] = tmp;
    printf("交换后：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
    printf("-----------------------\n");
  }
}

int main(int argc, char const *argv[]) {
  int a[LEN] = {10, 5, 2, 4, 7};
  sort(a);
  return 0;
}

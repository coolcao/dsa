#include <stdio.h>
#define LEN 5

void sort(int a[LEN]) {
  // 小泡法，较小的数往前冒
  for (int i = 0; i < LEN - 1; i++) {
    printf("交换前：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
    for (int j = i + 1; j < LEN; j++) {
      if (a[i] > a[j]) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
    }
    printf("交换后：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
    printf("-----------------------\n");
  }

  // 大泡法，较大的数往后冒
  // for (int i = LEN - 1; i > 0; i--) {
  //   printf("交换前：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
  //   for (int j = 0; j < i; j++) {
  //     if (a[i] < a[j]) {
  //       int tmp = a[i];
  //       a[i] = a[j];
  //       a[j] = tmp;
  //     }
  //   }
  //   printf("交换后：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
  //   printf("-----------------------\n");
  // }
}

int main(int argc, char const *argv[]) {
  int a[LEN] = {10, 5, 2, 4, 7};
  sort(a);
  printf("最终结果：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);

  return 0;
}

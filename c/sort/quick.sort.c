#include <stdio.h>
#define LEN 5

/*
 * 快速排序
 * 先选定一个元素，将所有小于该元素的元素放到该元素的左边，所有大于该元素的元素放到该元素的右边
 * 分别对左右两部分进行快速排序
 * 直到每次排序的元素只有一个元素为止
 */

void sort(int a[], int length, int start, int end) {
  printf("排序区间：a[%d]-a[%d]\n", start, end);
  if (start >= end) {
    return;
  }
  int idx = start;
  for (int i = start + 1; i <= end; i++) {
    // 将所有小于基准的值放到该基准值的前面
    if (a[idx] > a[i]) {
      int tmp = a[i];
      int sidx = i;
      while (sidx > idx) {
        a[sidx] = a[sidx - 1];
        sidx -= 1;
      }
      a[idx] = tmp;
      idx += 1;
    }
  }
  for (int i = 0; i < length; i++) {
    printf("%d ", a[i]);
  }
  printf("\n-----------------------\n");
  if (idx > 0) {
    sort(a, length, start, idx - 1);
  }
  if (idx < length - 1) {
    sort(a, length, idx + 1, end);
  }
}

int main(int argc, char const *argv[]) {
  int a[LEN] = {10, 5, 2, 4, 7};
  sort(a, 0, LEN - 1);
  printf("最终结果：%d %d %d %d %d\n", a[0], a[1], a[2], a[3], a[4]);
  return 0;
}

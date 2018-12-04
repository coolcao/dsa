#include <stdio.h>

#define LEN 20

int search(int array[], int length, int element) {
  int start = 0, end = length - 1;
  int mid = 0;

  // while (start <= end) {
  //   mid = (start + end) / 2;
  //   if (array[mid] > element) {
  //     end = mid - 1;
  //   } else if (array[mid] < element) {
  //     start = mid + 1;
  //   } else {
  //     return mid;
  //   }
  // }

  for (int mid = (start + end) / 2; start <= end; mid = (start + end) / 2) {
    if (array[mid] > element) {
      end = mid - 1;
    } else if (array[mid] < element) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}

int main(int argc, char const *argv[]) {
  int array[LEN] = {1,  2,  3,  4,  5,  6,  7,  8,  9,  10,
                    12, 14, 16, 17, 18, 19, 20, 21, 24, 29};
  int e = search(array, LEN, 6);
  printf("%d\n", e);
  return 0;
}

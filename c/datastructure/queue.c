#include "queue.h"
#include <stdio.h>
#include <stdlib.h>

Queue initQueue() {
  Queue queue = malloc(sizeof *queue);
  queue->data = initLinkedList();
  return queue;
}
void enQueue(Queue queue, char c) {
  pushToLinkedList(queue->data, c);
}
char deQueue(Queue queue) {
  // return popFromLinkedList(queue->data)->item;
  return shiftFromLinkedList(queue->data)->item;
}
int sizeOfQueue(Queue queue) {
  return sizeOfLinkedList(queue->data);
}
int isQueueEmpty(Queue queue) {
  return sizeOfLinkedList(queue->data) == 0;
}
void printQueue(Queue queue) {
  printLinkedList(queue->data);
}
char getQueueHead(Queue queue) {
  char c ;
  if (queue) {
    Node head = queue->data->head;
    if (head) {
      c = head->item;
    }
  }
  return c;
}
char getQueueTail(Queue queue) {
  char c;
  if (queue) {
    Node tail = queue->data->tail;
    if (tail) {
      c = tail->item;
    }
  }
  return c;
}

int main(int argc, char const *argv[])
{
  Queue queue = initQueue();
  enQueue(queue, 'a');
  enQueue(queue, 'b');
  enQueue(queue, 'c');
  printf("The queue is : ");
  printQueue(queue);
  printf("deQueue %c\n", deQueue(queue));
  printf("The queue is : ");
  printQueue(queue);
  printf("The size of Queue is %d\n", sizeOfQueue(queue));
  printf("deQueue %c\n", deQueue(queue));
  printf("The queue is : ");
  printQueue(queue);
  printf("The size of Queue is %d\n", sizeOfQueue(queue));
  return 0;
}

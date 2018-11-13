#include "linkedlist.h"
#ifndef QUEUE_H
#define QUEUE_H

typedef struct _queue *Queue;

struct _queue {
  LinkedList data;
};

Queue initQueue();
void enQueue(Queue queue, char c);
char deQueue(Queue queue);
int sizeOfQueue(Queue queue);
int isQueueEmpty(Queue queue); 
void printQueue(Queue queue);
char getQueueHead(Queue queue);
char getQueueTail(Queue queue);

#endif
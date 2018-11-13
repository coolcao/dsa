#include "linkedlist.h"
#ifndef STACK_H
#define STACK_H

typedef struct _stack *Stack;

struct _stack {
  LinkedList data;
};

Stack initStack();
void pushToStack(Stack s, char c);
char popFromStack(Stack s);
int sizeOfStack(Stack s);
int isStackEmpty(Stack s); 
void printStack(Stack s);

#endif
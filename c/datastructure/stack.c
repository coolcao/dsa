#include "stack.h"
#include <stdio.h>
#include <stdlib.h>

Stack initStack() {
  Stack stack = malloc(sizeof *stack);
  stack->data = initLinkedList();
  return stack;
}

void pushToStack(Stack s, char c) { pushToLinkedList(s->data, c); }

char popFromStack(Stack s) { return popFromLinkedList(s->data)->item; }

int sizeOfStack(Stack s) { return sizeOfLinkedList(s->data); }

int isStackEmpty(Stack s) { return sizeOfLinkedList(s->data) == 0; }

void printStack(Stack s) { printLinkedList(s->data); }

int main(int argc, char const *argv[]) {
  Stack stack = initStack();
  pushToStack(stack, 'a');
  pushToStack(stack, 'b');
  pushToStack(stack, 'c');
  pushToStack(stack, 'd');
  pushToStack(stack, 'e');
  printStack(stack);

  popFromStack(stack);
  printStack(stack);

  popFromStack(stack);
  printStack(stack);

  printf("size: %d\n", sizeOfStack(stack));
  printf("isEmpty:%d\n", isStackEmpty(stack));

  return 0;
}

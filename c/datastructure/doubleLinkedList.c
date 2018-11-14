#include "doubleLinkedList.h"
#include <stdio.h>
#include <stdlib.h>
Node makeNode(int item) {
  Node node = malloc(sizeof *node);
  node->next = NULL;
  node->prev = NULL;
  node->item = item;
  return node;
}
DoubleLinkedList initDoubleLinkedList() {
  DoubleLinkedList list = malloc(sizeof *list);
  list->head = NULL;
  list->tail = NULL;
  list->size = 0;
  return list;
}

void freeNode(Node p) { free(p); }
Node searchFromDoubleLinkedList(DoubleLinkedList list, int item) {
  Node headNode = list->head;
  Node tailNode = list->tail;
  if (sizeOfDoubleLinkedList(list) == 0) {
    return NULL;
  }
  if (sizeOfDoubleLinkedList(list) == 1) {
    if (headNode->item == item) {
      return headNode;
    }
    return NULL;
  }
  while (headNode != tailNode) {
    if (headNode->item == item) {
      return headNode;
    }
    if (tailNode->item == item) {
      return tailNode;
    }
    headNode = headNode->next;
    tailNode = tailNode->prev;
  }
  return NULL;
}
void insertToDoubleLinkedList(DoubleLinkedList list, int item) {
  Node node = makeNode(item);
  if (list->head == NULL && list->tail == NULL) {
    list->head = node;
    list->tail = node;
    list->size = 1;
    return;
  }

  Node tailPre = list->tail;
  Node tailNext = list->tail->next;
  list->tail = node;
  node->prev = tailPre;
  tailPre->next = node;
  node->next = tailNext;

  list->size += 1;
}
void deleteFromDoubleLinkedList(DoubleLinkedList list, int item) {
  if (sizeOfDoubleLinkedList(list) == 0) {
    return;
  }
  if (sizeOfDoubleLinkedList(list) == 1) {
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
    return;
  }

  Node headNode = list->head;
  Node tailNode = list->tail;

  Node current;

  while (headNode != tailNode) {
    if (headNode->item == item) {
      current = headNode;
      break;
    }
    if (tailNode->item == item) {
      current = tailNode;
      break;
    }
    headNode = headNode->next;
    tailNode = tailNode->prev;
  }

  // 重新做删除操作
  Node prev = current->prev;
  Node next = current->next;
  if (current == list->head) {
    list->head = next;
  }
  if (current == list->tail) {
    list->tail = prev;
  }
  if (prev) {
    prev->next = next;
  }
  if (next) {
    next->prev = prev;
  }
  list->size -= 1;
}
void traverseDoubleLinkedList(DoubleLinkedList list, void (*visit)(Node)) {}
void destroyDoubleLinkedList(DoubleLinkedList list) {
  if (sizeOfDoubleLinkedList(list) == 0) {
    return;
  }
  Node q, p = list->head;
  list->head = NULL;
  while (p) {
    q = p;
    p = p->next;
    freeNode(q);
  }
  list->size = 0;
}
void pushToDoubleLinkedList(DoubleLinkedList list, int item) {
  insertToDoubleLinkedList(list, item);
}
Node popFromDoubleLinkedList(DoubleLinkedList list) {
  if (sizeOfDoubleLinkedList(list) == 0) {
    return NULL;
  }
  Node tail = list->tail;
  Node tailPrev = tail->prev;

  if (tailPrev) {
    tailPrev->next = NULL;
  }

  list->tail = tailPrev;
  list->size -= 1;

  return tail;
}
Node shiftFromDoubleLinkedList(DoubleLinkedList list) {
  if (sizeOfDoubleLinkedList(list) == 0) {
    return NULL;
  }
  Node head = list->head;
  Node headNext = head->next;
  if (headNext) {
    headNext->prev = NULL;
  }
  list->head = headNext;
  list->size -= 1;
  return head;
}
void printDoubleLinkedList(DoubleLinkedList list) {
  if (list->head == NULL) {
    printf("NULL\n");
    return;
  }

  Node p = list->head;
  while (p) {
    if (p == list->tail) {
      printf("%d\n", p->item);
    } else {
      printf("%d -> ", p->item);
    }
    p = p->next;
  }
  printf("\n");
}
int sizeOfDoubleLinkedList(DoubleLinkedList list) { return list->size; }

int main(int argc, char const *argv[]) {
  DoubleLinkedList list = initDoubleLinkedList();
  pushToDoubleLinkedList(list, 1);
  printDoubleLinkedList(list);
  printf("%d\n", popFromDoubleLinkedList(list)->item);
  printDoubleLinkedList(list);

  return 0;
}

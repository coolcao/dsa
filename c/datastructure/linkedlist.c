#include "linkedlist.h"
#include <stdio.h>
#include <stdlib.h>

Node makeNode(char item) {
  Node p = malloc(sizeof *p);
  p->item = item;
  p->next = NULL;
  return p;
}

LinkedList initLinkedList() {
  Node head = NULL;
  Node tail = NULL;
  LinkedList list = malloc(sizeof *list);
  list->head = head;
  list->tail = tail;
  list->size = 0;
  return list;
}

void freeNode(Node p) { free(p); }

Node searchFromLinkedList(LinkedList list, char key) {
  if (!list) return NULL;
  Node p = list->head;
  for (; p; p = p->next) {
    if (p->item == key) {
      return p;
    }
  }
  return NULL;
}

void insertToLinkedList(LinkedList list, char c) {
  Node p = makeNode(c);
  if (list) {
    p->next = list->head;
    list->head = p;
    list->size += 1;
    if (list->size == 1) {
      list->tail = p;
    }
  }
}

void deleteFromLinkedList(LinkedList list, char c) {
  if (list) {
    Node p = makeNode(c);
    Node pre, current;
    if (p->item == list->head->item) {
      list->head = p->next;
      list->size -= 1;
      return;
    }
    for (pre = list->head, current = pre->next; current;
         pre = pre->next, current = pre->next) {
      if (current->item == p->item) {
        pre->next = current->next;
        list->size -= 1;
        return;
      }
    }
  }
}

void traverseLinkedList(LinkedList list, void (*visit)(Node)) {
  if (list) {
    Node p;
    for (p = list->head; p; p = p->next) {
      visit(p);
    }
  }
}

void destroyLinkedList(LinkedList list) {
  if (list) {
    Node q, p = list->head;
    list->head = NULL;
    while (p) {
      q = p;
      p = p->next;
      freeNode(q);
    }
    list->size = 0;
  }
}

void pushToLinkedList(LinkedList list, char c) { insertToLinkedList(list, c); }

Node popFromLinkedList(LinkedList list) {
  if (list->head == NULL) {
    return NULL;
  } else {
    Node p = list->head;
    list->head = list->head->next;
    list->size -= 1;
    return p;
  }
}

Node shiftFromLinkedList(LinkedList list) {
  if (list->size == 0) {
    return NULL;
  }
  if (list->size == 1) {
    Node node = list->head;
    list->size = 0;
    list->head = NULL;
    list->tail = NULL;
    return node;
  }
  Node pre = list->head;
  Node current = pre->next;
  while(current!=list->tail) {
    pre = current;
    current = current->next;
  }

  list->tail = pre;
  pre->next = NULL;
  list->size -= 1;
  return current;
}

void printLinkedList(LinkedList list) {
  if (list->head == NULL) {
    printf("NULL\n");
    return;
  }

  Node p = list->head;
  while (p) {
    printf("%c -> ", p->item);
    p = p->next;
  }
  printf("NULL\n");
}

// 链表的反转
void reverseLinkedList(LinkedList list) {
  if (list->head == NULL) {
    return;
  }
  list->tail = list->head;
  Node pre = NULL;
  Node current = list->head;
  Node next = list->head->next;
  while (current) {
    current->next = pre;
    pre = current;
    current = next;
    if (next) {
      next = next->next;
    }
  }
  list->head = pre;
}

int sizeOfLinkedList(LinkedList list) { return list->size; }

// int main(int argc, char const *argv[]) {
//   LinkedList list = initLinkedList();
//   insertToLinkedList(list, 'a');
//   insertToLinkedList(list, 'b');
//   insertToLinkedList(list, 'c');
//   printLinkedList(list);
//   printf("head: %c\n", list->head->item);
//   printf("tail: %c\n", list->tail->item);
//   reverseLinkedList(list);
//   printf("head: %c\n", list->head->item);
//   printf("tail: %c\n", list->tail->item);
//   printLinkedList(list);
//   return 0;
// }

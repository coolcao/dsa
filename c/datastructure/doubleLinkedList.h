#ifndef DOUBLELINKEDLIST_H
#define DOUBLELINKEDLIST_H

typedef struct lnode *Node;
struct lnode {
	int item;
  Node prev;
	Node next;
};

typedef struct list *DoubleLinkedList;

struct list {
	Node head;	// 头指针
	Node tail;	// 尾指针
	unsigned int size;	// 列表大小
};

DoubleLinkedList initDoubleLinkedList();
Node makeNode(int item);
void freeNode(Node p);
Node searchFromDoubleLinkedList(DoubleLinkedList list, int key);
void insertToDoubleLinkedList(DoubleLinkedList list, int c);
void deleteFromDoubleLinkedList(DoubleLinkedList list, int c);
void traverseDoubleLinkedList(DoubleLinkedList list, void (*visit)(Node));
void destroyDoubleLinkedList(DoubleLinkedList list);
void pushToDoubleLinkedList(DoubleLinkedList list, int c);
Node popFromDoubleLinkedList(DoubleLinkedList list);
Node shiftFromDoubleLinkedList(DoubleLinkedList list);
void printDoubleLinkedList(DoubleLinkedList list);
int sizeOfDoubleLinkedList(DoubleLinkedList list);

#endif

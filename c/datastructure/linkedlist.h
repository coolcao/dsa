/* linkedlist.h */
#ifndef LINKEDLIST_H
#define LINKEDLIST_H

typedef struct lnode *Node;
struct lnode {
	char item;
	Node next;
};

typedef struct list *LinkedList;

struct list {
	Node head;	// 头指针
	Node tail;	// 尾指针
	unsigned int size;	// 列表大小
};

LinkedList initLinkedList();
Node makeNode(char item);
void freeNode(Node p);
Node searchFromLinkedList(LinkedList list, char key);
void insertToLinkedList(LinkedList list, char c);
void deleteFromLinkedList(LinkedList list, char c);
void traverseLinkedList(LinkedList list, void (*visit)(Node));
void destroyLinkedList(LinkedList list);
void pushToLinkedList(LinkedList list, char c);
Node popFromLinkedList(LinkedList list);
Node shiftFromLinkedList(LinkedList list);
void printLinkedList(LinkedList list);
void reverseLinkedList(LinkedList list);
int sizeOfLinkedList(LinkedList list);

#endif
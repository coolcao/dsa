#ifndef BINARYTREE_H
#define BINARYTREE_H

typedef struct tnode *Node;
struct tnode {
	int data;
  Node left;
	Node right;
};

typedef struct tree *BinaryTree;

struct tree {
	Node root;	// 根节点
	unsigned int size;	// 元素个数
};

Node makeNode(int data);
BinaryTree initTree();
void inOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node));
void preOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node));
void postOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node));
void binaryTreeToJson(BinaryTree tree);
void addToBinaryTree(BinaryTree t, int data);
Node find(BinaryTree t, int data);
Node findMin(BinaryTree t);
Node findMax(BinaryTree t);
void deleteFromBinaryTree(BinaryTree tree, int data);
BinaryTree createBinaryTreeFromArray(int array[], int arraySize);
int deepthOfBinaryTree(BinaryTree tree);



#endif

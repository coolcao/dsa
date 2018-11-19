#include "binaryTree.h"
#include <stdio.h>
#include <stdlib.h>

Node makeNode(int data) {
  Node node = malloc(sizeof *node);
  node->left = NULL;
  node->right = NULL;
  node->data = data;
  return node;
}
BinaryTree initTree() {
  BinaryTree tree = malloc(sizeof *tree);
  tree->root = NULL;
  tree->size = 0;
  return tree;
}
void addToNode(Node node, int data) {
  Node newNode = makeNode(data);
  // 向左插入
  if (node->data > data) {
    if (node->left) {
      addToNode(node->left, data);
    } else {
      node->left = newNode;
    }
  }
  // 向右插入
  if (node->data < data) {
    if (node->right) {
      addToNode(node->right, data);
    } else {
      node->right = newNode;
    }
  }
}

void printNodeToJSON(Node node) {
  if (node) {
    printf("{ \"data\":%d", node->data);
    if (node->left || node->right) {
      printf(",");
    }
    if (node->left) {
      printf("\"left\":");
      printNodeToJSON(node->left);
    };
    if (node->left && node->right) {
      printf(",");
    }
    if (node->right) {
      printf("\"right\":");
      printNodeToJSON(node->right);
    };
    printf("}");
  } else {
    printf("NULL\n");
  }
}

void printNode(Node node) {
  if (!node) {
    printf("NULL\n");
    return;
  }
  printf("%d ", node->data);
}

int deepthOfNode(Node node, int level) {
  if (!node) return 0;  // 如果节点为空，则高度为0
  if (!node->left && !node->right) {
    return level + 1;
  }
  int leftDeepth = 0;
  int rightDeepth = 0;
  if (node->left) {
    leftDeepth = deepthOfNode(node->left, level + 1);
  }
  if (node->right) {
    rightDeepth = deepthOfNode(node->right, level + 1);
  }
  return leftDeepth > rightDeepth ? leftDeepth : rightDeepth;
}

void inOrderVisitNode(Node node, void (*visit)(Node)) {
  if (!node) return;
  if (node->left) inOrderVisitNode(node->left, visit);
  // printf("%d ", node->data);
  visit(node);
  if (node->right) inOrderVisitNode(node->right, visit);
}

void inOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node)) {
  if (!tree) return;
  inOrderVisitNode(tree->root, visit);
}

void preOrderVisitNode(Node node, void (*visit)(Node)) {
  if (!node) return;
  // printf("%d ", node->data);
  visit(node);
  if (node->left) preOrderVisitNode(node->left, visit);
  if (node->right) preOrderVisitNode(node->right, visit);
}

void preOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node)) {
  if (!tree) return;
  preOrderVisitNode(tree->root, visit);
}

void postOrderVisitNode(Node node, void (*visit)(Node)) {
  if (!node) return;
  if (node->left) postOrderVisitNode(node->left, visit);
  if (node->right) postOrderVisitNode(node->right, visit);
  // printf("%d ", node->data);
  visit(node);
}
void postOrderVisitBinaryTree(BinaryTree tree, void (*visit)(Node)) {
  if (!tree) return;
  postOrderVisitNode(tree->root, visit);
}

void binaryTreeToJson(BinaryTree tree) {
  if (!tree) {
    printf("NULL\n");
    return;
  }
  Node root = tree->root;
  printNodeToJSON(root);
  printf("\n");
}

void addToBinaryTree(BinaryTree t, int data) {
  if (t->root) {
    addToNode(t->root, data);
  } else {
    t->root = makeNode(data);
  }
  t->size += 1;
}
Node findNode(Node node, int data) {
  if (!node)
    return NULL;
  else if (node->data == data)
    return node;
  else if (node->data > data)
    return findNode(node->left, data);
  else
    return findNode(node->right, data);
}
Node find(BinaryTree t, int data) {
  if (!t) return NULL;
  return findNode(t->root, data);
}
Node findMinNode(Node node) {
  if (!node) return NULL;
  if (node->left)
    return findMinNode(node->left);
  else
    return node;
}
Node findMin(BinaryTree t) {
  if (!t) return NULL;
  return findMinNode(t->root);
}
Node findMaxNode(Node node) {
  if (!node) return NULL;
  if (node->right)
    return findMaxNode(node->right);
  else
    return node;
}
Node findMax(BinaryTree t) {
  if (!t) return NULL;
  return findMaxNode(t->root);
}

void deleteFromBinaryTree(BinaryTree tree, int data) {
  if (!tree || !tree->root) return;
  // current当前节点，parent为当前节点的父节点。
  // 如果当前节点不存在，则current和parent都为NULL
  // 如果当前节点为root节点，则parent也为root节点
  Node parent = tree->root, current = tree->root;
  while (current->data != data) {
    parent = current;
    if (current->data > data) {
      if (current->left) {
        current = current->left;
      } else {
        parent = NULL;
        current = NULL;
        break;
      }
    } else {
      if (current->right) {
        current = current->right;
      } else {
        parent = NULL;
        current = NULL;
        break;
      }
    }
  }
  // 如果未找到节点，则不存在删除操作，直接返回即可。
  if (!current) {
    return;
  }
  // 当前节点的左子树
  Node currentLeft = current->left;
  // 如果current为root节点
  if (current == tree->root) {
    tree->root = current->right;
  } else {
    parent->right = current->right;
  }
  current = current->right;
  tree->size -= 1;
  if (current) {
    while (current->left) {
      current = current->left;
    }
    current->left = currentLeft;
  } else {
    return;
  }
}
BinaryTree createBinaryTreeFromArray(int array[], int arraySize) {
  BinaryTree tree = initTree();
  for (int i = 0; i < arraySize; i++) {
    addToBinaryTree(tree, array[i]);
  }
  return tree;
}

int deepthOfBinaryTree(BinaryTree tree) {
  if (!tree) return 0;
  return deepthOfNode(tree->root, 0);
}

int main(int argc, char const *argv[]) {
  int array[15] = {40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35, 45, 55, 65, 75};
  BinaryTree tree = createBinaryTreeFromArray(array, 15);
  binaryTreeToJson(tree);
  printf("%d\n", tree->size);
  // inOrderVisitBinaryTree(tree, printNode);
  // printf("\n");
  // preOrderVisitBinaryTree(tree, printNode);
  // printf("\n");
  // postOrderVisitBinaryTree(tree, printNode);
  // printf("\n");
  // printf("deepth of tree: %d\n", deepthOfBinaryTree(tree));
  // Node node = findMin(tree);
  // printf("%d\n", node->data);
  // Node node2 = findMax(tree);
  // printf("%d\n", node2->data);
  deleteFromBinaryTree(tree, 40);
  binaryTreeToJson(tree);
  printf("%d\n", tree->size);
  printf("%d\n", deepthOfBinaryTree(tree));
  return 0;
}

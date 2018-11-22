#include "linkedlist.h"
#ifndef HASHMAP_H
#define HASHMAP_H

typedef struct _entry *Entry;

struct _entry {
  char *key;
  int value;
  Entry next;
};

typedef struct _map *HashMap;

struct _map {
  int size; // 标识当前map元素个数
  int usage;// 标识数组已使用个数
  int length;// 标识数组长度
  Entry *datas;// 数据
};

HashMap initHashMap();
void putToHashMap(HashMap map, char *key, int value);
int getFromHashMap(HashMap map, char *key);
void removeFromHashMap(HashMap map, char *key);
int containsKey(HashMap map, char *key);
int containsValue(HashMap map, int value);
int sizeOfHashMap(HashMap map);
int isHashMapEmpty(HashMap map);
void printHashMap(HashMap map);

#endif
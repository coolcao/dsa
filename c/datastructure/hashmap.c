#include "hashmap.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define DEFAULT 4
#define FACTOR 0.75

/**
 * 计算字符串哈希值
 * 采用java的算法，返回整数值，可能为负
 * hash = s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 */
int hashCode(char *s) {
  int h = 0;
  unsigned long length = strlen(s);
  for (int i = 0; i < length; i++) {
    h = 31 * h + s[i];
  }
  return h;
}

int stringEqual(char *s1, char *s2) { return strcmp(s1, s2) == 0; }

Entry makeEntry(char *s, int value) {
  Entry entry = malloc(sizeof *entry);
  entry->key = s;
  entry->value = value;
  entry->next = NULL;
  return entry;
}

HashMap initHashMap() {
  HashMap map = malloc(sizeof *map);
  map->size = 0;
  map->usage = 0;
  map->length = DEFAULT;
  map->datas = (Entry *)malloc(sizeof(Entry) * map->length);
  for (int i = 0; i < map->length; i++) {
    map->datas[i] = 0;
  }
  return map;
}

Entry findEntry(Entry entry, char *key) {
  if (!entry) return NULL;
  Entry current = entry;
  while (current && !stringEqual(current->key, key)) {
    current = current->next;
  }
  return current;
}

int findPosition(HashMap map, char *key) {
  if (!map) return -1;
  int hash = hashCode(key);
  if (hash < 0) hash = -hash;
  int pos = hash % map->length;
  return pos;
}

void expand(HashMap map) {
  Entry *tmp = map->datas;
  int originLength = map->length;
  printf("=======================\n");
  printf("length: %d\n", originLength);
  map->length *= 2;
  map->size = 0;
  printf("length: %d\n", map->length);
  map->usage = 0;
  map->datas = (Entry *)malloc(sizeof(Entry) * map->length);
  for (int i = 0; i < map->length; i++) {
    map->datas[i] = 0;
  }

  // rehash
  for (int i=0;i<originLength;i++) {
    Entry entry = tmp[i];
    if (entry) {
      while (entry) {
        putToHashMap(map, entry->key, entry->value);
        entry = entry->next;
      }
    }
  }

  free(tmp);

}

void putToHashMap(HashMap map, char *key, int value) {
  if (!map) return;
  // 判断是否需要扩容，如果当前用量已超过扩容因子量，需要扩容
  if (map->usage > map->length*FACTOR) {
    expand(map);
  }
  int pos = findPosition(map, key);
  printf("pos of %s is %d\n", key, pos);
  Entry entry = makeEntry(key, value);
  if (map->datas[pos] == NULL) {
    map->datas[pos] = entry;
    map->usage += 1;
    map->size += 1;
  } else {
    // 这里需要检查key值是否已存在，如果已存在，那么需要覆盖当前的值
    Entry existEntry = findEntry(map->datas[pos], key);
    if (existEntry) {
      // 如果key已存在，直接覆盖value
      existEntry->value = value;
    } else {
      // 如果不存在该key，则将该节点插入到链表
      entry->next = map->datas[pos];
      map->datas[pos] = entry;
      map->size += 1;
    }
  }
}

/**
 * get方法，根据键key获取value值
 * 如果不存在，返回-1
 */
int getFromHashMap(HashMap map, char *key) {
  if (!map) return -1;
  int pos = findPosition(map, key);
  Entry start = map->datas[pos];
  if (start == NULL) return -1;
  while (!stringEqual(start->key, key) && start->next != NULL) {
    // printf("====%s\n", start->key);
    // printf("====%s\n", key);
    start = start->next;
  }
  if (stringEqual(start->key, key)) return start->value;
  return -1;
}

// TODO
void removeFromHashMap(HashMap map, char *key) {
  if (!map) return;
  int pos = findPosition(map, key);
  Entry parent = map->datas[pos];
  Entry current = parent;
  if (current == NULL) return;
  if (stringEqual(current->key, key)) {
    // 如果是在数组上的元素
    // 如果该位置只有一个元素
    if (current->next == NULL) map->usage -= 1;
    map->datas[pos] = current->next;
    free(current);
    map->size -= 1;
  } else {
    // 不是在数组上的元素，在链表上的元素
    current = current->next;
    while (current && !stringEqual(current->key, key)) {
      parent = current;
      current = current->next;
    }
    if (current != NULL) {
      // 链表中找到当前元素，进行删除
      parent->next = current->next;
      map->size -= 1;
      free(current);
    }
  }
}
int containsKey(HashMap map, char *key) {
  if (!map) return -1;
  int pos = findPosition(map, key);
  printf("pos of %s is %d\n", key, pos);
  Entry current = map->datas[pos];
  while (current && !stringEqual(current->key, key)) {
    current = current->next;
  }
  if (current) return 1;
  return 0;
}
int containsValue(HashMap map, int value) { 
  if (!map) return 0;
  int length = map->length;
  for (int i=0;i<length;i++) {
    Entry current = map->datas[i];
    if (!current) continue;
    while (current && current->value != value) {
      current = current->next;
    }
    if (current) return 1;
  }
  return 0;
}

int sizeOfHashMap(HashMap map) {
  if (!map) return 0;
  return map->size;
}

int isHashMapEmpty(HashMap map) {
  if (!map) return 1;
  return sizeOfHashMap(map) == 0;
}
void printHashMap(HashMap map) {
  if (!map) return;
  printf("{ ");
  for (int i=0;i<map->length;i++) {
    Entry entry = map->datas[i];
    while (entry) {
      printf("\"%s\":%d, ", entry->key, entry->value);
      entry = entry->next;
    }
  }
  printf(" }\n");
}

int main(int argc, char const *argv[]) {
  HashMap map = initHashMap();
  putToHashMap(map, "jack", 123);
  putToHashMap(map, "jason", 456);
  putToHashMap(map, "coolcao", 241);
  putToHashMap(map, "lili", 421);
  putToHashMap(map, "tom", 244);
  putToHashMap(map, "alex", 341);
  putToHashMap(map, "bob", 391);
  putToHashMap(map, "Aol", 371);
  putToHashMap(map, "Cat", 274);
  putToHashMap(map, "Dog", 304);
  putToHashMap(map, "Egg", 597);
  putToHashMap(map, "Fog", 459);
  putToHashMap(map, "God", 298);
  putToHashMap(map, "Hot", 891);
  putToHashMap(map, "If", 481);
  putToHashMap(map, "Jad", 781);
  putToHashMap(map, "Kiki", 489);
  putToHashMap(map, "Lad", 738);
  putToHashMap(map, "Momo", 640);

  printHashMap(map);
  printf("length: %d\n", map->length);
  printf("usage: %d\n", map->usage);
  printf("size: %d\n", map->size);

  return 0;
}

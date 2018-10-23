---
title: 学习笔记-数据结构与算法js实现-【8】图和图算法
date: 2016-12-08 18:31:32
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

图是一种复杂的数据结构，也是应用最广泛的一种数据结构。
本章我们会学习一下图是什么，如何使用js表示图的结构，以及实现图的算法。学习如何使用图进行建模。

<!--more-->

## 图的定义
--------
图是网络结构的抽象模型。图是一组由边连接的节点(或顶点)。
一个图G = (V, E)由以下元素组成。
 V:一组顶点
 E:一组边，连接V中的顶点

> 定义1:一个图G=(V,E)由顶点的非空集V和边的集合E构成，每条边有一个或两个顶点与它相连，这样的顶点称为边的端点。边连接它的端点。

![一个简单的图](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph.example.png)

由一条边连接在一起的顶点称为相邻顶点。比如，A和B是相邻的。
一个顶点的度是其相邻顶点的数量。比如，A和其他三个顶点相连接，因此，A的度为3.E和其他两个顶点相连，因此E的度是2.
路径是顶点v1, v2,...,vk的一个连续序列，其中vi和vi+1是相邻的。以上一示意图中的图为例，其中包含路径A B E I和A C D G。
简单路径要求不包含重复的顶点。举个例子，A D G是一条简单路径。除去最后一个顶点(因 为它和第一个顶点是同一个顶点)，环也是一个简单路径，比如A D C A(最后一个顶点重新回到A)。
如果图中不存在环，则称该图是无环的。如果图中每两个顶点间都存在路径，则该图是连通的。

每条边都连接两个不同的顶点且没有两个不同的边连接一对相同顶点的图相同的称为**简单图**。
可能会有多重边连接同一对顶点的图称为**多重图**。当有m条不同的边与相同的无序顶点相关联，我们也说{u,v}是一条多重度为m的边。
把一个顶点连接到它自身的边，称为**环**。
包含环或者存在多重边连接同一对顶点或同一个顶点的图，称为**伪图**。

### 有向图和无向图
图可以是无向的(边没有方向)或是有向的(有向图)。如下图所示，有向图的边有一个方向:
![有向图](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/digraph.png)

> 定义2:一个有向图(v,E)由一个非空顶点集V和一个有向边集E组成。每条有向边与一个顶点有序对相关联。与有序对(u,v)相关联的有向边开始于u,结束于v.

当一个有向图不包含环和多重有向边时，就称为**简单有向图**。
包含从一个顶点指向第二个顶点的多重有向边的有向图称为有**向多重图**。

即包含有向边又包含无向边的图称为**混合图**。

图术语表格：

|类型|边|允许多重边|允许环|
|----|----|----|----|
|简单图|无向|否|否|
|多重图|无向|是|否|
|伪图|无向|是|是|
|简单有向图|有向|否|否|
|有向多重图|有向|是|是|
|混合图|有向的和无向的|是|是|

以下三个问题能够帮助我们理解图的结构：
* 图的边是有向的还是无向的(还是两者皆有)
* 如果是无向图，是否存在连接相同顶点对的多重边？如果是有向图，是否存在多重有向边？
* 是否存在环

这三个问题有助于我们理解图，而记住所使用的特定术语就不那么重要了。

如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如，C和D是强连通的，而A和B不是强连通的。
图还可以是未加权的(目前为止我们看到的图都是未加权的)或是加权的。如下图所示，加权图的边被赋予了权值:
![加权图](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/weighted-graph.png)

## 图的表示
________
### 邻接矩阵
图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我 们用一个二维数组来表示顶点之间的连接。如果索引为i的节点和索引为j的节点相邻，则array[i][j] === 1，否则array[i][j] === 0，如下图所示:

![邻接矩阵](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph-ljjz.png)

不是强连通的图(稀疏图)如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们 浪费了计算机存储空间来表示根本不存在的边。例如，找给定顶点的相邻顶点，即使该顶点只有 一个相邻顶点，我们也不得不迭代一整行。邻接矩阵表示法不够好的另一个理由是，图中顶点的 数量可能会改变，而2维数组不太灵活。

### 邻接表
我们也可以使用一种叫作邻接表的动态数据结构来表示图。邻接表由图中每个顶点的相邻顶 点列表所组成。存在好几种方式来表示这种数据结构。我们可以用列表(数组)、链表，甚至是 散列表或是字典来表示相邻顶点列表。下面的示意图展示了邻接表数据结构。

![邻接表](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph-ljb2.png)

尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用，且它们有 着不同的性质(例如，要找出顶点v和w是否相邻，使用邻接矩阵会比较快)。在本书的示例中， 我们将会使用邻接表表示法。

### 关联矩阵
我们还可以用关联矩阵来表示图。在关联矩阵中，矩阵的行表示顶点，列表示边。如下图所 示，我们使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则array[v][e] === 1; 否则，array[v][e] === 0。

![关联矩阵](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph-gljz.png)

关联矩阵通常用于边的数量比顶点多的情况下，以节省空间和内存。

## 图的实现
--------
定义图类：

```js
/**
 * 图类
 */
class Graph {
    /**
     * 构造函数
     * @param  {Array} vertices 顶点数组
     * @return {Graph}         图实例对象
     */
    constructor(vertices) {
        this.vertices = [];
        this.adj = Object.create(null);    //用于存储邻接表
        this.edges = 0; //边的条数
        this.visited = Object.create(null);    //用于记录访问过的顶点
        if (Array.isArray(vertices)) {
            vertices.forEach(v => {
                this.vertices.push(v);
                this.adj[v] = [];
            });
        }
    }

    /**
     * 添加边
     * @param {Any} v 顶点
     * @param {Any} w 顶点
     */
    addEdge(v, w) {
        let has_v = this.vertices.includes(v);
        let has_w = this.vertices.includes(w);
        if ( has_v && has_w ) {
            this.adj[v].push(w);
            this.adj[w].push(v);
            this.edges++;
        }else{
            throw new Error(has_v?`不存在顶点${w}`:`不存在顶点${v}`);
        }
    }

    /**
     * 添加顶点
     * @param {Any} v 要添加的顶点
     */
    addVertex(v){
        this.vertices.push(v);
        this.adj[v] = [];
    }

    /**
     * 显示图
     */
    toString() {
        let vertices = this.vertices;
        return vertices.reduce((pre,current)=>{
            pre += ((current + ' --> ') + this.adj[current] + '\n');
            return pre;
        },'');
    }
}

```

我们定义一个类Graph,其中属性vertices存储图的顶点集合，这里我们使用邻接表存储顶点间的关系，adj是一个对象，用于存储邻接表,edges表示图的边的条数。
在调用构造器初始化一个Graph对象时，如果传了顶点数组，会使用顶点初始化，同时再添加一个addVertex()添加顶点的方法用于动态添加顶点。

## 图的搜索
--------
对图进行遍历有两种方法，*深度优先搜索*,*广度优先搜索*

|算法|数据结构|描述|
|----|----|----|
|深度优先搜索|栈|通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问|
|广度优先搜索|队列|通过将顶点存入队列中，最先入队列的顶点先被探索|

### 深度优先搜索
深度优先搜索包括从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯， 继续追溯下一条路径，直到到达最后的顶点，如此往复，直到没有路径为止。这不是在搜 索特定的路径，而是通过搜索来查看在图中有哪些路径可以选择。

![DFS](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph-dfs.png)

深度优先搜索算法比较简单:访问一个没有访问过的顶点，将它标记为已访问，再递归地去访问在初始顶点的邻接表中其他没有访问过的顶点。

```js
/**
 * 重置访问顶点
 */
[resetVisted](){
    this.vertices.forEach(v => {
        this.visited[v] = false;
    })
}

/**
 * 深度优先搜索
 * @param {Any} v 访问顶点
 * @param {Array} result 用于保存搜索结果的数组
 */
[dfs](v,result){
    this.visited[v] = true;
    result.push(v);
    this.adj[v].forEach(w => {
        if(!this.visited[w]){
            this[dfs](w,result);
        }
    });
}

/**
 * 深度优先搜索
 * @param  {Any} v 开始搜索的顶点
 * @return {Array}   深度优先搜索返回的数组
 */
dfs(v) {
    let result = [];
    //每次访问之前，还原访问记录
    this[resetVisted]();
    this[dfs](v,result);
    return result;
}
```

### 广度优先搜索
广度优先搜索从第一个顶点开始，尝试访问尽可能靠近它的顶点。本质上，这种搜索在图上是逐层移动的，首先稽查最靠近第一个顶点的层，再主见向下移动到离其实顶点最远的层。

![广度优先搜索](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/graph-bfs.png)

广度优先搜索算法使用了抽象的队列而不是数组来对已访问过的顶点进行排序。
* (1) 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中;
* (2) 从图中取出下一个顶点 v，添加到已访问的顶点列表;
* (3) 将所有与 v 相邻的未访问顶点添加到队列。

```js
/**
 * 广度优先搜索
 * @param {Any} v 访问的顶点
 * @param {Array} result 用于保存访问结果的数组
 */
[bfs](v,result){
    this.visited[v] = true;
    let queue = new Queue();
    queue.enqueue(v);
    while (queue.size() > 0) {
        let _v = queue.dequeue();
        result.push(_v);
        this.adj[_v].forEach(w => {
            if(!this.visited[w]){
                this.visited[w] = true;
                queue.enqueue(w);
            }
        })
    }

    return result;
}

/**
 * 广度优先搜索
 * @param  {Any} s 开始搜索的顶点
 * @return {Array}   搜索结果数组
 */
bfs(s){
    //每次遍历之前，还原访问记录
    this[resetVisted]();
    let result = [];
    this[bfs](s,result);
    return result;
}
```

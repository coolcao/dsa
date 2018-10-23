---
title: 学习笔记-数据结构与算法js实现-【7】树和二叉树
date: 2016-12-06 14:11:34
tags: [数据结构与算法,js]
categories:
- 学习笔记
- 数据结构与算法
---

树是计算机科学中经常用到的一种数据结构。
树是一种非线性的数据结构，以分层的方式 存储数据。
树被用来存储具有层级关系的数据，比如文件系统中的文件;
树还被用来存储 有序列表。
本章将研究一种特殊的树:二叉树。
选择树而不是那些基本的数据结构，是因 为在二叉树上进行查找非常快(而在链表上查找则不是这样)，为二叉树添加或删除元素 也非常快(而对数组执行添加或删除操作则不是这样)。

<!--more-->

## 基础知识
树由一组以边连接的节点组成。
树是一种分层数据的抽象模型。
现实生活中最常见的树的例子是家谱，或是公司的组织架构 图，如下图所示:

![公司架构图](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/tree-example.png)

### 树的相关术语
一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个
节点)以及零个或多个子节点:

![树](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/tree1.png)

位于树顶部的节点叫作根节点(11)。它没有父节点。树中的每个元素都叫作节点，节点分 为内部节点和外部节点。至少有一个子节点的节点称为内部节点(7、5、9、15、13和20是内部 节点)。没有子元素的节点称为外部节点或叶节点(3、6、8、10、12、14、18和25是叶节点)。

一个节点可以有祖先和后代。一个节点(除了根节点)的祖先包括父节点、祖父节点、曾祖 父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。例如，节点5的祖先有节点7 和节点11，后代有节点3和节点6。

有关树的另一个术语是子树。子树由节点和它的后代构成。例如，节点13、12和14构成了上 图中树的一棵子树。

节点的一个属性是深度，节点的深度取决于它的祖先节点的数量。比如，节点3有3个祖先节 点(5、7和11)，它的深度为3。

树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级。根节点在第0层，它 的子节点在第1层，以此类推。上图中的树的高度为3(最大高度已在图中表示——第3层)。

## 二叉树和二叉搜索树
二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点。

二叉搜索树(BST)是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值。

![二叉搜索树](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/binary_tree.png)

### 二叉树方法
*  insert(key) : 向树中插入一个新的键。
*  search(key) : 在树中查找一个键，如果节点存在，则返回true;如果不存在，则返回false。
*  inOrder : 通过中序遍历方式遍历所有节点。  访问顺序：左节点->父节点->右节点。因此，结果是对二叉搜索树排序。
*  preOrder : 通过先序遍历方式遍历所有节点。 访问顺序：父节点->左节点->右节点。
*  postOrder : 通过后序遍历方式遍历所有节点。访问顺序：左节点->右节点->父节点。
*  min : 返回树中最小的值/键。
*  max : 返回树中最大的值/键。
*  remove(key) : 从树中移除某个键。

### 二叉搜索树实现
由二叉树的结构，我们需要一个节点类Node，包含数据data，左节点left，右节点right:

```js
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    getData() {
        return this.data;
    }
}
```

#### 插入 insert(key)
搜索二叉树的左节点小于父节点，而右节点大于或等于父节点，因此，插入操作还是比较容易实现的。
* 1.先检查是否有根节点，如果没有，则根节点就是要插入的新节点。
* 2.如果有根节点
  *     1》设根节点为当前节点
  *   2》如果待插入节点保存的数据小于当前节点,则设新的当前节点为原节点的左节点;反之,执行第 4 步。
  *   3》如果当前节点的左节点为null，就将新节点插入这个位置。反之，继续执行下一次循环。
  *   4》设新的当前节点为原节点的右节点
  *   5》如果当前节点的右节点为null，就将新节点插入这个位置。反之，继续执行下一次循环。

![插入操作](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree-insert.png)
这是在搜索二叉树中插入节点6的过程示意图

```js
insert(element) {
let newNode = new Node(element);
//如果根节点为空，则直接将新节点插入到根节点
if (this.root == null) {
    this.root = newNode;
} else {
    let currentNode = this.root;
    while (true) {
        if (newNode.getData() < currentNode.getData()) {
            if (currentNode.left == null) {
                currentNode.left = newNode;
                break;
            }
            currentNode = currentNode.left;
        } else {
            if (currentNode.right == null) {
                currentNode.right = newNode;
                break;
            }
            currentNode = currentNode.right;
        }
    }

}
};
```

#### 中序遍历
中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。
中序遍历的一种应用就是对树进行排序操作。
首先要检查以参数形式传入的节点是否为null(这就是停止递归继续执行的判断条件)。
然后，递归调用相同的函数来访问左侧子节点。接着对这个节点进行一些操作 ，然后再访问右侧子节点。

![中序遍历](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree-inorder.png)

```js
const inOrder = Symbol('inOrder');
/**
* 中序遍历二叉树
* @param  {Node} node 遍历树的根节点
* @param  {Array} result 暂存遍历结果
*/
[inOrder](node, result) {
    if (node !== null) {
        this[inOrder](node.left, result);
        result.push(node.getData());
        this[inOrder](node.right, result);
    }
};
/**
* 中序遍历，以数组的形式返回遍历结果
* @return {Array} 遍历结果
*/
inOrder(){
  let result = [];
  this[inOrder](this.root,result);
  return result;
}
```

我们先定义一个递归访问函数，中序遍历依次访问左子树，父节点，右子树。
这里我们将访问到的节点数据扔到一个数组中，最后遍历结束后返回这个结果数组。
这个递归数组在定义的时候，我使用了ES6中的Symbol，原因是，
Symbol是独一无二的，因此，在函数外部无法访问到函数内部定义的Symbol变量，变相的实现了私有变量的功能。
即，这里的递归函数可认为是私有的方法。后续的几个方法，也是这么定义的。

#### 先序遍历
先序遍历是以优先于后代节点的顺序访问每个节点的。
先序遍历的一种应用是打印一个结构化的文档。
先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点;

![先序遍历](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree-preorder.png)

```js
const preOrder = Symbol('preOrder');
/**
* 先序遍历二叉树
* @param  {Node} node 遍历树的根节点
* @param  {Array} result 暂存遍历结果
*/
[preOrder](node, result) {
    if (node !== null) {
        result.push(node.getData());
        this[preOrder](node.left, result);
        this[preOrder](node.right, result);
    }
};
/**
* 先序遍历，以数组形式返回遍历结果
* @return {Array} 遍历结果
*/
preOrder(){
  let result = [];
  this[preOrder](this.root,result);
  return result;
}
```

#### 后序遍历
后序遍历则是先访问节点的后代节点，再访问节点本身。
后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
后序遍历会先访问左侧子节点，然后是右侧子节点，最后 是父节点本身。

![后序遍历](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree-postorder.png)

```js
const postOrder = Symbol('postOrder');
/**
* 后序遍历二叉树
* @param  {Node} node 遍历树的根节点
* @param  {Array} result 暂存遍历结果
*/
[postOrder](node, result) {
    if (node !== null) {
        this[postOrder](node.left, result);
        this[postOrder](node.right, result);
        result.push(node.getData());
    }
};
/**
* 后序遍历，以数组形式返回遍历结果
* @return {Array} 遍历结果
*/
postOrder(){
  let result = [];
  this[postOrder](this.root,result);
  return result;
}
```

#### 搜索search(key)
如果要找的键比当前的节点小，那么 继续在左侧的子树上搜索。
如果要找的键比当前的节点大，那么就从右侧子节点开始继续搜索，
否则就说明要找的键和当前节点的键相等，就返回true来表示找到了这个键。

```js
const search = Symbol('search');
/**
* 查找元素
* @param  {Node} node 父节点
* @return {Boolean}      找到返回true，否则返回false
*/
[search](node, data) {
    if (node === null) {
        return false;
    }
    if (data < node.getData()) {
        return this[search](node.left, data);
    } else if (data > node.getData()) {
        return this[search](node.right, data);
    } else {
        return true;
    }
}
/**
* 在树中查找一个键，如果节点存在，则返回true;如果不存在，则返回false
* @param  {Any} element 要查找的元素
* @return {Boolean}         存在返回true,否则返回false
*/
search(element) {
    return this[search](this.root, element);
}
```

#### 最大值和最小值
查找 BST 上的最小值和最大值非常简单。
因为较小的值总是在左子节点上，在 BST 上查找最小值，只需要遍历左子树，直到找到最后一个节点。
而最大值总是右子节点上，在BST上查找最大值，只需要遍历右子树，直到找到最后一个节点，该节点上保存的值即 为最大值。

```js
const min = Symbol('min');
const max = Symbol('max');
/**
* 查找以node为父节点的子树的最小值
* @param  {[type]} node [父节点]
* @return {[type]}      [子树的最小值]
*/
[min](node) {
  let currentNode = node;
  while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
  }
  return currentNode && currentNode.getData();
}

/**
* 查找以node为父节点的子树的最大值
* @param  {[type]} node [父节点]
* @return {[type]}      [子树的最大值]
*/
[max](node) {
  let currentNode = node;
  while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
  }
  return currentNode && currentNode.getData();
}

/**
* 返回树中最小的值/键
* @return {Any} 返回树中最小值
*/
min() {
  return this[min](this.root);
}

/**
* 返回树中最大的值/键
* @return {Any} 查找最大值
*/
max() {
  return this[max](this.root);
}
```

#### 删除节点
从 BST 上删除节点的操作最复杂，其复杂程度取决于删除哪个节点。
如果删除没有子节点 的节点，那么非常简单。
如果节点只有一个子节点，不管是左子节点还是右子节点，就变得稍微有点复杂了。
删除包含两个子节点的节点最复杂。

##### 移除一个叶节点
第一种情况是该节点是一个没有左侧或右侧子节点的叶节点。
在这种情况下，我 们要做的就是给这个节点赋予null值来移除它。
但是当学习了链表的实现之后，我们 知道仅仅赋一个null值是不够的，还需要处理指针。
在这里，这个节点没有任何子节点，但是 它有一个父节点，需要通过返回null来将对应的父节点指针赋予null值。

![一个叶子节点](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/remove_1.png)

##### 移除有一个左侧或右侧子节点的节点
移除有一个左侧子节点或右侧子节点的节点。这种情况下，需要跳过这个节点，直接将父节点指向它的指针指向子节点。
如果这个节点没有左侧子节点，也就是说它有一个右侧子节点。
因此我们把对它 的引用改为对它右侧子节点的引用并返回更新后的节点。
如果这个节点没 有右侧子节点，也是一样——把对它的引用改为对它左侧子节点的引用并返回更新 后的值。

![移除有一个左侧或右侧子节点的节点](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree_remove_left_right.png)

##### 移除有两个子节点的节点
要移除有两个子节点的节点，需要执行四个步骤。
(1) 当找到了需要移除的节点后，需要找到它右边子树中最小的节点
(2) 然后，用它右侧子树中最小节点的键去更新这个节点的值。通过这一步，我们改变了这个节点的键，也就是说它被移除了。
(3) 但是，这样在树中就有两个拥有相同键的节点了，这是不行的。要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了。
(4) 最后，向它的父节点返回更新后节点的引用。

![移除有两个子节点的节点](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bstree_remove_two.png)

```js
const removeNode = Symbol('removeNode');
/**
* 从二叉搜索树删除节点
* 1.判断当前节点是否包含待删除的数
* 2.如果包含，则删除节点，如果不包含，则比较当前节点上的数和待删除数据，
*     如果待删除数据小于当前节点上的数，则移至当前节点的左子节点继节点续比较。
*     如果待删除数据大于当前节点上的数，则移至当前节点的右子节点继续比较。
* 删除判断：
* 1.如果当前节点是叶子节点（没有左子节点和右子节点），那么只需要将父节点指向它的链接指向null。
* 2.如果待删除的节点只包含一个子节点，那么原本指向它的节点指向它的子节点
* 3.如果待删除的节点包含两个子节点，那么，有两种做法：
*     1>查找删除节点左子树上的最大值
*     2>查找其右子树上的最小值
*/
[removeNode](node, data) {
  if (node == null) {
      return null;
  }
  if (data == node.getData()) {
      //没有子节点的节点
      if (node.left == null && node.right == null) {
          return null;
      }
      //没有左子节点的节点
      if (node.left == null) {
          return node.right;
      }
      //没有右子节点的节点
      if (node.right == null) {
          return node.left;
      }
      //有两个子节点的节点
      let smallest = this[min](node.right);
      node.data = smallest;
      node.right = this[removeNode](node.right, smallest);
      return node;
  } else if (data < node.getData()) {
      node.left = this[removeNode](node.left, data);
      return node;
  } else {
      node.right = this[removeNode](node.right, data);
      return node;
  }
}
/**
* 从树中移除某个键
* @param  {Any} data 要删除的值
* @return {}      [description]
*/
remove(data) {
  let root = this[removeNode](this.root, data);
}
```

#### 完整代码
```js
const min = Symbol('min');
const max = Symbol('max');
const search = Symbol('search');
const removeNode = Symbol('removeNode');
const inOrder = Symbol('inOrder');
const preOrder = Symbol('preOrder');
const postOrder = Symbol('postOrder');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    getData() {
        return this.data;
    }
}

/**
 * 搜索二叉树
 * 定义：
 *     若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 *     若它的右子树不空，则右子树上所有结点的值均大于或等于它的根结点的值；
 *     它的左、右子树也分别为二叉排序树。
 */
class BSTree {
    constructor() {
        this.root = null;
    };

    /**
     * 查找以node为父节点的子树的最小值
     * @param  {Node} node 父节点
     * @return {Any}      子树的最小值
     */
    [min](node) {
        let currentNode = node;
        while (currentNode && currentNode.left) {
            currentNode = currentNode.left;
        }
        return currentNode && currentNode.getData();
    };

    /**
     * 查找以node为父节点的子树的最大值
     * @param  {Node} node 父节点
     * @return {Any}      子树的最大值
     */
    [max](node) {
        let currentNode = node;
        while (currentNode && currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode && currentNode.getData();
    };

    /**
     * 查找元素
     * @param  {Node} node 父节点
     * @return {Boolean}      找到返回true，否则返回false
     */
    [search](node, data) {
        if (node === null) {
            return false;
        }
        if (data < node.getData()) {
            return this[search](node.left, data);
        } else if (data > node.getData()) {
            return this[search](node.right, data);
        } else {
            return true;
        }
    };

    /**
     * 从二叉搜索树删除节点
     * 1.判断当前节点是否包含待删除的数
     * 2.如果包含，则删除节点，如果不包含，则比较当前节点上的数和待删除数据，
     *     如果待删除数据小于当前节点上的数，则移至当前节点的左子节点继节点续比较。
     *     如果待删除数据大于当前节点上的数，则移至当前节点的右子节点继续比较。
     * 删除判断：
     * 1.如果当前节点是叶子节点（没有左子节点和右子节点），那么只需要将父节点指向它的链接指向null。
     * 2.如果待删除的节点只包含一个子节点，那么原本指向它的节点指向它的子节点
     * 3.如果待删除的节点包含两个子节点，那么，有两种做法：
     *     1>查找删除节点左子树上的最大值
     *     2>查找其右子树上的最小值
     */
    /**
     * 删除树的节点，并返回树的根节点
     * @param {Node} node 树的根节点
     * @param {Any}  data 要删除数据
     */
    [removeNode](node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.getData()) {
            //没有子节点的节点
            if (node.left == null && node.right == null) {
                return null;
            }
            //没有左子节点的节点
            if (node.left == null) {
                return node.right;
            }
            //没有右子节点的节点
            if (node.right == null) {
                return node.left;
            }
            //有两个子节点的节点
            let smallest = this[min](node.right);
            node.data = smallest;
            node.right = this[removeNode](node.right, smallest);
            return node;
        } else if (data < node.getData()) {
            node.left = this[removeNode](node.left, data);
            return node;
        } else {
            node.right = this[removeNode](node.right, data);
            return node;
        }
    };

    /**
     * 中序遍历二叉树
     * @param  {Node} node 遍历树的根节点
     * @param  {Array} result 暂存遍历结果
     */
    [inOrder](node, result) {
        if (node !== null) {
            this[inOrder](node.left, result);
            result.push(node.getData());
            this[inOrder](node.right, result);
        }
    };

    /**
     * 先序遍历二叉树
     * @param  {Node} node 遍历树的根节点
     * @param  {Array} result 暂存遍历结果
     */
    [preOrder](node, result) {
        if (node !== null) {
            result.push(node.getData());
            this[preOrder](node.left, result);
            this[preOrder](node.right, result);
        }
    };

    /**
     * 后序遍历二叉树
     * @param  {Node} node 遍历树的根节点
     * @param  {Array} result 暂存遍历结果
     */
    [postOrder](node, result) {
        if (node !== null) {
            this[postOrder](node.left, result);
            this[postOrder](node.right, result);
            result.push(node.getData());
        }
    };


    /**
     * 搜索二叉树插入规则：
     * 1.先检查是否有根节点，如果没有，则根节点就是要插入的新节点。
     * 2.如果有根节点
     *     1》设根节点为当前节点
     *     2》如果待插入节点保存的数据小于当前节点,则设新的当前节点为原节点的左节点;反之,执行第 4 步。
     *     3》如果当前节点的左节点为null，就将新节点插入这个位置。反之，继续执行下一次循环。
     *     4》设新的当前节点为原节点的右节点
     *     5》如果当前节点的右节点为null，就将新节点插入这个位置。反之，继续执行下一次循环。
     */
    insert(element) {
        let newNode = new Node(element);
        //如果根节点为空，则直接将新节点插入到根节点
        if (this.root == null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while (true) {
                if (newNode.getData() < currentNode.getData()) {
                    if (currentNode.left == null) {
                        currentNode.left = newNode;
                        break;
                    }
                    currentNode = currentNode.left;
                } else {
                    if (currentNode.right == null) {
                        currentNode.right = newNode;
                        break;
                    }
                    currentNode = currentNode.right;
                }
            }

        }
    };

    /**
     * 在树中查找一个键，如果节点存在，则返回true;如果不存在，则返回false
     * @param  {Any} element 要查找的元素
     * @return {Boolean}         存在返回true,否则返回false
     */
    search(element) {
        return this[search](this.root, element);
    };

    /**
     * 返回树中最小的值/键
     * @return {Any} 返回树中最小值
     */
    min() {
        return this[min](this.root);
    };

    /**
     * 返回树中最大的值/键
     * @return {Any} 查找最大值
     */
    max() {
        return this[max](this.root);
    };


    /**
     * 从树中移除某个键
     * @param  {Any} data 要删除的值
     */
    remove(data) {
        let root = this[removeNode](this.root, data);
    };

    /**
     * 中序遍历，以数组的形式返回遍历结果
     * @return {Array} 遍历结果
     */
    inOrder() {
        let result = [];
        this[inOrder](this.root, result);
        return result;
    };

    /**
     * 先序遍历，以数组形式返回遍历结果
     * @return {Array} 遍历结果
     */
    preOrder() {
        let result = [];
        this[preOrder](this.root, result);
        return result;
    };

    /**
     * 后序遍历，以数组形式返回遍历结果
     * @return {Array} 遍历结果
     */
    postOrder() {
        let result = [];
        this[postOrder](this.root, result);
        return result;
    };

}
```

## 练习
### 层次遍历

![层次遍历](https://img001-10042971.cos.ap-shanghai.myqcloud.com/blog/bst_level_order.png)

#### 方案1：
可以用一个队列暂存访问过的节点，按照层级关系入队，然后出队遍历即可。

```js
const Queue = require('./Queue.js');
levelTraversal(){
    let result = [];
    if(this.root){
        let visted = new Queue();
        visted.enqueue(this.root);
        while (!visted.isEmpty()) {
            let node = visted.dequeue();
            result.push(node.getData());
            if(node.left){
                visted.enqueue(node.left);
            }
            if(node.right){
                visted.enqueue(node.right);
            }
        }
    }
    return result;
}
```

#### 方案2:
在编程之美这本书上，指明了另外一种方法，将问题拆分为两个：
1.打印二叉树中某层次的节点，其中根节点为第0层。打印成功，返回true，打印失败，返回false
2.从第0层开始，依次打印每一层的节点

```js
/**
* 打印以node为节点的子树第level层节点
*/
[printLevel](node,level,result){
    if(!node || level < 0){
        return false;
    }
    if(level == 0){
        result.push(node.getData());
        return true;
    }
    let pleft = this[printLevel](node.left,level-1,result);
    let pright = this[printLevel](node.right,level-1,result);
    return pleft || pright;
}

/**
* 打印第level层的节点
* @param  {Number} level 要打印的层数
* @return {Boolean}       成功返回ture,失败返回false
*/
printLevel(level){
    let result = [];
    this[printLevel](this.root,level,result);
    return result;
}

//递归打印所有层的节点
levelTraversal2(){
    let result = [];
    let i = 0;
    for (i = 0; ; i++) {
        let pl = this.printLevel(i);
        result = result.concat(pl);
        if(pl.length == 0){
            break;
        }
    }
    return result;
}
```

打印第level层节点，相当于打印以level-1层节点为根节点的两棵子树。
这个逻辑有点绕，看上面的图举例：
比如要打印第level=2层中的节点，其中5,9都是在第二层。
那么相当于是打印以5,9父节点7为根节点的树的level-1=1层节点。
这种方法是以递归的形式，打印第k层，逐层往上递归，然后再下来。
其中第0层重复访问次数最多，1层次之，逐层递减。

### 计算树的深度
有了上面例子中打印第n层节点的方法，我们可以调用这个方法，逐层计算每层的节点个数，当节点个数为0时说明已到树的顶部，返回此时的层级数即可。

```js
/**
* 计算树的深度
*/
deep(){
    let _deep = 0;
    for(let i=0;;i++){
        let pl = this.printLevel(i)
        if(pl.length > 0){
            _deep ++;
        }else{
            break;
        }
    }
    return _deep;
}
```

### 由遍历结果还原BSTree
#### 先序遍历
如果给定一个先序遍历结果，要还原BSTree很简单，只需要按照先序遍历结果的顺序重新建树即可。

```js
const rebuildFromPreOrder = function(array){
    let bst = new BSTree();
    array.reduce((pre,current)=>{
        pre.insert(current);
        return pre;
    },bst);
}
```

#### 后序遍历
如果给定一个后序遍历结果，也还原BSTree也很简单，只需要按照后序遍历结果的逆序重新建树即可。

```js
const rebuildFromPostOrder = function(array){
    let bst = new BSTree();
    array.reduceRight((pre,current)=>{
        pre.insert(current);
        return pre;
    },bst);
}
```

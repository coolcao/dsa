'use strict';

class Node {
    constructor(data, left, right) {
        this.left = left;
        this.right = right;
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

const min = function min(node) {
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
const max = function max(node) {
    let currentNode = node;
    while (currentNode && currentNode.right) {
        currentNode = currentNode.right;
    }
    return currentNode && currentNode.getData();
}


/**
 * 从二叉搜索树删除节点
 * 1.判断当前节点是否包含待删除的数
 * 2.如果包含，则删除节点，如果不包含，则比较当前节点上的数和待删除数据，如果待删除数据小于当前节点上的数，则移至当前节点的左子节点继节点续比较。如果待删除数据大于当前节点上的数，则移至当前节点的右子节点继续比较。
 * 删除判断：
 * 1.如果当前节点是叶子节点（没有左子节点和右子节点），那么只需要将父节点指向它的链接指向null。
 * 2.如果待删除的节点只包含一个子节点，那么原本指向它的节点指向它的子节点
 * 3.如果待删除的节点包含两个子节点，那么，有两种做法：1>查找删除节点左子树上的最大值 2>查找其右子树上的最小值
 */
const removeNode =  function removeNode(node, data) {
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
        let smallest = min(node.right);
        node.data = smallest;
        node.right = removeNode(node.right, smallest);
        return node;
    } else if (data < node.getData()) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}

/**
 * 搜索二叉树
 * 定义：若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。
 */
class BSTree {
    constructor() {
            this.root = null;
        }
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
    }

    /**
     * 根据指定元素查找值，如果找到，返回，如果未找到，返回null
     */
    find(element) {
        let currentNode = this.root;
        let value = null;
        while (currentNode) {
            if (element > currentNode.getData()) {
                currentNode = currentNode.right;
            } else if (element < currentNode.getData()) {
                currentNode = currentNode.left;
            } else if (element == currentNode.getData()) {
                value = currentNode.getData();
                break;
            }
        }
        return value;
    }

    /**
     * 查找最小值
     */
    min() {
        return min(this.root);
    }

    /**
     * 查找最大值
     */
    max() {
        return max(this.root);
    }


    remove(data) {
        let root = removeNode(this.root, data);
        console.log(JSON.stringify(root));
        //  this.root = BSTree.removeNode(this.root,data);
    }

}

/**
 * [inOrder 中序遍历二叉树]
 * @param  {[Node]} node [遍历树的根节点]
 * @return {[type]}      [description]
 */
const inOrder = function inOrder(node, result) {
    if (!(node == null)) {
        inOrder(node.left, result);
        result.push(node.getData());
        inOrder(node.right, result);
    }
};
const preOrder = function preOrder(node, result) {
    if (!(node == null)) {
        result.push(node.getData());
        preOrder(node.left, result);
        preOrder(node.right, result);
    }
}

let a = [87,234,5,21,65,23,98,98,90];
let bst = new BSTree();
for(let item of a){
    bst.insert(item);
}

let result = [];
inOrder(bst.root,result);
console.log(result);
console.log(bst.min());
console.log(bst.max());
let value = 98;
console.log(bst.find(value));

// let array = [56, 22, 10, 30, 81, 77, 92];
// let bst = new BSTree();
// for (let a of array) {
//     bst.insert(a);
// }
//
// console.log(JSON.stringify(bst));
// bst.remove(22);
// console.log(JSON.stringify(bst));

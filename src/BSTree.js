'use strict';

const min = Symbol('min');
const max = Symbol('max');
const search = Symbol('search');
const removeNode = Symbol('removeNode');
const inOrder = Symbol('inOrder');
const preOrder = Symbol('preOrder');
const postOrder = Symbol('postOrder');


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
    }
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
     * @param  {Node} node 父节点
     * @return {Any}      子树的最大值
     */
    [max](node) {
        let currentNode = node;
        while (currentNode && currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode && currentNode.getData();
    }

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
     * 中序遍历二叉树
     * @param  {Node} node 遍历树的根节点
     * @param  {Array} result 暂存遍历结果
     */
    [inOrder](node, result) {
        if (!(node == null)) {
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
        if (!(node == null)) {
            result.push(node.getData());
            this[preOrder](node.left, result);
            this[preOrder](node.right, result);
        }
    }
    /**
     * 后序遍历二叉树
     * @param  {Node} node 遍历树的根节点
     * @param  {Array} result 暂存遍历结果
     */
    [postOrder](node, result) {
        if (!(node == null)) {
            this[preOrder](node.left, result);
            this[preOrder](node.right, result);
            result.push(node.getData());
        }
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
     * 在树中查找一个键，如果节点存在，则返回true;如果不存在，则返回false
     * @param  {Any} element 要查找的元素
     * @return {Boolean}         存在返回true,否则返回false
     */
    search(element) {
        return this[search](this.root, element);
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


    /**
     * 从树中移除某个键
     * @param  {Any} data 要删除的值
     * @return {}      [description]
     */
    remove(data) {
        let root = this[removeNode](this.root, data);
    }

    /**
     * 中序遍历，以数组的形式返回遍历结果
     * @return {Array} 遍历结果
     */
    inOrder() {
            let result = [];
            this[inOrder](this.root, result);
            return result;
        }
        /**
         * 先序遍历，以数组形式返回遍历结果
         * @return {Array} 遍历结果
         */
    preOrder() {
            let result = [];
            this[preOrder](this.root, result);
            return result;
        }
        /**
         * 后序遍历，以数组形式返回遍历结果
         * @return {Array} 遍历结果
         */
    postOrder() {
        let result = [];
        this[postOrder](this.root, result);
        return result;
    }
}



let a = [87, 234, 5, 21, 65, 23, 98, 98, 90];
let bst = new BSTree();
for (let item of a) {
    bst.insert(item);
}

console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.min());
console.log(bst.max());
let value = 90;
console.log(bst.search(value));
bst.remove(value);
console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());

module.exports = BSTree;
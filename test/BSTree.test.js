'use strict';
const BSTree = require('../src/BSTree.js');

let array = [ 87, 5, 21, 65, 23, 234, 98, 90, 98 ];

let bst = new BSTree();
array.forEach(item => {
    bst.insert(item);
});

console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
bst.printLevel(3);
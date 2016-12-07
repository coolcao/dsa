'use strict';
const BSTree = require('../src/BSTree.js');

let array = [ 87, 5, 21, 65, 23, 234, 98, 90, 98 ];

let bst = new BSTree();
array.forEach(item => {
    bst.insert(item);
});


console.log(bst.printLevel(3));
console.log(bst.levelTraversal2());

console.log(bst.deep());
'use strict';
const BSTree = require('../src/BSTree.js');

let array = [ 87, 5, 21, 65, 23, 234, 98, 90, 98 ];

let bst = new BSTree();
array.forEach(item => {
    bst.insert(item);
});

console.log(bst.preOrder());
console.log(bst.postOrder());
console.log('--------------');

let post = bst.postOrder();
let bst2 = new BSTree();
post.reduceRight((pre,current)=>{
    pre.insert(current);
    return pre;
},bst2);

console.log(bst2.preOrder());
console.log(bst2.postOrder());

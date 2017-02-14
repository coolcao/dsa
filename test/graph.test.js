'use strict';
const Graph = require('../src/Graph/Graph.js');

let g = new Graph();

g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);

g.addEdge(1,2);
g.addEdge(2,3);
g.addEdge(2,4);
g.addEdge(3,4);
g.addEdge(1,4);
g.addEdge(3,5);
g.addEdge(5,6);
g.addEdge(2,6);
g.addEdge(4,6);

// console.log(g.minPath(2,6));
console.log(g.minPath(1,6));
console.log(g.bfs(1));
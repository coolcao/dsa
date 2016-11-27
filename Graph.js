'use strict';

class Graph {
    constructor(v) {
        this.vertices = v;
        this.edges = 0;
        this.adj = [];
        for(let i=0;i<this.vertices;i++){
            this.adj[i] = [];
            this.adj[i].push('');
        }
    }
    addEdge(v,w){
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges ++;
    }
    showGraph(){
        let s = '';
        for(let i=0;i<this.vertices;i++){
            s = s + '\n' + (i + '->');
            for(let j=0;j<this.vertices;j++){
                if(this.adj[i][j] != undefined){
                    s = s + this.adj[i][j] + ' '
                }
            }
        }
        return s;
    }
}

let g = new Graph(5);
g.addEdge('a','b');
g.addEdge('a','c');
g.addEdge('a','d');
g.addEdge('b','d');
g.addEdge('b','e');

console.log(g.showGraph());

'use strict';

/**
 * 图类
 */
class Graph {
    /**
     * @param  {vertices}
     * @return {Graph}
     */
    constructor(vertices) {
        this.vertices = [];
        if (Array.isArray(vertices)) {
            vertices.forEach(v => {
                this.vertices.push(v);
            });
        }
        this.edges = 0; //边的条数
        this.adj = []; //临接表
        this.marked = [];
    }
    addEdge(v, w) {
        let has_v = this.vertices.includes(v);
        let has_w = this.vertices.includes(w);
        //首先判断这两个顶点是否是在顶点列表中
        if ( has_v && has_w ) {
            if (this.adj.hasOwnProperty(v)) {
                this.adj[v].push(w);
            } else {
                this.adj[v] = [];
                this.adj[v].push(w);
            }
            if (this.adj.hasOwnProperty(w)) {
                this.adj[w].push(v);
            } else {
                this.adj[w] = [];
                this.adj[w].push(v);
            }
            this.edges++;
        }else{
            throw new Error(has_v?`不存在顶点${w}`:`不存在顶点${v}`);
        }

    }
    showGraph() {
        let s = '';
        let vertices = Object.keys(this.adj);
        vertices.forEach((key) => {
            s += (key + '-->');
            this.adj[key].forEach((value) => {
                s += (value + ' ');
            });
            s += '\n';
        });
        console.log(s);
    }
    initMarked() {
            let keys = Object.keys(this.adj);
            keys.forEach((key) => {
                this.marked[key] = false;
            });
        }
        //深度优先搜索
    dfs(v) {
        if (Object.keys(this.marked).length !== this.vertices.length) {
            this.initMarked();
        }
        this.marked[v] = true;
        if (this.adj[v] != undefined) {
            console.log('visited vertex :' + v);
        }
        this.adj[v].forEach((w) => {
            if (!this.marked[w]) {
                this.dfs(w);
            }
        });
    }

    bfs(s){
        if (Object.keys(this.marked).length !== this.vertices.length) {
            this.initMarked();
        }
        var queue = [];
        this.marked[s] = true;
        queue.push(s);  //添加到队尾
        while (queue.length > 0) {
            let v = queue.shift();  //从队首移除
            if(this.adj[v] != undefined){
                console.log('visisted vertex : ' + v);
            }
            this.adj[v].forEach((w)=>{
                if(!this.marked[w]){
                    this.marked[w] = true;
                    queue.push(w);
                }
            });
        }
    }

}

let vertices = ['a','b','c','d','e','f'];
var g = new Graph(vertices);
g.addEdge('a', 'b');
g.addEdge('b', 'e');
g.addEdge('b', 'c');
g.addEdge('b', 'd');
g.addEdge('c', 'f');
g.addEdge('e', 'f');
g.showGraph();
g.bfs('b');
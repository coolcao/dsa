'use strict';

const dfs = Symbol('dfs');
const bfs = Symbol('bfs');
const Queue = require('./Queue.js');
const resetVisted = Symbol('resetVisted');

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

}

module.exports = Graph;
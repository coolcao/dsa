'use strict';

const dfs = Symbol('dfs');
const bfs = Symbol('bfs');
const Queue = require('../Queue/Queue.js');
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

    hasVertice(v){
        return this.vertices.includes(v);
    }

    /**
     * 添加边
     * @param {Any} v 顶点
     * @param {Any} w 顶点
     */
    addEdge(v, w) {
        let has_v = this.hasVertice(v);
        let has_w = this.hasVertice(w);
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
    [bfs](v){
        let distance = [];      //标记距离
        let predecessors = [];  //用于标记千溯节点
        let level = 0;
        this.visited[v] = true;
        let queue = new Queue();
        queue.enqueue({value:v,level:level});
        while (queue.size() > 0) {
            let _v = queue.dequeue();
            distance.push(_v);
            this.adj[_v.value].forEach(w => {
                if(!this.visited[w]){
                    this.visited[w] = true;
                    queue.enqueue({value:w,level:_v.level+1});
                    predecessors.push({value:w,pre:_v.value});
                }
            })
        }

        return {distance:distance,predecessors:predecessors};
    }

    /**
     * 广度优先搜索
     * @param  {Any} s 开始搜索的顶点
     * @return {Array}   搜索结果数组
     */
    bfs(s){
        //每次遍历之前，还原访问记录
        this[resetVisted]();
        let result = this[bfs](s);
        let distance = result.distance.map(item => {
            return item.value;
        });
        return distance;
    }

    /**
     * 计算两个节点之间最短距离
     * @param  {Any} s 元素
     * @param  {Any} d 元素
     * @return {Number}   之间的最短距离
     */
    minPath(s,d){

        if(!this.hasVertice(s) || !this.hasVertice(d)){
            throw new Error('不存在顶点，请检查');
        }

        let path = [];
        let minPath = 0;

        //重置访问节点
        this[resetVisted]();
        //以s为起点，进行广度遍历
        let result = this[bfs](s);

        let distance = result.distance;
        let predecessors = result.predecessors;

        //计算最小距离
        for(let item of distance){
            if(item.value === d){
                minPath = item.level;
            }
        }


        //查找前溯节点
        let findPre = function (v,predecessors) {
            for(let pre of predecessors){
                if(pre.value === v){
                    return pre.pre;
                }
            }
            return null;
        }
        //根据前置节点追溯路径
        let node = d;
        path.unshift(d);
        let pre = findPre(node,predecessors);
        while (pre && pre!== s ) {
            path.unshift(pre);
            node = pre;
            pre = findPre(node,predecessors);
        }
        path.unshift(s);

        return {min:minPath,path:path}

    }

}

module.exports = Graph;
function depthFirstSearch(graph, startNode, targetNode) {
    let visited = new Array(graph.length).fill(false);
    return search(graph, startNode, targetNode, visited, []);
}

function search(graph, startNode, targetNode, visited, path) {
    
    //starting at the start node, while unvisited nodes remain
    path.push(startNode);

    //if current vertex is the node we're looking for, return it
    if (startNode == targetNode) {
        return path;
    }

    //mark v as visited
    visited[startNode] = true;

    //for each edge, recursively process unless marked visited
    for (item of graph[startNode]) {
        if (!visited[item]) {
            return search(graph, item, targetNode, visited, path);
        }
    }
    return [];
}

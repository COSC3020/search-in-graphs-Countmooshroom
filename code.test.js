const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

const test =
    jsc.forall("array (pair nat nat)", function(edges) {
        var max = edges.reduce(function(a, b) { return Math.max(a, Math.max(b[0], b[1])); }, 0);
        //create Adjacency List
        var list = [];
        for(var i = 0; i <= max; i++) {
            list[i] = [];
            for(var j = 0; j < edges.length; j++) {
                if(edges[j][0] == i) list[i].push(edges[j][1]);
            }
            list[i].sort(function(a, b) { return a - b; });
            list[i] = [...new Set(list[i])];
        }

        //Create random start and end
        var start = Math.round(Math.random() * (list.length - 1));
        var end = Math.round(Math.random() * (list.length - 1));

        //Run function
        var path = depthFirstSearch(list, start, end);

        //Run through the graph to make sure I can follow this path and get to the end node
        if (path.length > 0) {
            //Check start and end nodes
            if (path[0] != start || path[path.length - 1] != end) { return false; }

            //Check that all nodes connect
            for (let i = 0; i < path.length - 1; i++) {
                if (!list[path[i]].includes(path[i+1])) {
                    return false;
                }
            }
        }

        //The above loop checks every graph that the functions returns a path for.
        //If the function says that no path exists, I don't know how to check it.

        return true;
    });
jsc.assert(test, { tests: 10000 });
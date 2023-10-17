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
        var start = getRandomInt(0, list.length);
        var end = getRandomInt(0, list.length);

        path = depthFirstSearch(list, start, end);

        //Then I'd run through the graph to make sure I can follow this path and get to the end node

        //I also need to check that if the path is [], there really is no way the item can be found.

        return true;
    });
jsc.assert(test, { tests: 1000 });
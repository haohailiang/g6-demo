const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    layout: {
        type: 'bigraph-layout',
        biSep: 300,
        nodeSep: 20,
        // nodeSize: 20,
        nodeSize: 80,
    },
    animate: false,
    defaultNode: {
        // size: 20,
        size: 80,
        style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
        },
    },
    defaultEdge: {
        size: 1,
        color: '#e2e2e2',
    },
    modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
    },
});
graph.data(data);
graph.render();
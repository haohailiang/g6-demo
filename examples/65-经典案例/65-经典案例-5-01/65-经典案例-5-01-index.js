

import rawData from './65-经典案例-5-01-data.js'
import { dataTransform } from './65-经典案例-5-01-util.js'
import './65-经典案例-5-01-registerBehavior.js'
import './65-经典案例-5-01-registerEdge.js'
import './65-经典案例-5-01-registerNode.js'

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    defaultNode: {
        size: [300, 400],
        type: 'dice-er-box',
        color: '#5B8FF9',
        style: {
            fill: '#9EC9FF',
            lineWidth: 3,
        },
        labelCfg: {
            style: {
                fill: 'black',
                fontSize: 20,
            },
        },
    },
    defaultEdge: {
        type: 'dice-er-edge',
        style: {
            stroke: '#e2e2e2',
            lineWidth: 4,
            endArrow: true,
        },
    },
    modes: {
        default: ['dice-er-scroll', 'drag-node', 'drag-canvas'],
    },
    layout: {
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        controlPoints: true,
        nodesepFunc: () => 0.2,
        ranksepFunc: () => 0.5,
    },
    animate: true,
})

graph.data(dataTransform(rawData));

graph.render();

window.debugGraph = graph
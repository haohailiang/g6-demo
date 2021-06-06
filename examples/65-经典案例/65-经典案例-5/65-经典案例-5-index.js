

import rawData from './65-经典案例-5-data.js'
import './65-经典案例-5-registerBehavior.js'
import './65-经典案例-5-registerEdge.js'
import './65-经典案例-5-registerNode.js'

const dataTransform = (data) => {
    const nodes = [];
    const edges = [];

    data.map((node) => {
        nodes.push({
            ...node
        });
        if (node.attrs) {
            node.attrs.forEach((attr) => {
                if (attr.relation) {
                    attr.relation.forEach((relation) => {
                        edges.push({
                            source: node.id,
                            target: relation.nodeId,
                            sourceKey: attr.key,
                            targetKey: relation.key,
                            label: relation.label,
                        });
                    });
                }

            });
        }
    });

    return {
        nodes,
        edges,
    };
}

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
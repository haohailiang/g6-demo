
G6.registerLayout('bigraph-layout', {
    // 默认参数
    // getDefaultCfg: function getDefaultCfg() {
    //     return {
    //         center: [0, 0], // 布局的中心
    //         biSep: 100, // 两部分的间距
    //         nodeSep: 20, // 同一部分的节点间距
    //         nodeSize: 20, // 节点大小
    //         direction: 'horizontal', // 两部分的分布方向
    //     };
    // },
    execute() {
        const self = this;
        const { nodes } = self
        const step = 80
        // const step = 160
        let dis = 0
        nodes.forEach((node, i) => {
            node.x = i * 80
            node.y = i * 80
        })
    },
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    // layout: {
    //     type: 'bigraph-layout',
    //     biSep: 300,
    //     nodeSep: 20,
    //     // nodeSize: 20,
    //     nodeSize: 80,
    // },
    groupByTypes: false,
    layout: {
        type: 'comboForce',
        preventOverlap: true,
        nodeSpacing: 8,
        comboSpacing: 100,
        linkDistance: d => {
            // const { soleNodes } = this.props
            if (soleNodes.includes(d.target)) {
                const minDis = 100
                const labelLen = G6.Util.getTextSize(d.label, 14)[0]
                const padding = 28

                return minDis + labelLen + padding
            }

            return 60
        },
    },
    defaultNode: {
        size: 15,
        style: {
            lineWidth: 2,
            fill: defaultNodeBgColor,
        },
    },
    defaultCombo: {
        type: 'circle',
        style: {
            lineWidth: 1,
        },
        labelCfg: {
            style: {
                fontSize: 18,
            },
            refY: 25,
            position: 'bottom',
        },
    },
    defaultEdge: {
        size: 2,
        color: defaultEdgeColor,
        autoRotate: true,
        labelCfg: {
            autoRotate: true,
        },
    },
    modes: {
        default: [
            'drag-combo',
            {
                type: 'drag-node',
                shouldBegin(evt) {
                    if (evt.item && evt.item.getModel().comboId) {
                        return false
                    }
                    return true
                },
            },
            'drag-canvas',
            'zoom-canvas'
        ],
    },
    comboStateStyles: {
        hover: {
            lineWidth: 2,
            stroke: comboHoverColor,
        },
    },
    nodeStateStyles: {
        hover: {
            fill: nodeHoverBgColor,
        },
    },
});
graph.data(contactsGraphData)
graph.render()

graph.fitCenter()
setTimeout(() => {
    graph.fitView()
}, 600)
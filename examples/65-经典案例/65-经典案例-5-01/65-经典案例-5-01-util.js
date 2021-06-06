export const dataTransform = (data) => {
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

    /**
    :node
    {
        ...公共属性
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

        // 数据本身属性
        "id": "aaa",
        "label": "aaa",
        "attrs": [
            {
                "key": "id",
                "type": "number(6)"
            },
            {
                "key": "employeeId",
                "type": "number(6)",
                "relation": [
                    {
                        "key": "id",
                        "nodeId": "info"
                    }
                ]
            },
        ],
    },
     */

    // console.log('%c nodes===', 'color:#fff;background: red;font-size:18px;', nodes)
    // console.log('%c edges===', 'color:#fff;background: red;font-size:18px;', edges)

    return {
        nodes,
        edges,
    };
}

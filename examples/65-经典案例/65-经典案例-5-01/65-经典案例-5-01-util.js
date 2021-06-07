import rawData from './65-经典案例-5-01-data.js'

/**
 * 转化原始数据
 * @param {*} data 
 * @returns 
 */
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

    /**
    :edge 
    {
        "source": "aaa",
        "target": "employee",
        "sourceKey": "employeeId",
        "targetKey": "id"
    }
     */
    // console.log('%c nodes===', 'color:#fff;background: red;font-size:18px;', nodes)
    // console.log('%c edges===', 'color:#fff;background: red;font-size:18px;', JSON.stringify(edges))

    return {
        nodes,
        edges,
    };
}

/**
 * 获取与之相连的下级节点ID
 * @param {*} superiorNodeId 点击的当前的节点的ID[上级节点]
 * @param {*} superiorAttrIndex 点击的当前属性的索引[上级节点的索引]
 */
export const getJuniorNodeId = ({ superiorNodeId, superiorAttrIndex }) => {
    const { attrs: curAttrs } = rawData.find(node => node.id === superiorNodeId)
    const curKey = curAttrs[superiorAttrIndex].key

    const targetModel = rawData.find(node => {
        const { attrs } = node
        return attrs.find(attr => {
            const { relation: relations = [] } = attr
            return relations.find(relation => relation.key === curKey && relation.nodeId === superiorNodeId)
        })
    })

    if (targetModel) {
        const { id: juniorNodeId } = targetModel
        return juniorNodeId
    }

    return undefined
}

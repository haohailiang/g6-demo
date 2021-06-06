import data from './66-02-dagre节点分页-data.js'

export const curNodesToNewData = ({ curNewNodeIds, nodeMap, }, levels, initPos) => {
    const resData = { nodes: [], edges: [] };
    curNewNodeIds = [];
    let newNodeMap = {};
    levels.forEach((level) => {
        if (level.curNodes) {
            for (let i = 0; i < level.nodes.length; i++) {
                const node = level.nodes[i];
                if (i >= level.curBeginIdx && i < level.curEndIdx) {
                    if (!node.x || !node.y) {
                        node.x = initPos[0];
                        node.y = initPos[1];
                    }
                } else {
                    node.x = undefined;
                    node.y = undefined;
                }
            }
            resData.nodes = resData.nodes.concat(level.curNodes);
        } else {
            resData.nodes = resData.nodes.concat(level.nodes);
        }
    });
    resData.nodes.forEach((node) => {
        newNodeMap[node.id] = node;
        if (Object.keys(nodeMap).length !== 0 && !nodeMap[node.id]) {
            curNewNodeIds.push(node.id);
        }
    });

    data.edges.forEach((edge) => {
        if (newNodeMap[edge.source] && newNodeMap[edge.target]) {
            resData.edges.push(edge);
        }
    });
    nodeMap = newNodeMap;
    return { resData, curNewNodeIds };
};
function traverseTreeNodes(nodeData) {
    if (nodeData) {
        const { children = [] } = nodeData

        nodeData.label = nodeData.id
        nodeData.labelCfg = {
            offset: 10,
            position: nodeData.children && nodeData.children.length > 0 ? 'left' : 'right',
        }

        children.forEach(childNodeData => {
            traverseTreeNodes(childNodeData)
        })
    }
}
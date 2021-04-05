const { width: containerWidth, height: containerHeight } = document.querySelector('#container').getBoundingClientRect()
const containerCenterX = containerWidth / 2
const containerCenetrY = containerHeight / 2

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
        const { nodes, edges } = self
        const step = 80
        // const step = 160
        let dis = 0

        // 主体节点
        const subjectNode = nodes.find(node => node.layoutType === 'subject')
        subjectNode.x = containerCenterX
        subjectNode.y = containerCenetrY

        // 真实的边的客体节点
        const realEdgeRowFlags = []
        const realEdges = edges.filter(edge => edge.layoutType === 'realEdge')
        const realLabelPaddingLen = 2
        const maxRealEdgeLen = Math.max(
            realEdges.map(realEdge => {
                const realEdgeLabel = realEdge.label ?? ''
                const realEdgeLabelLen = realEdgeLabel.length + realLabelPaddingLen
                const realEdgeLabelSize = realEdgeLabelLen * realEdgeFontSize
                return realEdgeLabelSize
            })
        )
        // const maxRealEdgeLen = Math.max(
        //     realEdges.map(realEdge => G6.Util.getTextSize((realEdge.label ?? '') + '中古', realEdgeFontSize)[0])
        // )

        const realObjectNodes = nodes.filter(node => node.layoutType === 'realObject')

        realObjectNodes.forEach((node, i) => {
            node.x = containerCenterX - (maxRealEdgeLen + subjectRadius + realObjectRadius)
            node.y = containerCenetrY
        })

        // 计算当前半径能容纳多少个
    },
});
/**
 * 功能: 组织架构自定义边
 * 作者: 郝海亮
 * 日期: 2020-11-14
 */
function registerEdge() {
    G6.registerEdge('flow-line', {
        draw(cfg, group) {
            const { startPoint, endPoint, source } = cfg
            const { style } = cfg
            let shape

            const { id, children = [] } = source.getModel()
            if (id === 'virtual-root') {
                if (children.length > 1) {
                    shape = group.addShape('path', {
                        attrs: {
                            stroke: style.stroke,
                            endArrow: style.endArrow,
                            path: [
                                // ['M', startPoint.x, startPoint.y],
                                ['M', startPoint.x, (startPoint.y + endPoint.y) / 2],
                                ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                                ['L', endPoint.x, endPoint.y],
                            ],
                        },
                    })
                } else {
                    shape = group.addShape('path', {
                        attrs: {
                            stroke: style.stroke,
                            endArrow: style.endArrow,
                            path: [
                                // ['M', startPoint.x, startPoint.y],
                                // ['M', startPoint.x, (startPoint.y + endPoint.y) / 2],
                                // ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                                // ['L', endPoint.x, endPoint.y],
                            ],
                        },
                    })
                }
            } else {
                shape = group.addShape('path', {
                    attrs: {
                        stroke: style.stroke,
                        endArrow: style.endArrow,
                        path: [
                            ['M', startPoint.x, startPoint.y],
                            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                            ['L', endPoint.x, endPoint.y],
                        ],
                    },
                })
            }

            return shape
        },
    })
}
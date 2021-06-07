const {
    Util,
    // registerBehavior,
    registerEdge,
    // registerNode
} = G6;

registerEdge("dice-er-edge", {
    draw(cfg, group) {
        /**
        {
            // 公共的属性
            type: 'dice-er-edge',
            style: {
                stroke: '#e2e2e2',
                lineWidth: 4,
                endArrow: true,
            },
            
            // 自己的属性
            "source": "aaa",
            "target": "employee",
            "sourceKey": "employeeId",
            "targetKey": "id"
        }
         */
        
        // console.log('%c cfg===', 'color:#fff;background: red;font-size:18px;', cfg)
        // console.log('%c group===', 'color:#fff;background: red;font-size:18px;', group)
        const edge = group.cfg.item;
        const sourceNode = edge.getSource().getModel();
        const targetNode = edge.getTarget().getModel();

        // console.log('%c sourceNode===', 'color:#fff;background: red;font-size:18px;', sourceNode)
        // console.log('%c targetNode===', 'color:#fff;background: red;font-size:18px;', targetNode)

        // 获取前一个连接的索引值
        const sourceIndex = sourceNode.attrs.findIndex(
            (e) => e.key === cfg.sourceKey
        );

        // 在可视区域中的索引
        const sourceStartIndex = sourceNode.startIndex || 0;

        let sourceY = 15;

        if (!sourceNode.collapsed && sourceIndex > sourceStartIndex - 1) {
            // 相对高度,所以多半个
            sourceY = 30 + (sourceIndex - sourceStartIndex + 0.5) * 30;
            sourceY = Math.min(sourceY, 300);
        }

        const targetIndex = targetNode.attrs.findIndex(
            (e) => e.key === cfg.targetKey
        );

        const targetStartIndex = targetNode.startIndex || 0;

        let targetY = 15;

        if (!targetNode.collapsed && targetIndex > targetStartIndex - 1) {
            targetY = (targetIndex - targetStartIndex + 0.5) * 30 + 30;
            targetY = Math.min(targetY, 300);
        }

        // 起点
        const startPoint = {
            ...cfg.startPoint
        };
        // 终点
        const endPoint = {
            ...cfg.endPoint
        };

        startPoint.y = startPoint.y + sourceY;
        endPoint.y = endPoint.y + targetY;

        let shape;
        if (sourceNode.id !== targetNode.id) {
            shape = group.addShape("path", {
                attrs: {
                    stroke: "#5B8FF9",
                    path: [
                        ["M", startPoint.x, startPoint.y],
                        [
                            "C",
                            endPoint.x / 3 + (2 / 3) * startPoint.x,
                            startPoint.y,
                            endPoint.x / 3 + (2 / 3) * startPoint.x,
                            endPoint.y,
                            endPoint.x,
                            endPoint.y,
                        ],
                    ],
                    endArrow: true,
                },
                name: "path-shape",
            });
        } else if (!sourceNode.collapsed) {
            let gap = Math.abs((startPoint.y - endPoint.y) / 3);
            if (startPoint["index"] === 1) {
                gap = -gap;
            }
            shape = group.addShape("path", {
                attrs: {
                    stroke: "#5B8FF9",
                    path: [
                        ["M", startPoint.x, startPoint.y],
                        [
                            "C",
                            startPoint.x - gap,
                            startPoint.y,
                            startPoint.x - gap,
                            endPoint.y,
                            startPoint.x,
                            endPoint.y,
                        ],
                    ],
                    endArrow: true,
                },
                name: "path-shape",
            });
        }

        return shape;
    },
});
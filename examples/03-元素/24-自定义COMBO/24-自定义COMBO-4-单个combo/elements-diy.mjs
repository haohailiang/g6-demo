const padding = [50, 100, 150, 200];

export function registerCombo() {
    G6.registerCombo(
        "card-node",
        {
            get8Points(cfg) {
                console.log('cfg: ', cfg);
                const { comboCenterX, comboCenterY, comboPadding, comboWidth, comboHeight } = cfg;

                // const comboCenterX = 900;
                // const comboCenterY = 400;
                // const comboWidth = 600;
                // const comboHeight = 400;
                // // const padding = [50, 100, 150, 200];
                // const comboPadding = [0, 0, 0, 0];

                // const comboX = comboCenterX - comboWidth / 2;
                // const comboY = comboCenterY - comboHeight / 2;
                const innerWidth = comboWidth - comboPadding[1] - comboPadding[3];
                const innerHeight = comboHeight - comboPadding[0] - comboPadding[2];
                // const innerCenterX = comboX + comboPadding[3] + innerWidth / 2;
                // const innerCenterY = comboY + comboPadding[0] + innerHeight / 2;

                // const point1X = innerCenterX - innerWidth / 2;
                // const point1Y = innerCenterY - innerCenterY / 2;
                // const point2X = innerCenterX + innerWidth / 2;
                // const point2Y = innerCenterY - innerCenterY / 2;
                // const point3X = innerCenterX + innerWidth / 2;
                // const point3Y = innerCenterY + innerCenterY / 2;
                // const point4X = innerCenterX - innerWidth / 2;
                // const point4Y = innerCenterY + innerCenterY / 2;

                const outer1 = [0 - innerWidth / 2 - comboPadding[3], 0 - innerHeight / 2 - comboPadding[0]];
                const outer2 = [0 + innerWidth / 2 + comboPadding[1], 0 - innerHeight / 2 - comboPadding[0]];
                const outer3 = [0 + innerWidth / 2 + comboPadding[1], 0 + innerHeight / 2 + comboPadding[2]];
                const outer4 = [0 - innerWidth / 2 - comboPadding[3], 0 + innerHeight / 2 + comboPadding[2]];

                const inner1 = [0 - innerWidth / 2, 0 - innerHeight / 2];
                const inner2 = [0 + innerWidth / 2, 0 - innerHeight / 2];
                const inner3 = [0 + innerWidth / 2, 0 + innerHeight / 2];
                const inner4 = [0 - innerWidth / 2, 0 + innerHeight / 2];

                return {
                    outer1,
                    outer2,
                    outer3,
                    outer4,

                    inner1,
                    inner2,
                    inner3,
                    inner4,
                }

                // const nodeSize = 21;
                // const point5X = point4X + nodeSize / 2 + 10;
                // const point5Y = point4Y - nodeSize / 2 - 10;

                // if (nodes.length > 0) {
                //     const nodeSize = nodes[0].size;
                //     const minX = Math.min(...nodes.map(node => node.x));
                //     const minY = Math.min(...nodes.map(node => node.y));
                //     const maxX = Math.max(...nodes.map(node => node.x));
                //     const maxY = Math.max(...nodes.map(node => node.y));
                //     const padding = [50, 100, 150, 200];
                //     const innerWidth = maxX - minX + nodeSize;
                //     const innerHeight = maxY - minY + nodeSize;
                //     const containerW =
                //         maxX - minX + padding[1] + padding[3] + nodeSize;
                //     const containerH =
                //         maxY - minY + padding[0] + padding[2] + nodeSize;
    
                //     const baseX = -innerWidth / 2 - padding[3];
                //     const baseY = -innerHeight / 2 - padding[0];
    
                //     // 画外边的矩形
                //     let point1 = [baseX, baseY];
                //     let point2 = [baseX + containerW, baseY];
                //     let point3 = [baseX + containerW, baseY + containerH];
                //     let point4 = [baseX, baseY + containerH];
    
                //     // 画内部矩形的区域
                //     let point5 = [baseX + padding[3], baseY + padding[0]];
                //     let point6 = [
                //         baseX + containerW - padding[1],
                //         baseY + padding[0]
                //     ];
                //     let point7 = [
                //         baseX + containerW - padding[1],
                //         baseY + containerH - padding[2]
                //     ];
                //     let point8 = [
                //         baseX + padding[3],
                //         baseY + containerH - padding[2]
                //     ];
    
                //     return {
                //         point1,
                //         point2,
                //         point3,
                //         point4,
                //         point5,
                //         point6,
                //         point7,
                //         point8,
                //     };
                // }

                // return {
                //     point1: [-200, -200],
                //     point2: [200, -200],
                //     point3: [200, 200],
                //     point4: [-200, 200],
                //     point5: [-100, -100],
                //     point6: [100, -100],
                //     point7: [100, 100],
                //     point8: [-100, 100],
                // };
            },
            drawRect(cfg, group) {
                const { outer1, outer2, outer3, outer4, inner1, inner2, inner3, inner4 } = this.get8Points(cfg);

                const keyShape = group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...outer1],
                            ["L", ...outer2],
                            ["L", ...outer3],
                            ["L", ...outer4],
                            ["Z"]
                        ],
                        // fill: "rgba(255, 0, 0, 0)",
                        capture: false,
                        stroke: "rgba(255, 0, 0, 1)",
                        lineWidth: 1
                    },
                    name: "outer-rect-shape"
                });

                group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...inner1],
                            ["L", ...inner2],
                            ["L", ...inner3],
                            ["L", ...inner4],
                            ["Z"]
                        ],
                        // fill: "rgba(0, 0, 0, 0.5)",
                        stroke: "rgba(255, 0, 0, 1)",
                        capture: false,
                        lineWidth: 1
                    },
                    name: "inner-rect-shape"
                });

                return keyShape;
            },
            drawShape(cfg, group) {
                return this.drawRect(cfg, group);
            },
            /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg Combo 的配置项
     * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
     */
            afterDraw(cfg, group) {
                // console.log("afterDraw: ");
                // debugger
            },
            /**
     * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Combo} combo 节点
     */
            afterUpdate(cfg, combo) {
            },
        },
        "rect"
    );
}

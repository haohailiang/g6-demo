export function registerCombo() {
    G6.registerCombo(
        "cRect",
        {
            drawShape: function drawShape(cfg, group) {
                const self = this;
                // 获取配置中的 Combo 内边距
                cfg.padding = cfg.padding || [50, 20, 20, 20];
                // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
                const style = self.getShapeStyle(cfg);
                // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
                const rect = group.addShape("rect", {
                    attrs: {
                        ...style,
                        x: -style.height / 2 - padding[0],
                        y: -style.width / 2 - padding[3],
                        width: style.width,
                        height: style.height
                    },
                    draggable: true,
                    name: "combo-keyShape" // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                });
                // 增加右侧圆
                group.addShape("circle", {
                    attrs: {
                        ...style,
                        fill: "#fff",
                        opacity: 1,
                        // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                        x: cfg.style.width / 2 + cfg.padding[1],
                        y: (cfg.padding[2] - cfg.padding[0]) / 2,
                        r: 5
                    },
                    draggable: true,
                    name: "combo-circle-shape" // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                });
                return rect;
            }, // 定义新增的右侧圆的位置更新逻辑
            afterUpdate: function afterUpdate(cfg, combo) {
                const group = combo.get("group");
                // 在该 Combo 的图形分组根据 name 找到右侧圆图形
                const circle = group.find(
                    ele => ele.get("name") === "combo-circle-shape"
                );
                // 更新右侧圆位置
                circle.attr({
                    // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                    x: cfg.style.width / 2 + cfg.padding[1],
                    y: (cfg.padding[2] - cfg.padding[0]) / 2
                });
            }
        },
        "rect"
    );

    G6.registerCombo(
        "card-node",
        {
            get8Points(cfg) {
                const { nodes = [] } = cfg;
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

                return {
                    point1: [-200, -200],
                    point2: [200, -200],
                    point3: [200, 200],
                    point4: [-200, 200],
                    point5: [-100, -100],
                    point6: [100, -100],
                    point7: [100, 100],
                    point8: [-100, 100],
                };
            },
            drawRect(cfg, group) {
                const { point1, point2, point3, point4, point5, point6, point7, point8 } = this.get8Points(cfg);

                const keyShape = group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...point1],
                            ["L", ...point2],
                            ["L", ...point3],
                            ["L", ...point4],
                            ["Z"]
                        ],
                        fill: "rgba(255, 0, 0, 0)",
                        capture: true,
                        stroke: "rgba(255, 0, 0, 1)",
                        lineWidth: 1
                    },
                    name: "rect-shape"
                });

                group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...point5],
                            ["L", ...point6],
                            ["L", ...point7],
                            ["L", ...point8],
                            ["Z"]
                        ],
                        fill: "rgba(0, 0, 0, 0.5)",
                        capture: true,
                        lineWidth: 1
                    },
                    name: "inner-rect-shape"
                });

                return keyShape;
            },
            drawTrapezium(cfg, group) {
                const containerW = 400;
                const containerH = 200;
                const baseX = -containerW / 2;
                const baseY = -containerH / 2;

                // 容器
                // const keyShape = group.addShape('rect', {
                //     attrs: {
                //         x: baseX,
                //         y: baseY,
                //         width: containerW,
                //         height: containerH,
                //         fill: 'rgba(0, 0, 0, 0.1)',
                //     },
                //     name: 'key-shape',
                //     // capture: true,
                //     draggable: true,
                // });

                // 画梯形
                let trapeziumTopLeftPointPosition = [
                    baseX + containerW / 4,
                    baseY
                ];
                let trapeziumTopRightPointPosition = [
                    baseX + containerW * 3 / 4,
                    baseY
                ];
                let trapeziumBottomRightPointPosition = [
                    baseX + containerW,
                    baseY + containerH
                ];
                let trapeziumBottomLeftPointPosition = [
                    baseX,
                    baseY + containerH
                ];
                const keyShape = group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...trapeziumTopLeftPointPosition],
                            ["L", ...trapeziumTopRightPointPosition],
                            ["L", ...trapeziumBottomRightPointPosition],
                            ["L", ...trapeziumBottomLeftPointPosition],
                            ["Z"]
                        ],
                        fill: "rgba(0, 0, 0, 0.5)",
                        lineWidth: 1
                    },
                    name: "trapezium-shape"
                });

                return keyShape;
            },
            drawShape(cfg, group) {
                return this.drawRect(cfg, group);
                // return this.drawTrapezium(cfg, group);
            },
            /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg Combo 的配置项
     * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
     */
            afterDraw(cfg, group) {
                console.log("afterDraw: ");
                // debugger
            },
            /**
     * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Combo} combo 节点
     */
            afterUpdate(cfg, combo) {
                console.log('cfg.label: ', cfg.label);
                const { combos, nodes } = combo.getChildren();
                const childrenSize = [...combos, ...nodes].map(child => child.getBBox());
                const minX = Math.min(...childrenSize.map(item => item.minX));
                const maxX = Math.max(...childrenSize.map(item => item.maxX));
                const minY = Math.min(...childrenSize.map(item => item.minY));
                const maxY = Math.max(...childrenSize.map(item => item.maxY));
                const padding = [50, 100, 150, 200];
                const minWidth = 200;
                const minHeight = 200;
                const innerWidth = Math.max(maxX - minX, minWidth);
                const innerHeight = Math.max(maxY - minY, minHeight);
                const containerW = innerWidth + padding[1] + padding[3];
                const containerH = innerHeight + padding[0] + padding[2];
                const baseX = - innerWidth / 2 - padding[3];
                const baseY = - innerHeight / 2 - padding[0];

                // 画外边的矩形
                let point1 = [baseX, baseY];
                let point2 = [baseX + containerW, baseY];
                let point3 = [baseX + containerW, baseY + containerH];
                let point4 = [baseX, baseY + containerH];

                // 画内部矩形的区域
                let point5 = [baseX + padding[3], baseY + padding[0]];
                let point6 = [
                    baseX + containerW - padding[1],
                    baseY + padding[0]
                ];
                let point7 = [
                    baseX + containerW - padding[1],
                    baseY + containerH - padding[2]
                ];
                let point8 = [
                    baseX + padding[3],
                    baseY + containerH - padding[2]
                ];

                const group = combo.get("group");
                const keyShape = group.find(
                    ele => ele.get("name") === "rect-shape"
                );
                const innerRectShape = group.find(
                    ele => ele.get("name") === "inner-rect-shape"
                );
                // // 更新右侧圆位置
                keyShape.attr({
                    path: [
                        ["M", ...point1],
                        ["L", ...point2],
                        ["L", ...point3],
                        ["L", ...point4],
                        ["Z"]
                    ]
                });

                innerRectShape.attr({
                    path: [
                        ["M", ...point5],
                        ["L", ...point6],
                        ["L", ...point7],
                        ["L", ...point8],
                        ["Z"]
                    ]
                });
            },
            afterUpdate2(cfg, combo) {
                const { point1, point2, point3, point4, point5, point6, point7, point8 } = this.get8Points(cfg);
                const group = combo.get("group");
                // // 在该 Combo 的图形分组根据 name 找到右侧圆图形
                const keyShape = group.find(
                    ele => ele.get("name") === "rect-shape"
                );
                const innerRectShape = group.find(
                    ele => ele.get("name") === "inner-rect-shape"
                );
                // // 更新右侧圆位置
                keyShape.attr({
                    // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                    // x: cfg.style.width / 2 + cfg.padding[1],
                    // y: (cfg.padding[2] - cfg.padding[0]) / 2
                    path: [
                        ["M", ...point1],
                        ["L", ...point2],
                        ["L", ...point3],
                        ["L", ...point4],
                        ["Z"]
                    ]
                });

                innerRectShape.attr({
                    // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                    // x: cfg.style.width / 2 + cfg.padding[1],
                    // y: (cfg.padding[2] - cfg.padding[0]) / 2
                    path: [
                        ["M", ...point5],
                        ["L", ...point6],
                        ["L", ...point7],
                        ["L", ...point8],
                        ["Z"]
                    ]
                });
            }
        },
        "rect"
    );

    G6.registerNode(
        "card-node",
        {
            drawShape: (cfg, group) => {
                console.log("cfg: ", cfg);
                console.log("group: ", group);
                const containerW = 400;
                const containerH = 200;
                const baseX = -containerW / 2;
                const baseY = -containerH / 2;

                // 容器
                const keyShape = group.addShape("rect", {
                    attrs: {
                        x: baseX,
                        y: baseY,
                        width: containerW,
                        height: containerH,
                        fill: "rgba(0, 0, 0, 0.1)"
                    },
                    name: "key-shape",
                    // capture: true,
                    draggable: true
                });

                group.addShape("rect", {
                    attrs: {
                        x: baseX + 20,
                        y: baseY + 20,
                        width: containerW / 4,
                        height: containerH / 4,
                        fill: "rgba(255, 255, 255, 0.5)"
                    },
                    name: "child-shape",
                    // capture: true,
                    draggable: true
                });

                return keyShape;
            }
        },
        "rect"
    );

    //
}

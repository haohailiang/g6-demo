const {
    // Util,
    // registerBehavior,
    // registerEdge,
    registerNode
} = G6;

const itemHeight = 30;

registerNode("dice-er-box", {
    draw(cfg, group) {
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

        const nodeWidth = 250;
        const nodeHeight = 316;
        const itemCount = 10;
        const boxStyle = {
            stroke: "#096DD9",
            // stroke: "#ff0000",
            radius: 4,
        };

        const {
            attrs = [],
            startIndex = 0, // 开始索引
            selectedIndex, // 被选中的索引
            collapsed, // 默认是展开的
        } = cfg;
        const attrList = attrs;
        const inViewList = attrList.slice(
            Math.floor(startIndex),
            Math.floor(startIndex + itemCount - 1)
        ); // 视野当中的条目
        const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30; // 45

        // 顶部标题 - 背景框
        group.addShape("rect", {
            attrs: {
                fill: boxStyle.stroke,
                height: 30,
                width: nodeWidth,
                radius: [boxStyle.radius, boxStyle.radius, 0, 0],
            },
            draggable: true,
        });

        const titlePaddingLeft = 12;

        // 顶部标题 - 文字
        group.addShape("text", {
            attrs: {
                y: 22,
                x: titlePaddingLeft,
                fill: "#fff",
                text: cfg.label,
                fontSize: 12,
                fontWeight: 500,
            },
        });

        // 底部折叠展开框 - 背景
        group.addShape("rect", {
            attrs: {
                x: 0,
                y: collapsed ? 30 : 300, // 内容高度300
                height: 15,
                width: nodeWidth,
                fill: "#eee",
                radius: [0, 0, boxStyle.radius, boxStyle.radius],
                cursor: "pointer",
            },
            name: collapsed ? "expand" : "collapse",
        });

        // 底部折叠展开框 - 文本
        group.addShape("text", {
            attrs: {
                x: nodeWidth / 2 - 6,
                y: (collapsed ? 30 : 300) + 12,
                text: collapsed ? "+" : "-",
                width: nodeWidth,
                fill: "#000",
                radius: [0, 0, boxStyle.radius, boxStyle.radius],
                cursor: "pointer",
            },
            name: collapsed ? "expand" : "collapse",
        });

        // keyshape
        const keyshape = group.addShape("rect", {
            attrs: {
                x: 0,
                y: 0,
                width: nodeWidth,
                height: collapsed ? 45 : nodeHeight,
                ...boxStyle,
            },
            draggable: true,
        });

        if (collapsed) {
            return keyshape;
        }

        // 向分组中添加新的分组
        const listContainer = group.addGroup({});
        // listContainer.setClip({
        //     type: "rect",
        //     attrs: {
        //         x: -8,
        //         y: 30,
        //         width: nodeWidth + 16,
        //         height: 300 - 30,
        //         // fill: '#f00',
        //     },
        // });
        // item背景容器大小
        listContainer.addShape({
            type: "rect",
            attrs: {
                x: 1,
                y: 30,
                width: nodeWidth - 2,
                height: 300 - 30,
                fill: "#fff",
            },
            draggable: true,
        });

        if (attrList.length > itemCount) {
            const barStyle = {
                width: 4,
                padding: 0,
                boxStyle: {
                    stroke: "#00000022",
                },
                innerStyle: {
                    fill: "#00000022",
                },
            };

            // 滑轨
            listContainer.addShape("rect", {
                attrs: {
                    y: 30,
                    x: nodeWidth - barStyle.padding - barStyle.width,
                    width: barStyle.width,
                    height: nodeHeight - 30,
                    ...barStyle.boxStyle,
                },
            });

            // 滚动条长度和位置
            const indexHeight =
                inViewList.length > itemCount ?
                    (inViewList.length / attrList.length) * nodeHeight :
                    10;

                    // console.log('%c startIndex===', 'color:#fff;background: red;font-size:18px;', startIndex)
            listContainer.addShape("rect", {
                attrs: {
                    y: 30 +
                        barStyle.padding +
                        (startIndex / attrList.length) * (nodeHeight - 30),
                    x: nodeWidth - barStyle.padding - barStyle.width,
                    width: barStyle.width,
                    height: Math.min(nodeHeight, indexHeight),
                    ...barStyle.innerStyle,
                },
            });
        }
        if (inViewList) {
            inViewList.forEach((e, i) => {
                const isSelected =
                    Math.floor(startIndex) + i === Number(selectedIndex);
                let {
                    key = "", type
                } = e;
                if (type) {
                    key += " - " + type;
                }
                const label = key.length > 26 ? key.slice(0, 24) + "..." : key;

                // listContainer.addShape("rect", {
                //     attrs: {
                //         x: 1,
                //         y: i * itemHeight - itemHeight / 2 + offsetY,
                //         width: nodeWidth - 4,
                //         height: itemHeight,
                //         radius: 2,
                //         lineWidth: 1,
                //         cursor: "pointer",
                //     },
                //     name: `item-${Math.floor(startIndex) + i}-content`,
                //     draggable: true,
                // });

                if (!cfg.hideDot) {
                    // 左侧的小圆圈
                    listContainer.addShape("circle", {
                        attrs: {
                            x: 0,
                            y: i * itemHeight + offsetY,
                            r: 3,
                            stroke: boxStyle.stroke,
                            fill: "white",
                            // radius: 2,
                            lineWidth: 1,
                            cursor: "pointer",
                        },
                    });
                    // 右侧的小圆圈
                    listContainer.addShape("circle", {
                        attrs: {
                            x: nodeWidth,
                            y: i * itemHeight + offsetY,
                            r: 3,
                            stroke: boxStyle.stroke,
                            fill: "white",
                            radius: 2,
                            lineWidth: 1,
                            cursor: "pointer",
                        },
                    });
                }

                listContainer.addShape("text", {
                    attrs: {
                        x: 12,
                        y: i * itemHeight + offsetY + 6,
                        text: label,
                        fontSize: 12,
                        fill: "#000",
                        fontFamily: "Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                        fontWeight: isSelected ? 500 : 100,
                        cursor: "pointer",
                    },
                    name: `item-${Math.floor(startIndex) + i}`,
                });
            });
        }



        return keyshape;
    },
    getAnchorPoints() {
        return [
            [0, 0],
            [1, 0],
        ];
    },
});
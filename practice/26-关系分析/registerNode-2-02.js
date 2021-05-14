// 注册新的节点类型
// 升级计算类型

const yardPointRadius = 100 // 最外层小院的半径
const statPointRadius = 20 // 统计节点半径
const kidPointRadius = 10 // 小娃娃节点半径
const yardPadding = 5 // 小院padding
const centerDistance = yardPointRadius - yardPadding - kidPointRadius // kid节点距离中心的距离

G6.registerNode(
    'pointsGroupType',
    {
        drawShape: function drawShape(cfg, group) {
            const {
                children = []
            } = cfg
            cfg.size = yardPointRadius * 2
            // 容器
            const keyShape = group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: yardPointRadius,
                    fill: '#ffffff',
                    stroke: '#000000',
                    lineWidth: 1,
                    cursor: 'pointer',
                },
                name: 'yard',
                // capture: true,
                draggable: true,
            })

            const maxShowNum = 6
            const statNums = children.length > maxShowNum ? children.length - maxShowNum : 0
            const showNodeDatas = children.slice(0, maxShowNum)
            const showNodeLens = showNodeDatas.length
            // const unitRad = 360 / showNodeLens * 2 * Math.PI / 360 // 原始计算公式
            // Math.cos(30 * 2 * Math.PI / 360)
            const unitRad = 2 * Math.PI / showNodeLens // 单位弧度是多少

            // 循环添加周围的子节点
            showNodeDatas.forEach((showItem, showInex) => {
                const x1 = centerDistance * Math.cos(unitRad * showInex)
                const y1 = centerDistance * Math.sin(unitRad * showInex)

                // 坐标顺时针旋转90°, x轴保持不变,y轴取反就是真实的坐标
                // (x1, y1) -> (-y1, x1) -> (-y1, -x1)
                const x2 = -y1
                const y2 = -x1

                group.addShape('circle', {
                    attrs: {
                        x: x2,
                        y: y2,
                        r: kidPointRadius,
                        fill: '#000000',
                        cursor: 'pointer',
                    },
                    name: 'kid',
                    capture: true,
                    draggable: true,
                })

                const textY = y2 + kidPointRadius + 4
                group.addShape('text', {
                    attrs: {
                        x: x2,
                        y: textY,
                        text: showItem.label,
                        fill: '#000000',
                        textAlign: 'center',
                        textBaseline: 'top',
                        fontSize: 14,
                        cursor: 'pointer',
                    },
                    name: 'kid-label',
                })
            })


            if (statNums > 0) {
                group.addShape('circle', {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: statPointRadius,
                        fill: '#000000',
                        cursor: 'pointer',
                    },
                    name: 'stat-point',
                    capture: true,
                    draggable: true,
                })

                const statText = statNums > 99 ? '99+' : statNums
                group.addShape('text', {
                    attrs: {
                        x: 0,
                        y: 0,
                        text: statText,
                        fill: '#ffffff',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        fontSize: 16,
                        cursor: 'pointer',
                    },
                    name: 'stat-label',
                })
            }

            // 背景遮挡
            // let maskHeight = portraitRadius
            // if (cfg.name && cfg.position) {
            //     maskHeight = nodeHeight
            // } else if (cfg.name) {
            //     maskHeight = nodeHeight - 14
            // }
            // group.addShape('rect', {
            //     attrs: {
            //         x: 0,
            //         y: 0,
            //         width: nodeWidth,
            //         height: maskHeight,
            //         fill: outerBoxBgColor,
            //     },
            //     name: 'mask-box',
            //     // draggable: true,
            // })

            return keyShape
        },
        setState(name, value, item) {
            const group = item.get('group')
            const keyShape = item.getKeyShape()

            if (name == 'highlight') {
                const yard = group.find(ele => ele.get('name') === 'yard')
                // const kids = group.find(ele => ele.get('name') === 'kid')
                const kids = group.findAllByName('kid')
                // const kidLabel = group.find(ele => ele.get('name') === 'kid-label')
                const kidLabels = group.findAllByName('kid-label')
                const statPoint = group.find(ele => ele.get('name') === 'stat-point')
                // const statLabel = group.find(ele => ele.get('name') === 'stat-label')
                const initColor = '#000000'
                const highlightColor = '#ff0000'

                if (value) {
                    yard.attr('stroke', highlightColor)
                    kids.forEach(kidItem => {
                        kidItem.attr('fill', highlightColor)
                    })
                    kidLabels.forEach(kidLabel => {
                        kidLabel.attr('fill', highlightColor)
                    })
                    // kidLabel.attr('fill', highlightColor)
                    statPoint.attr('fill', highlightColor)
                } else {
                    yard.attr('stroke', initColor)
                    kids.forEach(kidItem => {
                        kidItem.attr('fill', initColor)
                    })
                    kidLabels.forEach(kidLabel => {
                        kidLabel.attr('fill', initColor)
                    })
                    // kidLabel.attr('fill', initColor)
                    statPoint.attr('fill', initColor)
                }
            }
        }
    }
)
// 注册新的节点类型

const yardPointRadius = 100 // 最外层小院的半径
const statPointRadius = 20 // 统计节点半径
const kidPointRadius = 10 // 小娃娃节点半径
const yardPadding = 5 // 小院padding
const centerDistance = yardPointRadius - yardPadding - kidPointRadius // kid节点距离中心的距离

/**
 * 创建kid节点
 * @param x x坐标
 * @param y y坐标
 * @param label 标签
 * @param childName 节点name
 */
function createKidNode({ x, y, label, childName, group }) {
    group.addShape('circle', {
        attrs: {
            x,
            y,
            r: kidPointRadius,
            fill: '#000000',
            cursor: 'pointer',
        },
        name: childName,
        capture: true,
        draggable: true,
    })
    // TODO label
}
G6.registerNode(
    'pointsGroupType',
    {
        drawShape: function drawShape(cfg, group) {
            const {
                children = []
            } = cfg
            // 容器
            const maxShowNum = 6
            const statNums = children.length > maxShowNum ? children.length - maxShowNum : 0
            const showNodeDatas = children.slice(0, maxShowNum)

            const keyShape = group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: yardPointRadius,
                    stroke: '#000000',
                    lineWidth: 1,
                    cursor: 'pointer',
                },
                name: 'yard',
                capture: true,
                draggable: true,
            })

            // 第0个节点
            createKidNode({
                x: 0,
                y: -centerDistance,
                label: showNodeDatas[0].label,
                childName: 'child-0',
                group,
            })

            if (children.length === 2) {
                // 第1个节点
                createKidNode({
                    x: 0,
                    y: centerDistance,
                    label: showNodeDatas[1].label,
                    childName: 'child-1',
                    group,
                })
            }

            if (children.length === 3) {
                // 第1个节点
                createKidNode({
                    x: centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[1].label,
                    childName: 'child-1',
                    group,
                })

                // 第2个节点
                createKidNode({
                    x: -centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[2].label,
                    childName: 'child-2',
                    group,
                })
            }

            if (children.length === 4) {
                // 第1个节点
                createKidNode({
                    x: centerDistance,
                    y: 0,
                    label: showNodeDatas[1].label,
                    childName: 'child-1',
                    group,
                })

                // 第2个节点
                createKidNode({
                    x: 0,
                    y: centerDistance,
                    label: showNodeDatas[2].label,
                    childName: 'child-2',
                    group,
                })

                // 第3个节点
                createKidNode({
                    x: -centerDistance,
                    y: 0,
                    label: showNodeDatas[3].label,
                    childName: 'child-3',
                    group,
                })
            }

            if (children.length === 5) {
                // 第1个节点
                createKidNode({
                    x: centerDistance * Math.cos(18 * 2 * Math.PI / 360),
                    y: -centerDistance * Math.sin(18 * 2 * Math.PI / 360),
                    label: showNodeDatas[1].label,
                    childName: 'child-1',
                    group,
                })

                // 第2个节点
                createKidNode({
                    x: centerDistance * Math.cos(54 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(54 * 2 * Math.PI / 360),
                    label: showNodeDatas[2].label,
                    childName: 'child-2',
                    group,
                })

                // 第3个节点
                createKidNode({
                    x: -centerDistance * Math.cos(54 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(54 * 2 * Math.PI / 360),
                    label: showNodeDatas[3].label,
                    childName: 'child-3',
                    group,
                })

                // 第4个节点
                createKidNode({
                    x: -centerDistance * Math.cos(18 * 2 * Math.PI / 360),
                    y: -centerDistance * Math.sin(18 * 2 * Math.PI / 360),
                    label: showNodeDatas[4].label,
                    childName: 'child-4',
                    group,
                })
            }

            if (children.length >= 6) {
                // 第1个节点
                createKidNode({
                    x: centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: -centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[1].label,
                    childName: 'child-1',
                    group,
                })

                // 第2个节点
                createKidNode({
                    x: centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[2].label,
                    childName: 'child-2',
                    group,
                })

                // 第3个节点
                createKidNode({
                    x: 0,
                    y: centerDistance,
                    label: showNodeDatas[3].label,
                    childName: 'child-3',
                    group,
                })

                // 第4个节点
                createKidNode({
                    x: -centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[4].label,
                    childName: 'child-4',
                    group,
                })

                // 第5个节点
                createKidNode({
                    x: -centerDistance * Math.cos(30 * 2 * Math.PI / 360),
                    y: -centerDistance * Math.sin(30 * 2 * Math.PI / 360),
                    label: showNodeDatas[5].label,
                    childName: 'child-5',
                    group,
                })
            }

            if (statNums > 0) {
                group.addShape('circle', {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: statPointRadius,
                        fill: '#000000',
                        cursor: 'pointer',
                    },
                    name: 'center-point',
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
                    },
                    name: 'text-shape',
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
        // setState(name, value, item) {
        //     const group = item.get('group')
        //     const keyShape = item.getKeyShape()
        //     if (name == 'error') {
        //         // return item.attr('fill') === 'red'; // 找到首个填充为红色的图形
        //         const outerBox = group.find(ele => ele.get('name') === 'outer-box')
        //         const marker = group.find(ele => ele.get('name') === 'add-sub-node')
        //         if (value) {
        //             outerBox.attr('stroke', errorColor)
        //             marker.attr('stroke', errorColor)
        //         } else {
        //             outerBox.attr('stroke', outerBoxBorderColor)
        //             marker.attr('stroke', addNodeColor)
        //         }
        //     } else if (name == 'active') {
        //         // do something
        //     }
        // }
    }
)
/**
 * 功能: 组织架构自定义节点 - 普通节点
 * 作者: 郝海亮
 * 日期: 2020-11-14
 */

/**
  * 获取文本的显示样式
  * @param circleWidth 容器宽度
  * @param fontSize 字体大小
  * @param text 文本内容
  * @return 要显示的文本
  */
function getShowText(text) {
    let showText = text

    if (text.length > 6) {
        showText = `${text.substr(0, 5)}...`
    }
    return showText
}

/**
 * 定义普通节点
 */
function registerNode() {
    G6.registerNode(
        'card-node',
        {
            drawShape: function drawShape(cfg, group) {
                // 容器
                const shape = group.addShape('rect', {
                    attrs: {
                        x: baseX,
                        y: baseY,
                        width: nodeWidth,
                        height: nodeHeight,
                        // fill: outerBoxBgColor,
                        // fill: '#ff0000',
                    },
                    name: 'outer-box',
                    draggable: true,
                })

                if (cfg.id === 'virtual-root') {
                    return shape
                }

                // 背景遮挡
                let maskHeight = portraitRadius
                if (cfg.name && cfg.position) {
                    maskHeight = nodeHeight
                } else if (cfg.name) {
                    maskHeight = nodeHeight - 14
                }
                group.addShape('rect', {
                    attrs: {
                        x: baseX,
                        y: baseY,
                        width: nodeWidth,
                        height: maskHeight,
                        fill: outerBoxBgColor,
                    },
                    name: 'mask-box',
                    // draggable: true,
                })

                const portraitBgColor = cfg.statNums ? statBgColor : (cfg.backColor || headPortraitBoxBgColor)
                // 头像底部的圆框
                group.addShape('circle', {
                    attrs: {
                        x: 0,
                        y: baseY + portraitY,
                        r: portraitRadius,
                        fill: portraitBgColor,
                        cursor: 'pointer',
                    },
                    name: 'head-portrait-box',
                })

                if (cfg.isShowIcon) {
                    // 图标
                    group.addShape('image', {
                        attrs: {
                            x: baseX + portraitIconX,
                            y: baseY + portraitIconY,
                            width: portraitIconRadius * 2,
                            height: portraitIconRadius * 2,
                            img: cfg.icon,
                            cursor: 'pointer',
                        },
                        name: 'head-portrait',
                    })
                }

                if (cfg.isShowImage) {
                    // 裁剪头像
                    group.addShape('image', {
                        attrs: {
                            x: baseX + portraitImageX,
                            y: baseY + portraitImageY,
                            width: portraitImageRadius * 2,
                            height: portraitImageRadius * 2,
                            img: cfg.img,
                            cursor: 'pointer',
                        },
                        name: 'head-portrait',
                    })
                        .setClip({
                            type: 'circle',
                            attrs: {
                                x: baseX + portraitX,
                                y: baseY + portraitY,
                                r: portraitRadius,
                            }
                        })
                }

                if (cfg.statNums) {
                    group.addShape('text', {
                        attrs: {
                            x: baseX + statX,
                            y: baseY + statY,
                            textBaseline: 'middle',
                            textAlign: 'center',
                            text: cfg.statNums,
                            fill: statColor,
                            fontSize: statFontSize,
                            cursor: 'pointer',
                        },
                        name: 'stat-nums',
                    })
                }

                if (cfg.name) {
                    // 名称
                    const showName = getShowText(cfg?.name ?? '')
                    group.addShape('text', {
                        attrs: {
                            x: 0,
                            y: baseY + nameY,
                            textBaseline: 'middle',
                            textAlign: 'center',
                            text: showName,
                            fill: nameColor,
                            fontSize: nameFontSize,
                            cursor: 'pointer',
                        },
                        name: 'main-title',
                    })
                }

                if (cfg.position) {
                    // 职位
                    const showPosition = getShowText(cfg?.position ?? '')
                    group.addShape('text', {
                        attrs: {
                            x: 0,
                            y: baseY + positionY,
                            textBaseline: 'middle',
                            textAlign: 'center',
                            text: showPosition,
                            fill: positionColor,
                            fontSize: positionFontSize,
                            opacity: 0.65,
                            cursor: 'pointer',
                        },
                        name: 'subtitle',
                    })
                }

                const childrenNums = cfg?.children?.length ?? 0
                if (cfg.isShowCollapse && childrenNums) {
                    // 背景圆圈
                    group.addShape('marker', {
                        attrs: {
                            x: baseX + markPlusX,
                            y: baseY + markPlusY,
                            r: markPlusRadius,
                            stroke: markCircleColor,
                            fill: markCircleBgColor,
                            lineWidth: markPlusLineWidth,
                            cursor: 'pointer',
                            symbol(x, y, r) {
                                return createCircleMarker(x, y + r, r)
                            },
                        },
                        name: 'mark-plus',
                    })

                    group.addShape('marker', {
                        attrs: {
                            x: baseX + markPlusX,
                            y: baseY + markPlusY,
                            r: markPlusRadius,
                            stroke: markPlusColor,
                            fill: markPlusBgColor,
                            lineWidth: markPlusLineWidth,
                            cursor: 'pointer',
                            symbol(x, y, r) {
                                if (cfg.isCollapse) {
                                    return createPlusOnly(x, y + r, r)
                                }
                                return createMinusOnly(x, y + r, r)
                            },
                        },
                        name: 'mark-plus',
                    })
                }

                return shape
            }
        }
    )
}
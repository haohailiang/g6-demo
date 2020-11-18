let graph
let scrollLeft
let prevParentLeftCanvasX
let prevParentLeftCanvasY
// let graphWidth
/**
 * 隐藏根节点及相关的边
 */
const hideRootNode = () => {
    graph.zoomTo(1.0)

    const rootId = data.id
    const rootNode = graph.findById(rootId)
    rootNode.hide()

    graph.getEdges()
        .filter(v => v.getModel().source === rootId)
        .map(v => v.hide())
}

/**
 * 获取节点真实的最大宽度
 * @param model
 * @returns 节点最大宽度
 */
const getNodeMaxWidth = (model) => {
    const { name, position } = model
    const showName = getShowText(name ?? '')
    const showPosition = getShowText(position ?? '')
    const showNameWidth = G6.Util.getTextSize(showName, nameFontSize)[0]
    const showPositionWidth = G6.Util.getTextSize(showPosition, positionFontSize)[0]
    const nodeMaxWidth = Math.max(nodeWidth, showNameWidth, showPositionWidth)
    return nodeMaxWidth
}


/**
 * 获取图谱的宽高
 */
const getGraphSize = () => {
    const organNodes = [] // 倒序 - 子元素正序
    const personNodes = [] // 倒序

    G6.Util.traverseTree(data, function (item) {
        if (item.entityGroup === 'organ') {
            organNodes.push(item)
        } else if (item.entityGroup === 'person') {
            personNodes.push(item)
        }
        return true
    })

    const curZoom = graph.getZoom()
    const organNums = organNodes.length
    const personNums = personNodes.length
    let graphWidth = 0
    let graphHeight = 0

    // 图像的宽
    const nodesBoundary = [...organNodes, ...personNodes].map(nodeItem => {
        const model = graph.findById(nodeItem.id).getModel()
        const { x: clientX } = graph.getClientByPoint(model.x, model.y)
        const halfRealWidth = getNodeMaxWidth(model) * curZoom / 2
        const leftX = clientX - halfRealWidth
        const rightX = clientX + halfRealWidth

        return {
            leftX,
            rightX,
        }
    })
    const graphMaxClientX = Math.max(...nodesBoundary.map(boundaryItem => boundaryItem.rightX))
    const graphMinClientX = Math.min(...nodesBoundary.map(boundaryItem => boundaryItem.leftX))

    graphWidth = graphMaxClientX - graphMinClientX

    // 图像的高
    if (personNums > 0) {
        graphHeight = nodeHeight * 2 + vGap * 1.5

        if (data.children.length === 1) {
            graphHeight = nodeHeight * 2 + vGap
        }
    } else if (organNums > 0) {
        graphHeight = nodeHeight + vGap * 0.5

        if (data.children.length === 1) {
            graphHeight = nodeHeight
        }
    }

    graphHeight *= curZoom

    return { graphWidth, graphHeight }
}

/**
 * 移动图谱
 */
const moveGraph = () => {
    const { graphWidth, graphHeight } = getGraphSize()

    const { width: containerWidth, height: containerHeight } = document.getElementById('container').getBoundingClientRect();

    let moveX = 0
    let moveY = (containerHeight - graphHeight) / 2
    if (containerWidth > graphWidth) {
        moveX = (containerWidth - graphWidth) / 2
    } else {
        moveX = nodeWidth / 2
    }
    // 统一隐藏节点的高
    moveY = moveY - nodeHeight - vGap * 0.5
    if (data.children.length === 1) {
        moveY -= vGap * 0.5
    }

    // console.log('%c moveX===', 'color:#fff;background: red;', moveX)
    // console.log('%c moveY===', 'color:#fff;background: red;', moveY)
    graph.moveTo(moveX, moveY)
}

/**
 * 获取节点精确的moveX
 * @param nodeId 节点ID
 * @return moveX
 */
const getFixedMoveX = nodeId => {
    const model = graph.findById(nodeId).getModel()
    const { x: modelX, y: modelY } = model
    const nodeMaxWidth = getNodeMaxWidth(model)
    const redundantWidth = (nodeMaxWidth - nodeWidth) / 2
    const canvasLeft = graph.getCanvasByPoint(modelX, modelY).x
    const curZoom = graph.getZoom()

    return canvasLeft - redundantWidth * curZoom
}

/**
 * 获取当前图谱的位移
 */
const getGraphMove = () => {
    const organNodes = [] // 倒序 - 子元素正序
    const personNodes = [] // 倒序

    G6.Util.traverseTree(data, function (item) {
        if (item.entityGroup === 'organ') {
            organNodes.push(item)
        } else if (item.entityGroup === 'person') {
            personNodes.push(item)
        }
        return true
    })

    let organNums = organNodes.length
    let personNums = personNodes.length
    const { id: firstParentId } = organNodes[organNums - 1]
    const firstParentMoveX = getFixedMoveX(firstParentId)
    const rootParentModel = graph.findById('virtual-root').getModel()
    const curZoom = graph.getZoom()
    let { x: rootMoveX, y: rootMoveY } = graph.getCanvasByPoint(rootParentModel.x, rootParentModel.y)
    let minMoveX = firstParentMoveX

    if (personNums > 0) {
        const { id: firstChildId } = personNodes[personNums - 1]
        const firstChildMoveX = getFixedMoveX(firstChildId)
        minMoveX = Math.min(firstParentMoveX, firstChildMoveX)
    }

    return { moveX: minMoveX - nodeWidth * curZoom / 2, moveY: rootMoveY - nodeHeight * curZoom / 2 }
}

function renderGraph() {
    registerNode()
    registerEdge()
    const { width, height } = document.getElementById('container').getBoundingClientRect();
    graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        linkCenter: true,
        animate: false,
        // maxZoom: 1,
        modes: {
            default: [
                'drag-canvas',
                'zoom-canvas',
            ],
        },
        defaultNode: {
            type: 'card-node',
        },
        defaultEdge: {
            type: 'flow-line',
            style: {
                stroke: defaultEdgeColor,
            },
        },
        layout: registerLayout(),
    });

    graph.data(data);
    graph.render();

    // 图谱移动位置
    moveGraph()
}

function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)

renderGraph()
window.addEventListener('resize', function () {
    const { width: containerWidth, height: containerHeight } = document.getElementById('container').getBoundingClientRect();
    graph.changeSize(containerWidth, containerHeight)
}, false)

/**
 * 切换组织model下的人员
 * @param model 组织model
 */
const toggleCollapseChild = model => {
    // const { data } = this.props
    const modelShadow = model
    const curZoom = graph.getZoom()
    const { isCollapse, realChildren, realId: parentRealId, } = modelShadow
    modelShadow.isCollapse = !modelShadow.isCollapse

    const { x: preCanvasX, y: prevCanvasY } = graph.getCanvasByPoint(modelShadow.x, modelShadow.y)

    if (isCollapse) {
        modelShadow.children = realChildren
    } else {
        let showRelatedPersons = realChildren
        const isMoreData = realChildren.length > maxShowNums

        if (isMoreData) {
            const statNums = realChildren.length - maxShowNums + 1
            const statNode = {
                id: `${parentRealId}-stat`,
                statNums: `+${statNums}`,
                entityGroup: 'stat',
            }
            showRelatedPersons = showRelatedPersons.slice(0, maxShowNums - 1)
            showRelatedPersons = [...showRelatedPersons, statNode]
        }
        modelShadow.children = showRelatedPersons
    }
    const nowData = graph.save()
    graph.changeData(nowData)
    graph.zoom(curZoom)
    const newPostionParentModel = graph.findById(modelShadow.id).getModel()
    const { x: nowCanvasX, y: nowCanvasY } = graph.getCanvasByPoint(newPostionParentModel.x, newPostionParentModel.y)
    const diffCanvasX = nowCanvasX - preCanvasX
    const diffCanvasY = nowCanvasY - prevCanvasY

    graph.translate(-diffCanvasX, -diffCanvasY)
}

// graph.on('node:click', evt => {
//     const item = evt.item
//     const tareget = evt.target
//     const model = evt.item.getModel()
// })

graph.on('node:click', evt => {
    const model = evt.item.getModel()
    console.log('%c model===', 'color:#fff;background: red;', model)
    const optType = evt.target.get('name')
    console.log('%c name===', 'color:#fff;background: red;', optType)
    if (model.entityGroup === 'stat') {
        const realParentId = model.id.replace('-stat', '')
        const parentId = `virtual-root-${realParentId}`
        const parentNode = graph.findById(parentId)
        const parentModel = parentNode.getModel()

        toggleCollapseChild(parentModel)
    } else if (optType === 'mark-plus') {
        toggleCollapseChild(model)
    } else {
        return
        window.parent.postMessage({
            operateType: 'gotoPage',
            targetModule: 'subject',
            data: {
                id: model.realId,
            },
            openNew: true,
            targetTitle: `subject-${model.realId}`
        }, '*')

        const { sendLog } = this.props
        let opId
        if (model.entityGroup === 'organ') {
            opId = 451
        }
        if (model.entityGroup === 'person') {
            opId = 469
        }

        sendLog({
            opId,
            content: model.realId
        })
    }
})

/**
 * 向左移动或向右移动
 * @param flag left | right
 */
const moveLeftOrRight = (flag = 'left') => {
    const curZoom = graph.getZoom()
    const containerWidth = document.querySelector('#container').getBoundingClientRect().width
    const maxMoveDistance = containerWidth - nodeWidth * curZoom
    const { graphWidth } = getGraphSize()
    const { moveX: curMoveX, moveY: curMoveY } = getGraphMove()
    const minMoveRange = - (graphWidth + nodeWidth * curZoom / 2 - containerWidth)
    const maxMoveRange = nodeWidth * curZoom / 2

    let canMoveDistance
    if (flag === 'left') {
        canMoveDistance = Math.min(curMoveX + maxMoveDistance, maxMoveRange)
    } else {
        canMoveDistance = Math.max(curMoveX - maxMoveDistance, minMoveRange)
    }

    const coords = { x: curMoveX }
    const tween = new TWEEN.Tween(coords)
        .to({ x: canMoveDistance }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            console.log('%c 123===', 'color:#fff;background: red;')
            // graph.moveTo(coords.x, coords.y)
            graph.moveTo(coords.x, curMoveY)
        })
        .start() // Start the tween immediately.
    // graph.moveTo(canMoveDistance, curMoveY)
}

document.querySelector('#left').addEventListener('click', function () {
    moveLeftOrRight()
}, false)

document.querySelector('#right').addEventListener('click', function () {
    moveLeftOrRight('right')
}, false)

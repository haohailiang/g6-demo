let graph
let scrollLeft
let prevParentLeftCanvasX
let prevParentLeftCanvasY
/**
 * 隐藏根节点及相关的边
 */
const hideRootNode = () => {
    // const { data } = this.props
    graph.zoomTo(1.0)

    const rootId = data.id
    const rootNode = graph.findById(rootId)
    rootNode.hide()

    graph.getEdges()
        .filter(v => v.getModel().source === rootId)
        .map(v => v.hide())

    /* if (data.children.length === 1) {
        const rootId = data.id
        const rootNode = graph.findById(rootId)
        rootNode.hide()

        graph.getEdges()
            .filter(v => v.getModel().source === rootId)
            .map(v => v.hide())
        graph.paint()
        graph.fitCenter()
    } else if (data.children.length > 1) {
        this.scrollLeft = nodeWidth
        graph.moveTo(nodeWidth, offsetY)
    } */

    // scrollLeft = nodeWidth / 2
    // graph.moveTo(nodeWidth, offsetY)
    // graph.moveTo(scrollLeft, 50)
}

/**
 * 移动图谱
 */
const moveGraph = () => {
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

    let graphWidth = 0
    let graphHeight = 0
    let organNums = organNodes.length
    let personNums = personNodes.length

    if (personNums > 0) {
        const { id: firstParentId } = organNodes[organNums - 1]
        const { id: lastParentId, children: lastParentChildren } = organNodes[0]
        const { id: firstChildId } = personNodes[personNums - 1]
        const { id: lastChildId } = personNodes[0]
        const firstParentModel = graph.findById(firstParentId).getModel()
        const firstChildModel = graph.findById(firstChildId).getModel()
        const { x: firstParentClientX } = graph.getClientByPoint(firstParentModel.x, firstParentModel.y)
        const { x: firstChildClientX } = graph.getClientByPoint(firstChildModel.x, firstChildModel.y)
        const graphMinClientX = Math.min(firstParentClientX, firstChildClientX)

        const lastParentModel = graph.findById(lastParentId).getModel()
        let lastParentLastChildModel
        if (lastParentChildren.length > 0) {
            const { id: lastParentLastChildId } = lastParentChildren[lastParentChildren.length - 1]
            lastParentLastChildModel = graph.findById(lastParentLastChildId).getModel()
        }

        let graphMaxClientX = -Infinity
        if (lastParentLastChildModel) {
            graphMaxClientX = graph.getClientByPoint(lastParentLastChildModel.x, lastParentLastChildModel.y).x
        } else {
            graphMaxClientX = graph.getClientByPoint(lastParentModel.x, lastParentModel.y).x
        }
        graphWidth = graphMaxClientX - graphMinClientX + nodeWidth
        graphHeight = nodeHeight * 2 + vGap * 1.5

        if (data.children.length === 1) {
            graphHeight = nodeHeight * 2 + vGap
        }
    } else if (organNums > 0) {
        const { id: firstParentId } = organNodes[organNums - 1]
        const { id: lastParentId } = organNodes[0]
        const firstParentModel = graph.findById(firstParentId).getModel()
        const lastParentModel = graph.findById(lastParentId).getModel()
        const graphMinClientX = graph.getClientByPoint(firstParentModel.x, firstParentModel.y).x
        const graphMaxClientX = graph.getClientByPoint(lastParentModel.x, lastParentModel.y).x
        graphWidth = graphMaxClientX - graphMinClientX + nodeWidth
        graphHeight = nodeHeight + vGap * 0.5

        if (data.children.length === 1) {
            graphHeight = nodeHeight
        }
    }

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

    console.log('%c moveX===', 'color:#fff;background: red;', moveX)
    console.log('%c moveY===', 'color:#fff;background: red;', moveY)
    graph.moveTo(moveX, moveY)
}

/**
 * 获取节点精确的moveX
 * @param nodeId 节点ID
 * @return moveX
 */
const getFixedMoveX = nodeId => {
    const { name = '', position = '', x: modelX, y: modelY } = graph.findById(nodeId).getModel()
    const showName = getShowText(name ?? '')
    const showPosition = getShowText(position ?? '')
    const showNameWidth = G6.Util.getTextSize(showName, nameFontSize)[0]
    const showPositionWidth = G6.Util.getTextSize(showPosition, positionFontSize)[0]
    const nodeMaxWidth = Math.max(nodeWidth, showNameWidth, showPositionWidth)
    const redundantWidth = (nodeMaxWidth - nodeWidth) / 2
    const canvasLeft = graph.getCanvasByPoint(modelX, modelY).x

    return canvasLeft - redundantWidth
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
    let { x: rootMoveX, y: rootMoveY } = graph.getCanvasByPoint(rootParentModel.x, rootParentModel.y)
    let minMoveX = firstParentMoveX

    if (personNums > 0) {
        const { id: firstChildId } = personNodes[personNums - 1]
        const firstChildMoveX = getFixedMoveX(firstChildId)
        minMoveX = Math.min(firstParentMoveX, firstChildMoveX)
    }

    return { moveX: minMoveX, moveY: rootMoveY }
}

function renderGraph() {
    registerNode()
    registerEdge()
    // const width = document.getElementById('container').scrollWidth;
    // const height = document.getElementById('container').scrollHeight || 500;
    const { width, height } = document.getElementById('container').getBoundingClientRect();
    graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        linkCenter: true,
        animate: false,
        maxZoom: 1,
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

    // if (data.children.length === 1) {
    //     hideRootNode()
    // }

    // 图谱移动位置
    moveGraph()
}

renderGraph()
// let pevWidth
window.addEventListener('resize', function () {
    graph.destroy()
    renderGraph()
    // const { width, height } = document.getElementById('container').getBoundingClientRect();
    // // const height = document.getElementById('container').scrollHeight || 500;
    // console.log('%c width===', 'color:#fff;background: red;', width)
    // graph.changeSize(width, height)
    // graph.layout()
    // graph.fitCenter()
    // graph.fitView()
    // graph.render()
}, false)

/**
 * 隐藏根节点及相关的边
 */
/**
const hideRootNode = () => {
    const ratio = 1.0
    graph.zoomTo(ratio);

    if (data.children.length === 1) {
        // const { data } = this.props
        const rootId = data.id
        const rootNode = graph.findById(rootId)
        rootNode.hide()

        graph.getEdges()
            .filter(v => v.getModel().source === rootId)
            .map(v => v.hide())
        graph.paint()
        graph.fitCenter()
    } else if (data.children.length > 1) {
        const hideHeight = nodeHeight + vGap * 0.5
        const graphHeight = nodeHeight * 2 + vGap * 1.5
        // console.log('%c graphHeight===', 'color:#fff;background: red;', graphHeight)
        const { width, height } = document.getElementById('container').getBoundingClientRect();
        // const offsetY = (height - graphHeight) / 2 - hideHeight
        graph.moveTo(nodeWidth, offsetY)

    }
}
*/

/**
 * 切换组织model下的人员
 * @param model 组织model
 */
const toggleCollapseChild = model => {
    // const { data } = this.props
    const modelShadow = model
    const { isCollapse, realChildren, realId: parentRealId, } = modelShadow
    modelShadow.isCollapse = !modelShadow.isCollapse

    const { x: preCanvasX, y: prevCanvasY } = graph.getCanvasByPoint(modelShadow.x, modelShadow.y)
    // const { moveX: preMoveX, moveY: preMoveY } = getGraphMove()
    // prevParentLeftCanvasX = canvasX
    // prevParentLeftCanvasY = canvasY

    console.log('%c isCollapse===', 'color:#fff;background: red;', isCollapse)

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
    const newPostionParentModel = graph.findById(modelShadow.id).getModel()
    const { x: nowCanvasX, y: nowCanvasY } = graph.getCanvasByPoint(newPostionParentModel.x, newPostionParentModel.y)
    // moveGraph()
    const diffCanvasX = nowCanvasX - preCanvasX
    const diffCanvasY = nowCanvasY - prevCanvasY
    const { moveX: curMoveX, moveY: curMoveY } = getGraphMove()

    // console.log('%c diffCanvasX===', 'color:#fff;background: red;', diffCanvasX)
    // console.log('%c diffCanvasY===', 'color:#fff;background: red;', diffCanvasY)

    console.log('%c curMoveX===', 'color:#fff;background: red;', curMoveX)
    console.log('%c curMoveY===', 'color:#fff;background: red;', curMoveY)

    graph.moveTo(curMoveX - diffCanvasX, curMoveY - diffCanvasY)
}

graph.on('node:click', evt => {
    const item = evt.item
    const tareget = evt.target
    console.log('%c item===', 'color:#fff;background: red;', item)
    console.log('%c tareget===', 'color:#fff;background: red;', tareget)
    // console.log('%c evt===', 'color:#fff;background: red;', evt)
    const model = evt.item.getModel()
    // console.log('%c model===', 'color:#fff;background: red;', model)
})

Í
graph.on('node:click', evt => {
    const model = evt.item.getModel()
    const { target: { cfg: { name: optType } } } = evt
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
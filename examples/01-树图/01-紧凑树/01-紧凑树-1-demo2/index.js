let graph
let scrollLeft
/**
 * 隐藏根节点及相关的边
 */
const hideRootNode = () => {
    // const { data } = this.props
    // graph.zoomTo(1.0)
    graph.zoomTo(1.0)

    const rootId = data.id
    const rootNode = graph.findById(rootId)
    rootNode.hide()

    graph.getEdges()
        .filter(v => v.getModel().source === rootId)
        .map(v => v.hide())

    /* if (data.children.length === 1) {
        const rootId = data.id
        const rootNode = this.graph.findById(rootId)
        rootNode.hide()

        this.graph.getEdges()
            .filter(v => v.getModel().source === rootId)
            .map(v => v.hide())
        this.graph.paint()
        this.graph.fitCenter()
    } else if (data.children.length > 1) {
        this.scrollLeft = nodeWidth
        this.graph.moveTo(nodeWidth, offsetY)
    } */

    // scrollLeft = nodeWidth / 2
    // this.graph.moveTo(nodeWidth, offsetY)
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

    graph.moveTo(moveX, moveY)
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
        const { width, height } = document.getElementById('container').getBoundingClientRect();
        // const offsetY = (height - graphHeight) / 2 - hideHeight
        graph.moveTo(nodeWidth, offsetY)

    }
}
*/

// hideRootNode()

graph.on('node:click', evt => {
    const model = evt.item.getModel()
})
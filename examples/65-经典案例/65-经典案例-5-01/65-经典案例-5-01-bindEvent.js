import { getJuniorNodeId } from './65-经典案例-5-01-util.js'

const animate = (time) => {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}

// 移动下级节点到上级节点 | 移动下级节点到自己原始的位置
// const movePoint2Superior = (graph, relatedNodeId) => {
const movePoint2Superior = ({ graph, superiorNodeId, juniorNodeId }) => {
    requestAnimationFrame(animate)

    const juniorNodeModel = graph.findById(juniorNodeId).get('model')
    console.log('%c juniorNodeModel===', 'color:#fff;background: red;font-size:18px;', juniorNodeModel)
    const { x: sourceX, y: sourceY, animateInfo: { x: initialX = sourceX, y: initialY = sourceY, collapse = false} = {} } = juniorNodeModel
    const { x: superiorTargetX, y: superiorTargetY } = graph.findById(superiorNodeId).get('model')

    let targetX
    let targetY
    if (collapse) {
        targetX = initialX
        targetY = initialY
        juniorNodeModel.animateInfo.collapse = false
    } else {
        targetX = superiorTargetX
        targetY = superiorTargetY
        juniorNodeModel.animateInfo = { x: sourceX, y: sourceY, collapse: true, }
    }

    new TWEEN
        .Tween({ x: sourceX, y: sourceY })
        .to({ x: targetX, y: targetY }, 1000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function (object) {
            // const model = targetNode.get('model')
            // model.fx = object.x
            // model.fy = object.y
            graph.updateItem(
                juniorNodeId,
                {
                    x: object.x,
                    y: object.y,
                    style: {
                        opacity: 1 - (object.x - sourceX) / (targetX - sourceX),
                    },
                })
        })
        .onComplete(function () {
            console.log('onComplete')
        })
        .start()
}


const bindEvent = graph => {
    graph.on('node:click', evt => {
        const item = evt.item // 被操作的节点 item
        const model = item.get('model')
        const shape = evt.target
        const circleInfo = shape.get('circleInfo')

        // console.log('%c model===', 'color:#fff;background: red;font-size:18px;', model)
        // console.log('%c circleInfo===', 'color:#fff;background: red;font-size:18px;', circleInfo)

        if (circleInfo) {
            const superiorNodeId = model.id
            const superiorAttrIndex = circleInfo.index
            const juniorNodeId = getJuniorNodeId({
                superiorNodeId,
                superiorAttrIndex,
            })

            if (juniorNodeId) {
                movePoint2Superior({ graph, superiorNodeId, juniorNodeId })
            }
        }
    })
}

export default bindEvent
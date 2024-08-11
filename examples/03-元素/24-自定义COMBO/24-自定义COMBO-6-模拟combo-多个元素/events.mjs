import * as store from './store.mjs';

export default bindEvents;

function  bindEvents(graph) {
    graph.on("node:click", e => {
        const model = e.item.getModel();
        console.log("node1: ", model);
        // if (e.target.get('name') === 'combo-marker-shape') {
        //     // graph.collapseExpandCombo(e.item.getModel().id);
        //     graph.collapseExpandCombo(e.item);
        //     if (graph.get('layout')) graph.layout();
        //     else graph.refreshPositions();
        // }
    });

    let area = Object.create(null);
    let comboModel = {};
    graph.on('node:dragstart', e=> {
        area = recordDragNodesArea(e);

        const nodeItem = e.item;
        const { groupId } = nodeItem.getModel();
        const comboItem = graph.findById(groupId);
        comboModel = _.cloneDeep(comboItem.getModel());
    });
    graph.on('node:drag', e=> {
        const nodeItem = e.item;
        const { groupId } = nodeItem.getModel();

        // 只有一个元素时
        const nodeItems = graph.getNodes().map(node => node.getModel().groupId === groupId);
        const comboItem = graph.findById(groupId);
        if (nodeItems.length === 1) {
            const { x: comboCenterX, y: comboCenterY, comboWidth, comboHeight, comboPadding } = comboItem.getModel();
            const { centerX: nodeCenterX, centerY: nodeCenterY, width: nodeWidth, height: nodeHeight } = nodeItem.getBBox();
            const nodePoint1 = [nodeCenterX - nodeWidth / 2, nodeCenterY - nodeHeight / 2];
            const nodePoint2 = [nodeCenterX + nodeWidth / 2, nodeCenterY - nodeHeight / 2];
            const nodePoint3 = [nodeCenterX + nodeWidth / 2, nodeCenterY + nodeHeight / 2];
            const nodePoint4 = [nodeCenterX - nodeWidth / 2, nodeCenterY + nodeHeight / 2];
            
            const startX = comboCenterX - comboWidth / 2;
            const startY = comboCenterY - comboHeight / 2;
            const comboPoint1 = [startX + comboPadding[3], startY + comboPadding[0]];
            const comboPoint2 = [startX + comboWidth - comboPadding[1], startY + comboPadding[0]];
            const comboPoint3 = [startX + comboWidth - comboPadding[1], startY + comboHeight - comboPadding[2]];
            const comboPoint4 = [startX + comboPadding[3], startY + comboHeight - comboPadding[2]];
    
            let diffX = 0;
            if (nodePoint1[0] < comboPoint1[0]) {
                diffX = nodePoint1[0] - comboPoint1[0];
            } else if (nodePoint2[0] > comboPoint2[0]) {
                diffX = nodePoint2[0] - comboPoint2[0];
            }
    
            let diffY = 0;
            if (nodePoint1[1] < comboPoint1[1]) {
                diffY = nodePoint1[1] - comboPoint1[1];
            } else if (nodePoint4[1] > comboPoint4[1]) {
                diffY = nodePoint4[1] - comboPoint4[1];
            }
    
            comboItem.updatePosition({ x: comboCenterX + diffX, y: comboCenterY + diffY });
        } else {
            const curArea = recordDragNodesArea(e);
            const { point1X: pPoint1X, point2X: pPoint2X, point3X: pPoint3X, point4X: pPoint4X, point1Y: pPoint1Y, point2Y: pPoint2Y, point3Y: pPoint3Y, point4Y: Ppoint4Y } = area;
            const { point1X: cPoint1X, point2X: cPoint2X, point3X: cPoint3X, point4X: cPoint4X, point1Y: cPoint1Y, point2Y: cPoint2Y, point3Y: cPoint3Y, point4Y: cPoint4Y } = curArea;

            const pWidth = pPoint2X - pPoint1X;
            const cWidth = cPoint2X - cPoint1X;
            
            let diffX = 0;
            let widthDiff = 0;
            if (cWidth > pWidth) {
                if (cPoint1X < pPoint1X) {
                    diffX = cPoint1X - pPoint1X;
                    widthDiff = pPoint1X - cPoint1X;
                } else if (cPoint2X > pPoint2X) {
                    diffX = cPoint2X - pPoint2X;
                    widthDiff = cPoint2X - pPoint2X;
                } else {
                    throw new Error('不可能1')
                }
            } else if (cWidth < pWidth) {
                if (cWidth > store.minComboWidth) {
                    if (cPoint1X > pPoint1X) {
                        diffX = cPoint1X - pPoint1X;
                        widthDiff = pPoint1X - cPoint1X;
                    } else if (cPoint2X < pPoint2X) {
                        diffX = cPoint2X - pPoint2X;
                        widthDiff = cPoint2X - pPoint2X;
                    } else {
                        throw new Error('不可能3')
                    }
                } else {
                    console.log('相等3')
                }
            } else {
                console.log('相等1')
            }

            const pHeight = Ppoint4Y - pPoint1Y;
            const cHeight = cPoint4Y - cPoint1Y;

            let diffY = 0;
            let heightDiff = 0;
            if (cHeight > pHeight) {
                if (cPoint1Y < pPoint1Y) {
                    diffY = cPoint1Y - pPoint1Y;
                    heightDiff = pPoint1Y - cPoint1Y;
                } else if (cPoint4Y > Ppoint4Y) {
                    diffY = cPoint4Y - Ppoint4Y;
                    heightDiff = cPoint4Y - Ppoint4Y;
                } else {
                    throw new Error('不可能2')
                }
            } else if (cHeight < pHeight) {
                if (cHeight > store.minComboHeight) {
                    if (cPoint1Y > pPoint1Y) {
                        diffY = cPoint1Y - pPoint1Y;
                        heightDiff = pPoint1Y - cPoint1Y;
                    } else if (cPoint4Y < Ppoint4Y) {
                        diffY = cPoint4Y - Ppoint4Y;
                        heightDiff = cPoint4Y - Ppoint4Y;
                    } else {
                        throw new Error('不可能4')
                    }
                } else {
                    console.log('相等4')
                }
            } else {
                console.log('相等2')
            }

            comboItem.update({
                x: comboModel.x + diffX / 2,
                y: comboModel.y + diffY / 2,
                comboWidth: comboModel.comboWidth + widthDiff,
                comboHeight: comboModel.comboHeight + heightDiff,
                style: {},
            });
            // area = curArea;
        }
    });

}

/**
 * 记录拖拽之前同级node的区域大小
 * @param e 拖动节点的e
 */
function recordDragNodesArea(e) {
    let area = Object.create(null);
    const nodeItem = e.item;
    const { groupId } = nodeItem.getModel();
    const nodeItems = graph.getNodes().filter(node => node.getModel()?.groupId === groupId);
    let point1X = Infinity;
    let point2X = - Infinity;
    let point3X = - Infinity;
    let point4X = Infinity;
    let point1Y = Infinity;
    let point2Y = Infinity;
    let point3Y = - Infinity;
    let point4Y = - Infinity;
    nodeItems.forEach(nodeItem => {
        const { centerX: nodeCenterX, centerY: nodeCenterY, width: nodeWidth, height: nodeHeight } = nodeItem.getBBox();
        point1X = Math.min(point1X, nodeCenterX - nodeWidth / 2);
        point2X = Math.max(point2X, nodeCenterX + nodeWidth / 2);
        point3X = Math.max(point3X, nodeCenterX + nodeWidth / 2);
        point4X = Math.min(point4X, nodeCenterX - nodeWidth / 2);

        point1Y = Math.min(point1Y, nodeCenterY - nodeHeight / 2);
        point2Y = Math.min(point2Y, nodeCenterY - nodeHeight / 2);
        point3Y = Math.max(point3Y, nodeCenterY + nodeHeight / 2);
        point4Y = Math.max(point4Y, nodeCenterY + nodeHeight / 2);
    });
    area.point1X = point1X;
    area.point2X = point2X;
    area.point3X = point3X;
    area.point4X = point4X;
    area.point1Y = point1Y;
    area.point2Y = point2Y;
    area.point3Y = point3Y;
    area.point4Y = point4Y;
    return area;
}

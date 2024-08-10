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

    graph.on('node:drag', e=> {
        const nodeItem = e.item;
        const { groupId } = nodeItem.getModel();
        const comboItem = graph.findById(groupId);
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
    });

}

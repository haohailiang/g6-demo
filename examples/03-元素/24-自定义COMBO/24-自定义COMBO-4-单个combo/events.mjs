export default bindEvents;

function  bindEvents(graph) {
    // collapse/expand when click the marker
    graph.on("combo:click", e => {
        const model = e.item.getModel();
        console.log("model: ", model);
        // if (e.target.get('name') === 'combo-marker-shape') {
        //     // graph.collapseExpandCombo(e.item.getModel().id);
        //     graph.collapseExpandCombo(e.item);
        //     if (graph.get('layout')) graph.layout();
        //     else graph.refreshPositions();
        // }
    });

    graph.on("node:click", e => {
        const model = e.item.getModel();
        console.log("node: ", model);
        // if (e.target.get('name') === 'combo-marker-shape') {
        //     // graph.collapseExpandCombo(e.item.getModel().id);
        //     graph.collapseExpandCombo(e.item);
        //     if (graph.get('layout')) graph.layout();
        //     else graph.refreshPositions();
        // }
    });

    let nodePosition = {};
    let combosPosition = [];
    let nodesPosition = [];
    graph.on('node:dragstart', e=> {
        const model = e.item.getModel();
        nodePosition.x = model.x;
        nodePosition.y = model.y;
        const {combos, nodes} = graph.save();
        combosPosition = combos.map(combo => ({ id: combo.id, x: combo.x, y: combo.y }));
        nodesPosition = nodes.filter(node => node.id !== model.id).map(node => ({ id: node.id, x: node.x, y: node.y }));
    });
    graph.on("node:drag", e => {
        const model = e.item.getModel();
        const diffX = model.x - nodePosition.x;
        const diffY = model.y - nodePosition.y;
        console.log("node: ", model);
        const { combos: parentCombos, nodes: parentNodes } = graph.findById(model.comboId).getChildren();
        if (parentCombos.length === 0 && parentNodes.length === 1) {
            // const {combos, nodes} = graph.save();

            // combosPosition.forEach(combo => {
            //     const comboItem = graph.findById(combo.id);
            //     comboItem.updatePosition({
            //         x: combo.x + diffX,
            //         y: combo.y + diffY,
            //     })
            // })
            // nodesPosition.forEach(node => {
            //     const nodeItem = graph.findById(node.id);
            //     nodeItem.updatePosition({
            //         x: node.x + diffX,
            //         y: node.y + diffY,
            //     })
            // })
        } else {
            graph.findById(model.comboId).getBBox();
        }
        // graph.findById('node-3').updatePosition({
        //     x: 0,
        //     y: 0
        // })
        // graph.findById('combo-3').updatePosition({
        //     x: 0,
        //     y: 0
        // })
        // graph.paint();
        // if (e.target.get('name') === 'combo-marker-shape') {
        //     // graph.collapseExpandCombo(e.item.getModel().id);
        //     graph.collapseExpandCombo(e.item);
        //     if (graph.get('layout')) graph.layout();
        //     else graph.refreshPositions();
        // }
    });
}

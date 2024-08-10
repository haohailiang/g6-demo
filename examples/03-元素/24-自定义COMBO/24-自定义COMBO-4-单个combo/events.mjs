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

    graph.on('canvas:click', e=> {
        console.log(e.x, e.y)
    });

}

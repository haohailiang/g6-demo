import bindEvents from "./events.mjs";
import { registerCombo } from "./elements-diy.mjs";
import { getData } from "./data.mjs";
import CustomComboLayout from "./layout-diy/layout-diy.mjs";

registerCombo();
const graph = renderGraph();
window.graph = graph;
bindEvents(graph);

function renderGraph() {
    const width = document.getElementById("container").scrollWidth;
    const height =
        (document.getElementById("container").scrollHeight || 500);
    const graph = new G6.Graph({
        container: "container",
        width,
        height,
        fitCenter: false,
        fitView: false,
        // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
        groupByTypes: false,
        // Configure the combos globally
        modes: {
            default: [
                {
                    type: 'drag-combo',
                    onlyChangeComboSize: true,
                },
                {
                    type: 'drag-node',
                    onlyChangeComboSize: true,
                },
                "drag-canvas",
                "zoom-canvas"
            ]
        },
        defaultNode: {
            // type: "rect",
            type: "circle",
            // size: [100, 100],
            // size: 100,
            // labelCfg: {
            //     style: {
            //         fontSize: 6
            //     }
            // }
        }
    });
    const data = getData();
    console.log('nodes: ', data.nodes);
    graph.data(data);
    graph.render();

    // const comboConfig = {
    //     type: 'haha'
    // }
    // graph.addCombo(comboConfig, new CustomComboLayout());

    return graph;
}

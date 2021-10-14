import elements from './50-Minimap-3-big-data-grid-elements.js'
import style from './50-Minimap-3-big-data-grid-style.js'
import layout from './50-Minimap-3-big-data-grid-layout.js'
import g6Options from './50-Minimap-3-big-data-grid-options.js'
import { bindEvent } from './50-Minimap-3-big-data-grid-bindEvent.js'

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    layout,
    ...style,
    ...g6Options,
});
graph.data(elements);
graph.render();

window['debugGraph'] = graph

bindEvent(graph)

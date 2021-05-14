function getFunc(
    func,
    value,
    defaultValue
) {
    let resultFunc;
    if (func) {
        resultFunc = func;
    } else if (isNumber(value)) {
        resultFunc = () => value;
    } else {
        resultFunc = () => defaultValue;
    }
    return resultFunc;
}

const isNumber = (val) => typeof val === 'number'

G6.registerLayout('my-dagre', {
    // 默认参数
    getDefaultCfg: function getDefaultCfg() {
        return {
            rankdir: "TB", // layout 方向, 可选 TB, BT, LR, RL
            align: undefined, // 节点对齐方式，可选 UL, UR, DL, DR
            nodeSize: undefined, // 节点大小
            nodesepFunc: undefined, // 节点水平间距(px)
            ranksepFunc: undefined, // 每一层节点之间间距
            nodesep: 50, // 节点水平间距(px)
            ranksep: 50, // 每一层节点之间间距
            controlPoints: false, // 是否保留布局连线的控制点
        };
    },
    execute(reloadData) {
        const self = {
            ...this.getDefaultCfg(),
            ...this,
        };
        
        // const self = this;
        const { nodes, nodeSize, rankdir, combos } = self;
        if (!nodes) return;
        const edges = (self.edges) || [];
        const g = new dagre.graphlib.Graph({
            multigraph: true,
            compound: true,
        });

        let nodeSizeFunc;
        if (!nodeSize) {
            nodeSizeFunc = (d) => {
                if (d.size) {
                    if (isArray(d.size)) {
                        return d.size;
                    }
                    return [d.size, d.size];
                }
                return [40, 40];
            };
        } else if (isArray(nodeSize)) {
            nodeSizeFunc = () => nodeSize;
        } else {
            nodeSizeFunc = () => [nodeSize, nodeSize];
        }
        let horisep = getFunc(self.nodesepFunc, self.nodesep, 50);
        let vertisep = getFunc(self.ranksepFunc, self.ranksep, 50);

        if (rankdir === "LR" || rankdir === "RL") {
            horisep = getFunc(self.ranksepFunc, self.ranksep, 50);
            vertisep = getFunc(self.nodesepFunc, self.nodesep, 50);
        }
        g.setDefaultEdgeLabel(() => ({}));
        g.setGraph(self);

        const comboMap = {};
        nodes.forEach((node) => {
            const size = nodeSizeFunc(node);
            const verti = vertisep(node);
            const hori = horisep(node);
            const width = size[0] + 2 * hori;
            const height = size[1] + 2 * verti;
            g.setNode(node.id, { width, height });

            if (this.sortByCombo && node.comboId) {
                if (!comboMap[node.comboId]) {
                    comboMap[node.comboId] = true;
                    g.setNode(node.comboId, {});
                }
                g.setParent(node.id, node.comboId);
            }
        });

        if (this.sortByCombo && combos) {
            combos.forEach(combo => {
                if (!combo.parentId) return;
                if (!comboMap[combo.parentId]) {
                    comboMap[combo.parentId] = true;
                    g.setNode(combo.parentId, {});
                }
                g.setParent(combo.id, combo.parentId);
            })
        }

        edges.forEach((edge) => {
            // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
            g.setEdge(edge.source, edge.target, {
                weight: edge.weight || 1,
            });
        });
        dagre.layout(g);
        let coord;
        g.nodes().forEach((node) => {
            coord = g.node(node);
            const i = nodes.findIndex((it) => it.id === node);
            if (!nodes[i]) return;
            nodes[i].x = coord.x;
            nodes[i].y = coord.y;
        });
        g.edges().forEach((edge) => {
            coord = g.edge(edge);
            const i = edges.findIndex(
                (it) => it.source === edge.v && it.target === edge.w
            );
            if (self.controlPoints && edges[i].type !== "loop") {
                edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
            }
        });

        if (self.onLayoutEnd) self.onLayoutEnd();
    },
});
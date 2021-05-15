const isString = (val) => typeof val === 'string'
const isArray = Array.isArray
const getDegree = (n, nodeIdxMap, edges) => {
    const degrees = []
    for (let i = 0; i < n; i++) {
        degrees[i] = 0
    }
    if (!edges) return degrees
    edges.forEach((e) => {
        if (e.source) {
            degrees[nodeIdxMap[e.source]] += 1
        }
        if (e.target) {
            degrees[nodeIdxMap[e.target]] += 1
        }
    })
    return degrees
}


G6.registerLayout('my-grid', {
    // 默认参数
    getDefaultCfg: function getDefaultCfg() {
        console.log('%c getDefaultCfg===', 'color:#fff;background: red;font-size:18px;')
        return {
            begin: [0, 0],
            bbxxx: 123,
        };
    },
    begin: [0, 0],
    onLayoutEnd() {},
    small(val) {
        const self = this;
        let res;
        const rows = self.rows || 5;
        const cols = self.cols || 5;
        if (val == null) {
            res = Math.min(rows, cols);
        } else {
            const min = Math.min(rows, cols);
            if (min === self.rows) {
                self.rows = val;
            } else {
                self.cols = val;
            }
        }
        return res;
    },
    large(val) {
        const self = this;
        let res;
        const rows = self.rows || 5;
        const cols = self.cols || 5;
        if (val == null) {
            res = Math.max(rows, cols);
        } else {
            const max = Math.max(rows, cols);
            if (max === self.rows) {
                self.rows = val;
            } else {
                self.cols = val;
            }
        }
        return res;
    },
    used(row, col) {
        const self = this;
        return self.cellUsed[`c-${row}-${col}`] || false;
    },
    use(row, col) {
        const self = this;
        self.cellUsed[`c-${row}-${col}`] = true;
    },
    moveToNextCell() {
        const self = this;
        const cols = self.cols || 5;
        self.col++;
        if (self.col >= cols) {
            self.col = 0;
            self.row++;
        }
    },
    getPos(node) {
        const self = this;
        const begin = self.begin;
        const cellWidth = self.cellWidth;
        const cellHeight = self.cellHeight;
        let x;
        let y;

        // see if we have a manual position set
        const rcPos = self.id2manPos[node.id];
        if (rcPos) {
            x = rcPos.col * cellWidth + cellWidth / 2 + begin[0];
            y = rcPos.row * cellHeight + cellHeight / 2 + begin[1];
        } else {
            // otherwise set automatically

            while (self.used(self.row, self.col)) {
                self.moveToNextCell();
            }

            x = self.col * cellWidth + cellWidth / 2 + begin[0];
            y = self.row * cellHeight + cellHeight / 2 + begin[1];
            self.use(self.row, self.col);

            self.moveToNextCell();
        }
        node.x = x;
        node.y = y;
    },
    execute() {
        const self = {
            ...this.getDefaultCfg(),
            ...this,
        };
        console.log('%c self===', 'color:#fff;background: red;font-size:18px;', self)
        const nodes = self.nodes;
        const n = nodes.length;
        const begin = self.begin;
        if (n === 0) {
            if (self.onLayoutEnd) self.onLayoutEnd();
            return;
        }
        if (n === 1) {
            nodes[0].x = begin[0];
            nodes[0].y = begin[1];
            if (self.onLayoutEnd) self.onLayoutEnd();
            return;
        }

        const edges = self.edges;
        const layoutNodes = [];
        nodes.forEach(node => {
            layoutNodes.push(node);
        });
        const nodeIdxMap = {};
        layoutNodes.forEach((node, i) => {
            nodeIdxMap[node.id] = i;
        });
        if (
            self.sortBy === "degree" ||
            !isString(self.sortBy) ||
            (layoutNodes[0])[self.sortBy] === undefined
        ) {
            self.sortBy = "degree";
            if (isNaN(nodes[0].degree)) {
                const values = getDegree(layoutNodes.length, nodeIdxMap, edges);
                layoutNodes.forEach((node, i) => {
                    node.degree = values[i];
                });
            }
        }
        // sort nodes by value
        layoutNodes.sort(
            (n1, n2) => (n2)[self.sortBy] - (n1)[self.sortBy]
        );

        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }

        const oRows = self.rows;
        const oCols = self.cols != null ? self.cols : self.columns;
        self.cells = n;

        // if rows or columns were set in self, use those values
        if (oRows != null && oCols != null) {
            self.rows = oRows;
            self.cols = oCols;
        } else if (oRows != null && oCols == null) {
            self.rows = oRows;
            self.cols = Math.ceil(self.cells / self.rows);
        } else if (oRows == null && oCols != null) {
            self.cols = oCols;
            self.rows = Math.ceil(self.cells / self.cols);
        } else {
            // otherwise use the automatic values and adjust accordingly	  
            // otherwise use the automatic values and adjust accordingly
            // width/height * splits^2 = cells where splits is number of times to split width
            self.splits = Math.sqrt((self.cells * self.height) / self.width);
            self.rows = Math.round(self.splits);
            self.cols = Math.round((self.width / self.height) * self.splits);
        }
        if (self.cols * self.rows > self.cells) {
            // otherwise use the automatic values and adjust accordingly
            // if rounding was up, see if we can reduce rows or columns
            const sm = self.small();
            const lg = self.large();

            // reducing the small side takes away the most cells, so try it first
            if ((sm - 1) * lg >= self.cells) {
                self.small(sm - 1);
            } else if ((lg - 1) * sm >= self.cells) {
                self.large(lg - 1);
            }
        } else {
            // if rounding was too low, add rows or columns
            while (self.cols * self.rows < self.cells) {
                const sm = self.small();
                const lg = self.large();

                // try to add to larger side first (adds less in multiplication)
                if ((lg + 1) * sm >= self.cells) {
                    self.large(lg + 1);
                } else {
                    self.small(sm + 1);
                }
            }
        }

        self.cellWidth = self.width / self.cols;
        self.cellHeight = self.height / self.rows;

        if (self.condense) {
            self.cellWidth = 0;
            self.cellHeight = 0;
        }

        if (self.preventOverlap) {
            layoutNodes.forEach(node => {
                if (!node.x || !node.y) {
                    // for bb
                    node.x = 0;
                    node.y = 0;
                }

                let nodew;
                let nodeh;
                if (isArray(node.size)) {
                    nodew = (node.size)[0];
                    nodeh = (node.size)[1];
                } else if (isNumber(node.size)) {
                    nodew = node.size;
                    nodeh = node.size;
                }
                if (nodew === undefined || nodeh === undefined) {
                    if (isArray(self.nodeSize)) {
                        nodew = (self.nodeSize)[0];
                        nodeh = (self.nodeSize)[1];
                    } else if (isNumber(self.nodeSize)) {
                        nodew = self.nodeSize;
                        nodeh = self.nodeSize;
                    } else {
                        nodew = 30;
                        nodeh = 30;
                    }
                }

                const p = self.preventOverlapPadding;

                const w = nodew + p;
                const h = nodeh + p;

                self.cellWidth = Math.max(self.cellWidth, w);
                self.cellHeight = Math.max(self.cellHeight, h);
            });
        }

        self.cellUsed = {}; // e.g. 'c-0-2' => true

        // to keep track of current cell position
        self.row = 0;
        self.col = 0;

        // get a cache of all the manual positions
        self.id2manPos = {};
        for (let i = 0; i < layoutNodes.length; i++) {
            const node = layoutNodes[i];
            let rcPos;
            if (self.position) {
                rcPos = self.position(node);
            }

            if (rcPos && (rcPos.row !== undefined || rcPos.col !== undefined)) {
                // must have at least row or col def'd
                const pos = {
                    row: rcPos.row,
                    col: rcPos.col
                };

                if (pos.col === undefined) {
                    // find unused col
                    pos.col = 0;

                    while (self.used(pos.row, pos.col)) {
                        pos.col++;
                    }
                } else if (pos.row === undefined) {
                    // find unused row
                    pos.row = 0;

                    while (self.used(pos.row, pos.col)) {
                        pos.row++;
                    }
                }

                self.id2manPos[node.id] = pos;
                self.use(pos.row, pos.col);
            }
            self.getPos(node);
        }

        if (self.onLayoutEnd) self.onLayoutEnd();
    },
});
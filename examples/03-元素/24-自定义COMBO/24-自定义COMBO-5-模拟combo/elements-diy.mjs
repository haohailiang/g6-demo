const padding = [50, 100, 150, 200];

export function registerNode() {
    G6.registerNode(
        "card-node",
        {
            get8Points(cfg) {
                const { comboPadding, comboWidth, comboHeight } = cfg;

                const startX = - comboWidth / 2;
                const startY = - comboHeight / 2;

                const outer1 = [startX, startY];
                const outer2 = [startX + comboWidth, startY];
                const outer3 = [startX + comboWidth, startY + comboHeight];
                const outer4 = [startX, startY + comboHeight];

                const inner1 = [startX + comboPadding[3], startY + comboPadding[0]];
                const inner2 = [startX + comboWidth - comboPadding[1], startY + comboPadding[0]];
                const inner3 = [startX + comboWidth - comboPadding[1], startY + comboHeight - comboPadding[2]];
                const inner4 = [startX + comboPadding[3], startY + comboHeight - comboPadding[2]];

                return {
                    outer1,
                    outer2,
                    outer3,
                    outer4,

                    inner1,
                    inner2,
                    inner3,
                    inner4,
                }
            },
            drawRect(cfg, group) {
                this.initPoints = this.get8Points(cfg);
                const { outer1, outer2, outer3, outer4, inner1, inner2, inner3, inner4 } = this.initPoints;

                const keyShape = group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...outer1],
                            ["L", ...outer2],
                            ["L", ...outer3],
                            ["L", ...outer4],
                            ["Z"]
                        ],
                        // fill: "rgba(255, 0, 0, 1)",
                        stroke: "rgba(255, 0, 0, 1)",
                        lineWidth: 1
                    },
                    capture: false,
                    name: "outer-rect-shape"
                });

                group.addShape("path", {
                    attrs: {
                        path: [
                            ["M", ...inner1],
                            ["L", ...inner2],
                            ["L", ...inner3],
                            ["L", ...inner4],
                            ["Z"]
                        ],
                        fill: "rgba(0, 0, 0, 0.5)",
                        stroke: "rgba(255, 0, 0, 1)",
                        lineWidth: 1
                    },
                    capture: false,
                    name: "inner-rect-shape"
                });

                return keyShape;
            },
            drawShape(cfg, group) {
                return this.drawRect(cfg, group);
            },
            /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg Combo 的配置项
     * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
     */
            afterDraw(cfg, group) {
                // console.log("afterDraw: ");
                // debugger
            },
            /**
     * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Combo} combo 节点
     */
            afterUpdate(cfg, combo) {
                // console.log('cfg: ', cfg);
                // console.log('combo: ', combo);
                // const nextPoints = getNextPoints(this.initPoints, combo);
                // const { relative: { outer1, outer2, outer3, outer4, inner1, inner2, inner3, inner4 } } = nextPoints;

                // const group = combo.get("group");
                // const keyShape = group.find(
                //     ele => ele.get("name") === "outer-rect-shape"
                // );
                // const innerRectShape = group.find(
                //     ele => ele.get("name") === "inner-rect-shape"
                // );
            },
        },
        "rect"
    );
}

/**
 * 获取新的8个节点的位置
 * @param initPoints 初始化时8个节点的位置
 * @param combo 检查单一的节点的位置
 */
function getNextPoints(initPoints, combo) {
    const { nodes } = combo.getChildren();
    for(let i=0; i<nodes.length; i++) {
        const nodeModel = nodes[i].getModel();
        if (nodeModel.id === 'core-5') {
            return getBoundaryPoints(initPoints, [nodeModel]);
        }
    }
    throw new Error('xxxx');
}

/**
 * 获取新的8个节点的位置
 * @param initPoints 初始化时8个节点的位置
 * @param nodeModels 实际节点的Model
 */
function getBoundaryPoints(initPoints, nodeModels) {
    if (nodeModels.length === 1) {
        /**
         * 与初始位置比
         * 1. 在初始范围内移动时, 位置不变化
         * 2. 越界时[X和Y单独处理]
         *    2.1 左边X越界时, 左边扩展, 右边收缩
         *    2.2 右边X越界时, 右边扩展, 左边收缩
         *    2.3 上边Y越界时, 上边扩展, 下边收缩
         *    2.4 下边Y越界时, 下边扩展, 上边收缩
         */
        return getSingleNodePosition(initPoints, nodeModels[0]);
    } else { // 多个
        /**
         * 与之前的物理点组成的区域比较
         * [比之前大]
         * 1. X组成的区域比之前大
         *     判断X轴变大的方向
         *         1.1 左边变大, 向左扩展
         *         1.2 右边变大, 向右扩展
         * 2. Y组成的区域比之前大
         *     判断Y轴变大的方向
         *         2.1 上边变大, 向上扩展
         *         2.2 下边变大, 向下扩展
         * [比之前小]
         * 3. X组成的区域比之前小
         *     3.1 >最小的宽度
         *         判断X轴变小的方向
         *             3.1.1 左边变小, 左边收缩
         *             3.1.2 右边变小, 右边收缩
         *     3.2 <=最小的宽度
         *         不变
         * 4. Y组成的区域比之前小
         *     4.1 >最小的高度
         *         判断Y轴变小的方向
         *             4.1.1 上边变小, 上边收缩
         *             4.1.2 下边变小, 下边收缩
         *     4.2 <=最小的高度
         *         不变
         */
    }
}

/**
 * 获取单个节点的边界点
 * @param initPoints 初始化时8个节点的位置
 * @param nodeModel 实际节点的Model
 */
function getSingleNodePosition(initPoints, nodeModel) {
    const {
        relative: {
            // outer1,
            // outer2,
            // outer3,
            // outer4,

            // inner1,
            // inner2,
            // inner3,
            // inner4,
        },
        absolute: {
            inner1,
            inner2,
            inner3,
            inner4,
        }
    } = initPoints;
    const initPointsClone = _.cloneDeep(initPoints);
    const { x, y } = nodeModel;
    
    let overflowLeftX = 0;
    let overflowRightX = 0;
    let overflowTopY = 0;
    let overflowBottomY = 0;

    if (x < inner1[0]) {
        overflowLeftX = x - inner1[0];
    } else if (x > inner2[0]) {
        overflowRightX = x - inner2[0];
    }

    if (y < inner1[1]) {
        overflowTopY = y - inner1[1];
    } else if (y > inner4[1]) {
        overflowBottomY = y - inner4[1];
    }

    if (overflowLeftX < 0) {
        initPointsClone.relative.outer1[0] += overflowLeftX;
        initPointsClone.relative.outer4[0] += overflowLeftX;
        initPointsClone.relative.inner1[0] += overflowLeftX;
        initPointsClone.relative.inner4[0] += overflowLeftX;
    } else if (overflowRightX > 0) {
        initPointsClone.relative.outer2[0] += overflowRightX;
        initPointsClone.relative.outer3[0] += overflowRightX;
        initPointsClone.relative.inner2[0] += overflowRightX;
        initPointsClone.relative.inner3[0] += overflowRightX;
    }

    if (overflowTopY < 0) {
        initPointsClone.relative.outer1[1] += overflowTopY;
        initPointsClone.relative.outer2[1] += overflowTopY;
        initPointsClone.relative.inner1[1] += overflowTopY;
        initPointsClone.relative.inner2[1] += overflowTopY;
    } else if (overflowBottomY > 0) {
        initPointsClone.relative.outer3[1] += overflowBottomY;
        initPointsClone.relative.outer4[1] += overflowBottomY;
        initPointsClone.relative.inner3[1] += overflowBottomY;
        initPointsClone.relative.inner4[1] += overflowBottomY;
    }

    return initPointsClone;
}

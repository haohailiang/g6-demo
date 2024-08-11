import * as store from './store.mjs';

export function getData() {
    const comboCenterX = store.comboCenterX;
    const comboCenterY = store.comboCenterY;
    const comboWidth = store.comboWidth;
    const comboHeight = store.comboHeight;
    const comboPadding = store.comboPadding;

    // const comboX = comboCenterX - comboWidth / 2;
    // const comboY = comboCenterY - comboHeight / 2;
    // const innerWidth = comboWidth - comboPadding[1] - comboPadding[3];
    // const innerHeight = comboHeight - comboPadding[0] - comboPadding[2];
    // const innerCenterX = comboX + comboPadding[3] + innerWidth / 2;
    // const innerCenterY = comboY + comboPadding[0] + innerHeight / 2;

    // const point1X = innerCenterX - innerWidth / 2;
    // const point1Y = innerCenterY - innerHeight / 2;
    // const point2X = innerCenterX + innerWidth / 2;
    // const point2Y = innerCenterY - innerHeight / 2;
    // const point3X = innerCenterX + innerWidth / 2;
    // const point3Y = innerCenterY + innerHeight / 2;
    const startX = comboCenterX - comboWidth / 2;
    const startY = comboCenterY - comboHeight / 2;
    const point2X = startX + comboWidth - comboPadding[1];
    const point2Y = startY + comboPadding[0];
    const point4X = startX + comboPadding[3];
    const point4Y = startY + comboHeight - comboPadding[2];

    const nodeSize = 21;
    const core1X = point2X - nodeSize / 2;
    const core1Y = point2Y + nodeSize / 2;
    const core2X = point4X + nodeSize / 2;
    const core2Y = point4Y - nodeSize / 2;
    return {
        nodes: [
            {
                id: 'combo-1',
                label: 'combo-1',
                // type: 'rect',
                type: 'card-node',
                x: comboCenterX,
                y: comboCenterY,
                comboPadding,
                comboWidth,
                comboHeight,
            },
            {
                id: 'core-1',
                label: '1',
                groupId: 'combo-1',
                x: core1X,
                y: core1Y,
            },
            {
                id: 'core-2',
                label: '2',
                groupId: 'combo-1',
                x: core2X,
                y: core2Y,
            },
        ],
        edges: [],
        combos: [
        ]
    }
}

import * as store from './store.mjs';

export function getData() {
    const comboCenterX = store.comboCenterX;
    const comboCenterY = store.comboCenterY;
    const comboWidth = store.comboWidth;
    const comboHeight = store.comboHeight;
    const comboPadding = store.comboPadding;
    // const comboPadding = [0, 0, 0, 0];

    const comboX = comboCenterX - comboWidth / 2;
    const comboY = comboCenterY - comboHeight / 2;
    const innerWidth = comboWidth - comboPadding[1] - comboPadding[3];
    const innerHeight = comboHeight - comboPadding[0] - comboPadding[2];
    const innerCenterX = comboX + comboPadding[3] + innerWidth / 2;
    const innerCenterY = comboY + comboPadding[0] + innerHeight / 2;

    const point1X = innerCenterX - innerWidth / 2;
    const point1Y = innerCenterY - innerHeight / 2;
    const point2X = innerCenterX + innerWidth / 2;
    const point2Y = innerCenterY - innerHeight / 2;
    const point3X = innerCenterX + innerWidth / 2;
    const point3Y = innerCenterY + innerHeight / 2;
    const point4X = innerCenterX - innerWidth / 2;
    const point4Y = innerCenterY + innerHeight / 2;

    const nodeSize = 21;
    const point5X = point4X + nodeSize / 2 + 10;
    const point5Y = point4Y - nodeSize / 2 - 10;
    return {
        nodes: [
            {
                id: 'angle-1',
                // label: '1',
                x: point1X,
                y: point1Y,
                size: 1,
                comboId: 'combo-1',
            },
            {
                id: 'angle-2',
                // label: '2',
                x: point2X,
                y: point2Y,
                size: 1,
                comboId: 'combo-1',
            },
            {
                id: 'angle-3',
                // label: '3',
                x: point3X,
                y: point3Y,
                size: 1,
                comboId: 'combo-1',
            },
            {
                id: 'angle-4',
                // label: '4',
                x: point4X,
                y: point4Y,
                size: 1,
                comboId: 'combo-1',
            },
            {
                id: 'core-5',
                label: '5',
                x: point5X,
                y: point5Y,
                comboId: 'combo-1',
            },
        ],
        edges: [],
        combos: [
            {
                id: 'combo-1',
                label: 'combo-1',
                // type: 'rect',
                type: 'card-node',
                comboCenterX,
                comboCenterY,
                comboPadding,
                comboWidth,
                comboHeight,
            },
        ]
    }
}

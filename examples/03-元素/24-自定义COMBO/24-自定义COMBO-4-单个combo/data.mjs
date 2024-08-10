export function getData() {
    const nodes = Array.from({ length: Math.floor(Math.random() * 30) }).map((_, index) => {
        const comboId = Math.floor(Math.random() * 3) + 1;

        return {
            id: `node-${index}`,
            label: `node-${index}`,
            comboId: `combo-${comboId}`,
        };
    });
    const childNodes1 = [
        {
            id: `node-1`,
            label: `node-1`,
            x: 0,
            y: 0,
            comboId: `combo-1`,
        },
        {
            id: `node-2`,
            label: `node-2`,
            x: 150,
            y: 150,
            comboId: `combo-1`,
        },
    ];

    const childNodes3 = [
        {
            id: `node-3`,
            label: `node-3`,
            x: 700,
            y: 300,
            comboId: `combo-3`,
        }
    ];
    const combo1 = [
        {
            id: 'combo-1',
            label: 'combo-1',
            type: 'card-node',
            nodes: childNodes1,
            parentId: 'combo-2',
        },
    ]


    return {
        nodes: [
            {
                id: `node-1`,
                label: `node-1`,
                x: 0,
                y: 0,
                comboId: `group-1`,
            },
            {
                id: `node-2`,
                label: `node-2`,
                x: 150,
                y: 150,
                comboId: `group-1`,
            },
            {
                id: `node-3`,
                label: `node-3`,
                x: 700,
                y: 300,
                comboId: `group-3`,
            },
            // {
            //     id: `node-1`,
            //     label: `node-1`,
            //     x: 0,
            //     y: 0,
            //     comboId: `combo-1`,
            // },
            // {
            //     id: `node-2`,
            //     label: `node-2`,
            //     x: 150,
            //     y: 150,
            //     comboId: `combo-1`,
            // },
            // {
            //     id: `node-4`,
            //     label: `node-4`,
            //     x: 600,
            //     y: 600,
            //     comboId: `combo-2`,
            // },
        ],
        edges: [],
        combos: [
            {
                id: 'group-1',
                label: 'group-1',
                type: 'card-node',
                // nodes: childNodes1,
                parentId: 'sublayer-1',
            },
            {
                id: 'sublayer-1',
                label: 'sublayer-1',
                type: 'card-node',
                combos: combo1
            },
            {
                id: 'group-3',
                label: 'group-3',
                type: 'card-node',
                // nodes: childNodes3,
                parentId: 'sublayer-1',
            }
        ]
    }
}

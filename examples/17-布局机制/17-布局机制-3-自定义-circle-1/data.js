const data = {
    nodes: [
        {
            id: '2048004176',
            label: "马智辰",
            type: "circle",
            layoutType: 'subject',
            size: subjectRadius,
        },
        {
            id: '0',
            label: '0',
            type: "circle",
            layoutType: 'realObject',
            size: realObjectRadius,
        },
        // {
        //     id: '2',
        //     label: '5/3-C',
        //     cluster: 'part1',
        // },
        // {
        //     id: '3',
        //     label: '2-D',
        //     cluster: 'part1',
        // },
        // {
        //     id: '4',
        //     label: '0.5-E',
        //     cluster: 'part1',
        // },
        // {
        //     id: '5',
        //     label: '3-F',
        //     cluster: 'part1',
        // },


        // {
        //     id: '6',
        //     label: '29/24-a',
        //     cluster: 'part2',
        // },
        // {
        //     id: '7',
        //     label: '19/18-b',
        //     cluster: 'part2',
        // },
        // {
        //     id: '8',
        //     label: '11/6-c',
        //     cluster: 'part2',
        // },
        // {
        //     id: '9',
        //     label: '11/6-d',
        //     cluster: 'part2',
        // },
    ],
    edges: [
        {
            source: '2048004176',
            target: '0',
            label: '马智辰-0',
            layoutType: 'realEdge',
            labelCfg: {
                autoRotate: true,
                style: {
                    stroke: '#000',
                    lineWidth: 1,
                    fontSize: realEdgeFontSize,
                },
            },
            style: {
                stroke: 'red',
            },
        },
        // {
        //     source: '0',
        //     target: '7',
        // },
        // {
        //     source: '0',
        //     target: '9',
        // },
        // {
        //     source: '1',
        //     target: '6',
        // },
        // {
        //     source: '1',
        //     target: '9',
        // },
        // {
        //     source: '1',
        //     target: '7',
        // },
        // {
        //     source: '2',
        //     target: '8',
        // },
        // {
        //     source: '2',
        //     target: '9',
        // },
        // {
        //     source: '2',
        //     target: '6',
        // },
        // {
        //     source: '3',
        //     target: '8',
        // },
        // {
        //     source: '4',
        //     target: '6',
        // },
        // {
        //     source: '4',
        //     target: '7',
        // },
        // {
        //     source: '5',
        //     target: '9',
        // },
    ],
};
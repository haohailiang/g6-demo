/**
 * 功能: 基本功能实现[算法实现]
 * 作者: 郝海亮
 * 日期: 2021-03-17
 */

/**
const data = {
    "id": "EIP",
    "children": [
        {
            "id": "客户组织A",
            "children": [
                {
                    "id": "群A-01",
                    "children": [
                        {
                            id: '客户A-01-01'
                        },
                        {
                            id: '客户A-01-02'
                        },
                        {
                            id: '客户A-01-03'
                        },
                        {
                            id: '客户A-01-04'
                        },
                        {
                            id: '客户A-01-05'
                        },
                        {
                            id: '客户A-01-06'
                        },
                        {
                            id: '客户A-01-07'
                        }
                    ]
                },
                {
                    "id": "群A-02",
                    "children": [
                        {
                            id: '客户A-02-01'
                        },
                        {
                            id: '客户A-02-02'
                        },
                        {
                            id: '客户A-02-03'
                        },
                    ]
                },
                {
                    "id": "群A-03",
                    "children": [
                        {
                            id: '客户A-03-01'
                        },
                        {
                            id: '客户A-03-02'
                        },
                        {
                            id: '客户A-03-03'
                        },
                        {
                            id: '客户A-03-04'
                        },
                        {
                            id: '客户A-03-05'
                        },
                    ]
                },
                {
                    "id": "群A-04",
                    "children": [
                        {
                            id: '客户A-04-01'
                        },
                        {
                            id: '客户A-04-02'
                        },
                        {
                            id: '客户A-04-03'
                        },
                        {
                            id: '客户A-04-04'
                        },
                        {
                            id: '客户A-04-05'
                        },
                        {
                            id: '客户A-04-06'
                        },
                    ]
                },
                {
                    "id": "群A-05",
                    "children": [
                        {
                            id: '客户A-05-01'
                        },
                        {
                            id: '客户A-05-02'
                        },
                    ]
                },
                {
                    "id": "群A-06",
                    "children": [
                        {
                            id: '客户A-06-01'
                        },
                    ]
                },
                {
                    "id": "群A-07",
                    "children": [
                        {
                            id: '客户A-07-01'
                        },
                        {
                            id: '客户A-07-02'
                        },
                        {
                            id: '客户A-07-03'
                        },
                        {
                            id: '客户A-07-04'
                        },
                    ]
                },
                {
                    "id": "群A-08",
                    "children": [
                        {
                            id: '客户A-08-01'
                        },
                        {
                            id: '客户A-08-02'
                        },
                        {
                            id: '客户A-08-03'
                        },
                        {
                            id: '客户A-08-04'
                        },
                        {
                            id: '客户A-08-05'
                        },
                        {
                            id: '客户A-08-06'
                        },
                        {
                            id: '客户A-08-07'
                        }
                    ]
                }
            ]
        },
        // {
        //     "id": "客户组织B",
        //     "children": [
        //         {
        //             "id": "客户组织B",
        //             "children": [
        //                 {
        //                     "id": "Different initializations"
        //                 },
        //                 {
        //                     "id": "Different parameter choices"
        //                 },
        //                 {
        //                     "id": "Different architectures"
        //                 },
        //                 {
        //                     "id": "Different modeling methods"
        //                 },
        //                 {
        //                     "id": "Different training sets"
        //                 },
        //                 {
        //                     "id": "Different feature sets"
        //                 }
        //             ]
        //         },
        //         {
        //             "id": "Methods",
        //             "children": [
        //                 {
        //                     "id": "Classifier selection"
        //                 },
        //                 {
        //                     "id": "Classifier fusion"
        //                 }
        //             ]
        //         },
        //         {
        //             "id": "Common",
        //             "children": [
        //                 {
        //                     "id": "Bagging"
        //                 },
        //                 {
        //                     "id": "Boosting"
        //                 },
        //                 {
        //                     "id": "AdaBoost"
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     "id": "客户组织C",
        //     "children": [
        //         {
        //             "id": "Multiple linear regression"
        //         },
        //         {
        //             "id": "Partial least squares"
        //         },
        //         {
        //             "id": "Multi-layer feedforward neural network"
        //         },
        //         {
        //             "id": "General regression neural network"
        //         },
        //         {
        //             "id": "Support vector regression"
        //         }
        //     ]
        // }
    ]
}
 */

/**
 * 获取随机的节点数
 */
function getRandomNodes(minNum, maxNum) {
    return minNum + Math.floor(Math.random() * (maxNum - minNum))
}

function getFormatNumber(num) {
    return String(num).padStart(2, '0')
}

const serverData = {
    "id": "EIP",
}

const minNum = 3
// const maxNum = 70
const maxNum = 4
// const organsOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// const groupsOrder = ['甲', '乙', '丙', '丁', '戊', '己', '庚']
const organsLen = getRandomNodes(minNum, maxNum) // 客户组织
const groupsLen = getRandomNodes(minNum, maxNum) // 群
const customersLen = getRandomNodes(minNum, maxNum) // 客户个数

const organChildren = []
// 一度关系
for (let organIndex = 0; organIndex < organsLen; organIndex++) {
    const groupChildren = []
    // 二度关系
    for (let groupIndex = 0; groupIndex < groupsLen; groupIndex++) {
        const customerChildren = []
        // 三度关系
        for (let customerIndex = 0; customerIndex < customersLen; customerIndex++) {
            customerChildren.push({
                // id: `客户${organsOrder[organIndex]}-${groupsOrder[groupIndex]}-${String(customerIndex).padStart(2, '0')}`
                id: `客户${getFormatNumber(organIndex)}-${getFormatNumber(groupIndex)}-${getFormatNumber(customerIndex)}`
            })
        }
        groupChildren.push({
            // id: `群${organsOrder[organIndex]}-${groupsOrder[groupIndex]}`,
            id: `群${getFormatNumber(organIndex)}-${getFormatNumber(groupIndex)}`,
            children: customerChildren,
        })
    }
    organChildren.push({
        id: `客户组织${getFormatNumber(organIndex)}`,
        children: groupChildren,
    })
}

serverData.children = organChildren

// 展示一度关系

// const dataChildren = serverData.children.map(item => {
//     return {
//         id: item.id
//     }
// })

// const data = {
//     id: serverData.id,
//     children: dataChildren,
// }

// const data = serverData

const data = {
    id: 1,
    children: [
        {
            id: 2,
            /**
            children: [
                {
                    id: 5,
                    children: [
                        {
                            id: 'a',
                        },
                        {
                            id: 'b',
                        },
                        {
                            id: 'c',
                        }
                    ]
                },
                {
                    id: 6,
                },
                {
                    id: 7,
                }
            ]
            */
        },
        {
            id: 3,
            /**
            children: [
                {
                    id: 8,
                },
                {
                    id: 9,
                },
                {
                    id: 10,
                }
            ]
            */
        },
        {
            id: 4,
            /**
            children: [
                {
                    id: 11,
                },
                {
                    id: 12,
                },
                {
                    id: 13,
                }
            ]
            */
        }
    ]
}

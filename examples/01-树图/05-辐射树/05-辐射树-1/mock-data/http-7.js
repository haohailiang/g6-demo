const https = []


// EIP
// getHttp('EIP').then(resLevel0 => {
//     console.log('level0: ', resLevel0)
//     return  httpLevel2 = resLevel0.map(item => {
//         return getHttp(item.id)
//     })

//     // 客户组织
//     Promise.all(httpLevel2).then(resLevel1 => {
//         console.log('level1: ', resLevel1)
//     })
// }).then()

// mergePromise()

// getHttp('EIP').then(res1 => {
//     console.log('level1: ', res1)
//     // EIP
//     Promise.all(
//         // 客户组织
//         res1.map(item1 => getHttp(item1.id))
//     ).then(res2 => {
//         const combindRes2 = res2.reduce((total, curItem) => {
//             return [...total, ...curItem]
//         }, [])
//         console.log('level2: ', combindRes2)

//         // 群
//         Promise.all(
//             combindRes2.map(item2 => {
//                 return getHttp(item2.id)
//             })
//         ).then(res3 => {
//             const combindRes3 = res3.reduce((total, curItem) => {
//                 return [...total, ...curItem]
//             }, [])
//             console.log('level3: ', combindRes3)
//         })
//     })
// })
/**
 * 动态修改data数据
 * @param {*} targetId 
 * @param {*} wholeData 
 * @param {*} children 
 */
function insertChildByParentId(targetId, wholeData, targetChildren) {
    function simpleLoop(tempTargetId, node) {
        // loopCount ++
        const { id, children = [] } = node
        if (id === targetId) {
            node.children = targetChildren
            return
        }

        children.forEach(child => {
            simpleLoop(tempTargetId, child)
        })
    }
    simpleLoop(targetId, wholeData)
}

/**
getHttp('EIP').then(res1 => {
    console.log('level1: ', res1)
    insertChildByParentId('EIP', data, res1)
    // EIP
    Promise.all(
        // 客户组织
        res1.map(item1 => getHttp(item1.id))
    ).then(res2 => {
        console.log('level2: ', res2)
        // console.log('level2: ', combindRes2)
        res2.forEach(( child2, index2) => {
            insertChildByParentId(res1[index2].id, data, child2)
        })

        const combindRes2 = res2.reduce((total, curItem) => {
            return [...total, ...curItem]
        }, [])

        // 群
        Promise.all(
            combindRes2.map(item2 => {
                return getHttp(item2.id)
            })
        ).then(res3 => {
            console.log('level3: ', res3)
            res3.forEach(( child3, index3) => {
                insertChildByParentId(combindRes2[index3].id, data, child3)
            })

            const combindRes3 = res3.reduce((total, curItem) => {
                return [...total, ...curItem]
            }, [])
            console.log('level3: ', combindRes3)
        })
    })
})
 */
let child1 = []
let child2 = []
// let todo = []
getHttp('EIP')
    .then(res1 => {
        // console.log('level1: ', res1)
        child1 = [ ...res1 ]
        insertChildByParentId('EIP', data, res1)

        // EIP
        return Promise.all(
            // 客户组织
            res1.map(item1 => getHttp(item1.id))
        )
    })
    .then(res2 => {
        // console.log(res2)

        // console.log('level2: ', res2)
        // console.log('level2: ', combindRes2)
        res2.forEach(( child2, index2) => {
            insertChildByParentId(child1[index2].id, data, child2)
        })

        const combindRes2 = res2.reduce((total, curItem) => {
            return [...total, ...curItem]
        }, [])
        child2 = [...combindRes2]

        // 群
        return Promise.all(
            combindRes2.map(item2 => {
                return getHttp(item2.id)
            })
        )
    })
    .then(res3 => {
        // console.log('level3: ', res3)
        res3.forEach(( child3, index3) => {
            insertChildByParentId(child2[index3].id, data, child3)
        })

        const combindRes3 = res3.reduce((total, curItem) => {
            return [...total, ...curItem]
        }, [])
        // console.log('level3: ', combindRes3)


        graph.changeData(data)
        graph.render();
        graph.fitView();

        getNodeIdsChange()
        promiseLoop(promiseLoopArrs)
    })

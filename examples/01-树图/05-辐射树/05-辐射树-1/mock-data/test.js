
/**
const a = new Promise(resolve => {
    setTimeout(() => {
        resolve(1)
    }, 3000);
})
a.then(res => {
    console.log(res)
    return Promise.all([a, a])
}).then(res => {
    console.log(res)
})
 */
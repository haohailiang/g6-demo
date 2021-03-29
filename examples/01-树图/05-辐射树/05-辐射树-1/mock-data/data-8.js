/**
 * 功能: 基本功能实现[算法实现]
 * 作者: 郝海亮
 * 日期: 2021-03-17
 */

let data = {
    id: 'EIP',
    level: '0',
}
function getHttp(id) {
    return new Promise(resolve => {
        $.ajax({
            url: "http://localhost:7011/mock/graph?id=" + id,
            cache: false,
            success: function(res) {
                resolve(res)
            }
        });
    })
}
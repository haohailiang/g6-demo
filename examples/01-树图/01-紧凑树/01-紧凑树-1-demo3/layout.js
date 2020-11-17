/**
 * 功能: 组织架构自定义布局
 * 作者: 郝海亮
 * 日期: 2020-11-14
 */

function registerLayout() {
    return {
        type: 'compactBox',
        direction: 'TB',
        getId: function getId(d) {
            return d.id
        },
        getHeight: function getHeight() {
            return nodeWidth
        },
        getWidth: function getWidth() {
            return nodeHeight
        },
        getVGap: function getVGap() {
            return vGap
        },
        getHGap: function getHGap() {
            return hGap
        },
    }
}
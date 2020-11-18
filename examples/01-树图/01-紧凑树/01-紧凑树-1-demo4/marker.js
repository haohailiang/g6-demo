/**
 * 功能: 组织框架marker生成器
 * 作者: 郝海亮
 * 日期: 2020-11-14
 */

/**
 * 生成加号 - 不带圆圈
 * @param x x坐标
 * @param y y坐标
 * @param r 半径
 * @return path路径
 */
const createPlusOnly = (x, y, r) => [
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
    ['M', x, y - 2 * r + 2],
    ['L', x, y - 2],
]

/**
 * 生成减号 - 不带圆圈
 * @param x x坐标
 * @param y y坐标
 * @param r 半径
 * @return path路径
 */
const createMinusOnly = (x, y, r) => [
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
]

/**
 * 只有圆圈
 * @param x x坐标
 * @param y y坐标
 * @param r 半径
 * @return path路径
 */
const createCircleMarker = (x, y, r) => [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    // ['M', x + 2 - r, y - r],
    // ['L', x + r - 2, y - r],
    // ['M', x, y - 2 * r + 2],
    // ['L', x, y - 2],
]

/**
 * 生成加号 - 带圆圈
 * @param x x坐标
 * @param y y坐标
 * @param r 半径
 * @return path路径
 */
const createPlusMarker = (x, y, r) => [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
    ['M', x, y - 2 * r + 2],
    ['L', x, y - 2],
]

/**
 * 生成减号 - 带圆圈
 * @param x x坐标
 * @param y y坐标
 * @param r 半径
 * @return path路径
 */
const createMinusMarker = (x, y, r) => [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    // ['M', x + 2 - r, y - r],
    // ['L', x + r - 2, y - r],
    ['M', x, y - 2 * r + 2],
    ['L', x, y - 2],
]
interface Point {
    x: number;
    y: number;
}

const fullMarks = 10.0;
const low = 3.0;
const high = 8.0;
const margin = 30;
const borderWidth = 20;
const leftPoint: Point = { x: 100, y: 50 };
const rightPoint: Point = { x: 500, y: 50 };
// const diameter = 392 - margin * 2 - borderWidth; // 最外边边框的距离
const diameter = rightPoint.x - leftPoint.x;
const lowRatio = low / fullMarks;
const highRatio = high / fullMarks;

/**
 * 获取节点位置
 * @param ratio 比率
 */
const getNodePosition = (ratio: number): Point => {
    if (ratio === 0.5) {
        return {
            x: (rightPoint.x - leftPoint.x) / 2,
            y: (rightPoint.y - leftPoint.y) / 2
        }
    }

    if (ratio < 0.5) {
        const xDistance = diameter / 2 * Math.cos(Math.PI * ratio);
        const yDistance = diameter / 2 * Math.sin(Math.PI * ratio);
        const x = leftPoint.x + diameter / 2 - xDistance;
        const y = leftPoint.y - yDistance;
        return {
            x,
            y
        }
    }
    if (ratio > 0.5) {
        const xDistance = diameter / 2 * Math.cos(Math.PI * (1 - ratio));
        const yDistance = diameter / 2 * Math.sin(Math.PI * (1 - ratio));
        const x = rightPoint.x - diameter / 2 + xDistance;
        const y = rightPoint.y - yDistance;
        return {
            x,
            y
        }
    }

    return leftPoint;
};

/**
 * 获取偏移量
 * @param startScore 起始分
 * @param endScore 结束分
 */
const getCurveOffset = (startScore: number, endScore: number): number => {
    const startRatio = startScore / fullMarks;
    const endRatio = endScore / fullMarks;
    const midRatio = (startScore + (endScore - startScore) / 2) / fullMarks;
    const startPoint = getNodePosition(startRatio);
    const endPoint = getNodePosition(endRatio);
    const curveMidPoint = getNodePosition(midRatio);
    const straightMidPoint: Point = {
        x: (endPoint.x + startPoint.x) / 2,
        y: (endPoint.y + startPoint.y) / 2,
    }
    const distance = Math.sqrt((curveMidPoint.x - straightMidPoint.x) ** 2 + (curveMidPoint.y - straightMidPoint.y) ** 2)

    return distance;
};

getNodePosition(8 / 10)/*?*/
getCurveOffset(8, 10)/*?*/

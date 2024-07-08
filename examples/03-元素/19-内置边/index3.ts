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
const circleCenterPoint: Point = {
    x: (rightPoint.x + leftPoint.x) / 2,
    y: (rightPoint.y + leftPoint.y) / 2,
}

/**
 * 获取半径的弧度
 * @param ratio 
 * @returns 
 */
const getRadiusAngle = (): number => {
    const gap = borderWidth / 2 * 1.2; // 刚好对接上
    return gap / (diameter / 2);
};

/**
 * 获取节点位置[准确的位置, 左, 右]
 * @param ratio 比率
 */
const getNodePosition = (ratio: number): Point[] => {
    const angle = Math.PI * (1 - ratio);
    const x = circleCenterPoint.x + diameter / 2 * Math.cos(angle);
    const y = circleCenterPoint.y - diameter / 2 * Math.sin(angle);

    const difAngle = getRadiusAngle();

    const leftAngle = (angle + difAngle) >= Math.PI * 2 ? Math.PI * 2 : angle + difAngle;
    const xLeft = circleCenterPoint.x + diameter / 2 * Math.cos(leftAngle);
    const yLeft = circleCenterPoint.y - diameter / 2 * Math.sin(leftAngle);

    const rightAngle = (angle - difAngle) <= 0 ? 0 : angle - difAngle;
    const xRight = circleCenterPoint.x + diameter / 2 * Math.cos(rightAngle);
    const yRight = circleCenterPoint.y - diameter / 2 * Math.sin(rightAngle);

    return [
        { x, y },
        { x: xLeft, y: yLeft },
        { x: xRight, y: yRight },
    ];
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
        x: (endPoint[1].x + startPoint[2].x) / 2,
        y: (endPoint[1].y + startPoint[2].y) / 2,
    }
    const distance = Math.sqrt((curveMidPoint[0].x - straightMidPoint.x) ** 2 + (curveMidPoint[0].y - straightMidPoint.y) ** 2)

    return distance;
};

getNodePosition(low / fullMarks)
// getCurveOffset(0, low)
// getCurveOffset(low, high)
getCurveOffset(high, fullMarks)/*?*/

// getNodePosition(low / fullMarks)
// getCurveOffset(low, fullMarks)


// 总共25个
const getScaleCoords = () => {
    const scaleNums = 25;
    const unitAngle = Math.PI / scaleNums;
    const padding = 50;
    const scaleDiameter = diameter - padding * 2;
    const cords = [];

    for(let i=0; i<=scaleNums; i++) {
        const x = circleCenterPoint.x + scaleDiameter / 2 * Math.cos(unitAngle * i);
        const y = circleCenterPoint.y - scaleDiameter / 2 * Math.sin(unitAngle * i);

        cords.push({
            x, y
        })
    }

    return cords;
}

getScaleCoords()

const layoutBorderColor = '#d8d8d8'
const outerBoxBgColor = '#f4f5f6'
const outerBoxBorderColor = '#d8d8d8'
const dragBoxBgColor = '#ffffff'
const dargLineBorderColor = '#979797'
const headPortraitBoxBorderColor = '#d8d8d8'
const headPortraitBoxBgColor = '#d8d8d8'
const addPortraitColor = '#999999'
const addPortraitBgColor = '#d8d8d8'
const nameColor = '#111111'
const positionColor = '#111111'
const addNodeColor = '#2671db'
const addNodeBgColor = '#ffffff'
const foldNumsColor = '#ffffff'
const foldNumsLineBgColor = '#d8d8d8'
const foldNumsBoxBgColor = '#2671db'
const removeCircleNodeColor = '#e60a26'
const removeSubNodeColor = '#ffffff'

// 布局
const vGap = 16
const hGap = 48

// 外边的box
const outerBoxX = 0
const outerBoxY = 0
const outerBoxWidth = 220
const outerBoxHeight = 64
const outerBoxBorderWidth = 1

// 拖动滑块
const dragBoxX = outerBoxX + outerBoxBorderWidth
const dragBoxY = outerBoxY + outerBoxBorderWidth
const dragBoxWidth = 34
const dragBoxHeight = outerBoxHeight - outerBoxBorderWidth * 2

// 拖动滑块 - 横线
const dragLineWidth = 8
const dragLineHeight = 1
const dragLineBoxHeight = 9
const dragLineNums = 3
const dragLineX = dragBoxX + (dragBoxWidth - dragLineWidth) / 2
const dragLineY = dragBoxY + (dragBoxHeight - dragLineBoxHeight) / 2
const lineVGap = (dragLineBoxHeight - dragLineHeight * dragLineNums) / (dragLineNums - 1)

// 头像 - 边框
const headPortraitBoxHGap = 24
const headPortraitBoxRadius = 34 / 2
const headPortraitBoxBorderWidth = 1
const headPortraitBoxX = dragBoxX + dragBoxWidth + headPortraitBoxHGap
const headPortraitBoxY = outerBoxY + outerBoxBorderWidth + 14 + headPortraitBoxRadius

// 头像
const headPortraitWidth = headPortraitBoxRadius * 2 - headPortraitBoxBorderWidth * 2
const headPortraitHeight = headPortraitWidth
const headPortraitX = headPortraitBoxX - headPortraitBoxRadius + headPortraitBoxBorderWidth
const headPortraitY = headPortraitBoxY - headPortraitBoxRadius + headPortraitBoxBorderWidth
const clipRadius = headPortraitWidth / 2
const clipCenterX = headPortraitX + clipRadius
const clipCenterY = headPortraitY + clipRadius

// 添加头像
const addPortraitX = headPortraitX + headPortraitWidth / 2
const addPortraitY = headPortraitY + headPortraitHeight / 2
const addPortraitRadius = clipRadius
const addPortraitLineWidth = 1

// 姓名
const nameX = headPortraitBoxX + headPortraitBoxRadius + headPortraitBoxBorderWidth + 5
const nameY = headPortraitBoxY - headPortraitBoxRadius - headPortraitBoxBorderWidth - 4
const nameLineHeight = 24
const nameFontSize = 16

// 职位
const positionX = nameX
const positionY = nameY + nameLineHeight
const positionLineHeight = 18
const positionFontSize = 12

// 添加节点
const addNodeRadius = 6
const addNodeX = outerBoxX + outerBoxWidth + outerBoxBorderWidth * 2 - addNodeRadius / 2 + 1
const addNodeY = outerBoxY + outerBoxHeight / 2 + outerBoxBorderWidth * 2 - addNodeRadius / 2 + 1
const addNodeLineWidth = 1

// 正在添加节点
const addingNodeWidth = 16
const addingNodeHeight = 16
const addingNodeX = addNodeX - addingNodeWidth / 2
const addingNodeY = addNodeY - addingNodeHeight / 2

// 删除节点圆环
const removeNodeCircleRadius = 8
const removeNodeCircleCenterX = outerBoxX + outerBoxWidth
const removeNodeCircleCenterY = outerBoxY + outerBoxBorderWidth

// 折叠显示的数字
const foldNumsCenterX = addNodeX + hGap
const foldNumsOffsetY = 1
const foldNumsCenterY = addNodeY + foldNumsOffsetY
const foldNumsLineHeight = 16
const foldNumsFontSize = 10

// 折叠显示的线
const foldNumsLineX = addNodeX + addNodeRadius
const foldNumsLineY = addNodeY
const foldNumsLineWidth = foldNumsCenterX - foldNumsLineX
const foldNumsLineH = 1

// 折叠显示的线的背景
const foldNumsBoxCenterX = foldNumsCenterX
const foldNumsBoxHeight = 14
const foldNumsBoxOffsetY = 1
const foldNumsBoxY = foldNumsCenterY - foldNumsBoxHeight / 2 - foldNumsBoxOffsetY
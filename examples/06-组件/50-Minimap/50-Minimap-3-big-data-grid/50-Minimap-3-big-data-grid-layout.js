const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const layout = {
    type: 'grid',
    // 网格开始位置（左上角）
    begin: [20, 20],
    width: width - 20,
    height: height - 20,
}

export default layout

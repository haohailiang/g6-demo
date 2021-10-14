const handleClick = (evt) => {
    console.log('handleClick')
}

export const bindEvent = (graph) => {
    graph.on('click', handleClick)
}

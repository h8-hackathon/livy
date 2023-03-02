const convertArrayToArrayTodos = (arr) => {
  return arr.map(el => {
    return {
      activity: el,
      completed: false
    }
  })
}

module.exports = { convertArrayToArrayTodos }
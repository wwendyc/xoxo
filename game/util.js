const { Map } = require('immutable')

const checkforWinner = dic => {
  // console.log('checking dic:', JSON.stringify(dic, undefined, 2))
  if (dic['X'] === 3) return 'X'
  if (dic['O'] === 3) return 'O'
  return null
}

export function winner(board) {
  const NS = [0, 1, 2]
  let outcome
  // check horizontal
  for (let row of NS) {
    const dic = {}
    for (let col of NS) {
      let pos = board.getIn([row, col])
      dic[pos] = dic[pos] ? dic[pos] + 1 : 1
    }
    outcome = checkforWinner(dic)
    if (outcome) return outcome
  }

  // check verticals
  for (let col of NS) {
    const dic = {}
    for (let row of NS) {
      let pos = board.getIn([row, col])
      dic[pos] = dic[pos] ? dic[pos] + 1 : 1
    }
    outcome = checkforWinner(dic)
    if (outcome) return outcome
  }

  // check diagonals
  let dic = {}
  const negativeSlope = [[2, 0], [1, 1], [0, 2]]
  negativeSlope.forEach(([row, col]) => {
    let pos = board.getIn([row, col])
    dic[pos] = dic[pos] ? dic[pos] + 1 : 1
  })

  outcome = checkforWinner(dic)
  if (outcome) return outcome

  dic = {}
  const positiveSlope = [[0, 0], [1, 1], [2, 2]]
  positiveSlope.forEach(([row, col]) => {
    let pos = board.getIn([row, col])
    dic[pos] = dic[pos] ? dic[pos] + 1 : 1
  })
  outcome = checkforWinner(dic)
  if (outcome) return outcome

  // check for draw
  //    board done
  return board.size === 9 ? 'draw' : null
}

const test = () => {
  const ongoing = Map()
    .setIn([0, 0], 'X')
    .setIn([1, 0], 'O')
    .setIn([0, 1], 'X')
    .setIn([1, 1], 'O')

  const xWins = ongoing.setIn([0, 2], 'X')

  const oWins = ongoing
    .setIn([0, 0], 'O')
    .setIn([1, 1], 'O')
    .setIn([2, 2], 'O')

  console.log('null?', winner(ongoing))
  console.log('X?', winner(xWins))
  console.log('O?', winner(oWins))
}

export const bad = (state, action) => {
  if (action.player !== state.turn) {
    return 'Sorry, not your turn!'
  }
  if (action.payload.position.length !== 2) {
    return 'invalid input'
  }
  if (!validRange(action.payload.position)) {
    return 'Please enter a range between 0-2'
  }
}

const validRange = (arr) => {
  const validation = arr.map(coord => {
    return (coord < 0 || coord > 2) ? false : true
  })
  return (!validation[0] || !validation[1]) ? false : true
}

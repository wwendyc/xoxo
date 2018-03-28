const { Map } = require('immutable')

const checkforWinner = dic => {
  // console.log('checking dic:', JSON.stringify(dic, undefined, 2))
  if (dic['X'] === 3) return 'X'
  if (dic['O'] === 3) return 'O'
  return null
}

function winner(board) {
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

export default winner

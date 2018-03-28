import { Map } from 'immutable'
import evaluateWinner from './util'

export const MOVE = 'MOVE'

const turnReducer = (state = 'X', action) => {
  if (action.type === MOVE) {
    return state === 'X' ? 'O' : 'X'
  }
  return state
}

const boardReducer = (state = Map(), action) => {
  if (action.type === MOVE) {
    return state.setIn(action.payload.position, action.payload.player)
  }
  return state
}

const reducer = (state = {}, action) => {
  const board = boardReducer(state.board, action)
  console.log('new board', board)
  const winner = evaluateWinner(board)

  const newState = {
    board,
    winner,
    turn: turnReducer(state.turn, action)
  }

  console.log(JSON.stringify(newState, undefined, 2))
  return newState
}

export const move = (player, position) => {
  return { type: MOVE, payload: { position, player } }
}

export default reducer

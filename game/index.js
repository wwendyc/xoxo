import {Map} from 'immutable'

let board = Map()
const initialState = {board: board, turn: 'X'}

export const MOVE = 'MOVE'

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE:
      let turn = state.turn
      const board = state.board.setIn(action.payload.position, turn)
      turn === 'X' ? turn = 'O' : turn = 'X'
      return {board, turn}
    default:
      return state
  }
}

export const move = (player, position) => {
  return {type: MOVE, payload: {position, player}}
}

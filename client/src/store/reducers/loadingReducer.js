import { START_LOADING, END_LOADING } from '../actions/actionType.js'

const INITIAL_STATE = {
  isLoading: false,
}
export function loadingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
      }
    case END_LOADING:
      return {
        isLoading: false,
      }
    default:
      return state
  }
}

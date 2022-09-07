import { START_LOADING, END_LOADING } from '../actions/actionType'

export function startLoading() {
  return (dispatch) => {
    dispatch({ type: START_LOADING })
  }
}

export function endLoading() {
  return (dispatch) => {
    dispatch({ type: END_LOADING })
  }
}

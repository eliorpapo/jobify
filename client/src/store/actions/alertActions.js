import { DISPLAY_ALERT, CLEAR_ALERT } from '../actions/actionType'

export function displayAlert(payload) {
  return (dispatch) => {
    dispatch({ type: DISPLAY_ALERT, payload })
    dispatch(clearAlertTime())
  }
}

export function clearAlertTime() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
}

export function clearAlertNow() {
  return (dispatch) => {
    dispatch({ type: CLEAR_ALERT })
  }
}

import { TOGGLE_SIDEBAR } from '../actions/actionType'

export function toggleSidebar() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }
}

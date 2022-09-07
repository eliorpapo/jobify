import { DISPLAY_ALERT, CLEAR_ALERT } from '../actions/actionType'

const INITIAL_STATE = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}

export function alertReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.text,
      }
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    default:
      return state
  }
}

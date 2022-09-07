import {
  LOGOUT_USER,
  SETUP_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '../actions/actionType'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const INITIAL_STATE_USER = {
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
}

export function userReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
    case SETUP_USER_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      }
    case LOGOUT_USER:
      return {
        user: null,
        token: null,
        userLocation: '',
        jobLocation: '',
      }
    case UPDATE_USER_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
      }
    default:
      return state
  }
}

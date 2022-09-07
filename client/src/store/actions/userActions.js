import {
  START_LOADING,
  END_LOADING,
  SETUP_USER_SUCCESS,
  DISPLAY_ALERT,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
} from '../actions/actionType'

import { clearAlertNow, clearAlertTime } from './alertActions'
import axios from 'axios'

export const authFetch = axios.create({
  baseURL: '/api',
})

authFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.common['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  }
)

export function logoutUser() {
  removeUserFromLocalStorage()
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER })
  }
}

export function setupUser({ currentUser, endPoint }) {
  return async function (dispatch) {
    dispatch({
      type: START_LOADING,
    })
    dispatch({
      type: DISPLAY_ALERT,
      payload: {
        type: 'success',
        text: 'Security Check...',
      },
    })
    try {
      const { data } = await axios.post(`/api/auth/${endPoint}`, currentUser)
      const { user, token, location } = data

      addUserToLocalStorage({ user, token, location })
      await dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      })
      dispatch(clearAlertNow())
    } catch (error) {
      dispatch({
        type: DISPLAY_ALERT,
        payload: {
          type: 'danger',
          text: error.response.data.msg,
        },
      })
    }
    dispatch({
      type: END_LOADING,
    })
    dispatch(clearAlertTime())
  }
}

export function updateUser(currentUser) {
  return async (dispatch) => {
    dispatch({ type: START_LOADING })

    try {
      const { data } = await authFetch.put('/auth/updateUser', currentUser)
      // no token
      const { user, location, token } = data
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      dispatch({
        type: DISPLAY_ALERT,
        payload: {
          type: 'success',
          text: 'User Profile Updated!',
        },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: DISPLAY_ALERT,
          payload: {
            type: 'danger',
            text: error.response.data.msg,
          },
        })
      }
    }
    dispatch({ type: END_LOADING })
    dispatch(clearAlertTime())
  }
}

const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', location)
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('location')
}

import {
  SHOW_STATS_SUCCESS,
  START_LOADING,
  CLEAR_ALERT,
  END_LOADING,
} from '../actions/actionType'
import { authFetch, logoutUser } from './userActions'
import { clearAlertTime } from './alertActions'

export function showStats() {
  return async (dispatch) => {
    dispatch({ type: START_LOADING })
    dispatch({ type: CLEAR_ALERT })
    try {
      const { data } = await authFetch('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
      console.log(error.response)
      dispatch(logoutUser())
    }
    dispatch({ type: END_LOADING })
    dispatch(clearAlertTime())
  }
}

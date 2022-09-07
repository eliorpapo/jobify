import {
  HANDLE_CHANGE,
  CLEAR_VALUES,
  DISPLAY_ALERT,
  START_LOADING,
  END_LOADING,
  GET_JOBS_SUCCESS,
  CLEAR_FILTERS,
  SET_EDIT_JOB,
  CHANGE_PAGE,
} from '../actions/actionType'
import { clearAlertNow, clearAlertTime } from './alertActions'
import { authFetch, logoutUser } from './userActions'

export function handleChange({ name, value }) {
  return (dispatch) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
}

export function clearFilters() {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS })
  }
}

export function clearValues() {
  return (dispatch) => {
    dispatch({ type: CLEAR_VALUES })
  }
}

export function getJobs({ search, searchStatus, searchType, sort, page }) {
  return async function (dispatch) {
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch(clearAlertNow())
    dispatch({
      type: START_LOADING,
    })
    try {
      const { data } = await authFetch.get(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      dispatch(logoutUser())
    }
    dispatch({
      type: END_LOADING,
    })
    dispatch(clearAlertTime())
  }
}

export function createJob(position, company, jobLocation, jobType, status) {
  return async function (dispatch) {
    dispatch({
      type: START_LOADING,
    })
    dispatch({
      type: DISPLAY_ALERT,
      payload: {
        type: 'success',
        text: 'Creating Job...',
      },
    })
    try {
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({
        type: DISPLAY_ALERT,
        payload: {
          type: 'success',
          text: 'New Job Created!',
        },
      })
      // call function instead clearValues()
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
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

export function setEditJob(id) {
  return async function (dispatch) {
    dispatch({
      type: SET_EDIT_JOB,
      payload: { id },
    })
  }
}

export function editJob({
  position,
  company,
  jobLocation,
  jobType,
  status,
  editJobId,
}) {
  return async function (dispatch) {
    dispatch({
      type: START_LOADING,
    })
    try {
      await authFetch.put(`/jobs/${editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({
        type: DISPLAY_ALERT,
        payload: {
          type: 'success',
          text: 'Job Updated!',
        },
      })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
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

export function deleteJob(jobId) {
  return async function (dispatch) {
    dispatch({
      type: START_LOADING,
    })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      await dispatch(getJobs())
    } catch (error) {
      dispatch(logoutUser())
    } finally {
      dispatch({
        type: END_LOADING,
      })
    }
  }
}

export function changePage(page) {
  return async function (dispatch) {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
}

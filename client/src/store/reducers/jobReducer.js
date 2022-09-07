import {
  HANDLE_CHANGE,
  CLEAR_VALUES,
  GET_JOB_VALUES,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from '../actions/actionType'
const userLocation = localStorage.getItem('location')

export const INITIAL_STATE_JOB = {
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,

  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

export function jobReducer(state = INITIAL_STATE_JOB, action) {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      }
    case CLEAR_VALUES:
      return {
        ...INITIAL_STATE_JOB,
      }

    case GET_JOB_VALUES:
      return {
        ...state,
      }

    case CHANGE_PAGE:
      return { ...state, page: action.payload.page }

    case CLEAR_FILTERS:
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      }

    case GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      }

    case SET_EDIT_JOB: {
      const job = state.jobs.find((job) => job._id === action.payload.id)
      const { _id, position, company, jobLocation, jobType, status } = job
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      }
    }

    default:
      return state
  }
}

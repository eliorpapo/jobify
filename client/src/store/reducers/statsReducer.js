import { SHOW_STATS_SUCCESS } from '../actions/actionType'

const INITIAL_STATE = {
  stats: {},
  monthlyApplications: [],
}
export function statsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_STATS_SUCCESS:
      return {
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      }
    default:
      return state
  }
}

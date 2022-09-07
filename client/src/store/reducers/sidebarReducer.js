import { TOGGLE_SIDEBAR } from '../actions/actionType'

const INITIAL_STATE = {
  showSidebar: true,
}

export function sidebarReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        showSidebar: !state.showSidebar,
      }

    default:
      return state
  }
}

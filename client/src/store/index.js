import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { alertReducer } from './reducers/alertReducer'
import { loadingReducer } from './reducers/loadingReducer'
import { userReducer } from './reducers/userReducer'
import { sidebarReducer } from './reducers/sidebarReducer'
import { jobReducer } from './reducers/jobReducer'
import { statsReducer } from './reducers/statsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  alertModule: alertReducer,
  loadingModule: loadingReducer,
  userModule: userReducer,
  sidebarModule: sidebarReducer,
  jobModule: jobReducer,
  statsModule: statsReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

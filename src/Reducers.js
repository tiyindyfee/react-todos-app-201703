// Load Redux
import { compose, createStore, combineReducers } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'
import { routerReducer } from 'react-router-redux'

// Initial shared state
const initialSharedState = {
    todos: []
}

// Reducers
function state(state = initialSharedState, action = {}) {
    switch (action.type) {

        // Updates shared todos array
        case 'TODOS':
            return { ...state, todos: action.body }
        
        // No valid action.type was given
        default:
            return state
    }
}

// Combine reducers into a single store
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    state: state,
    routing: routerReducer
  }),
  composeEnhanced(
    autoRehydrate()
  )
)

persistStore(store, {storage: asyncSessionStorage})

export default store
// Load React
import React from 'react'

// Load React Router
import { Router, Route, browserHistory } from 'react-router'

// Load React Router Redux
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './Reducers'
const history = syncHistoryWithStore(browserHistory, store)

// Load page view components
import Todos from './components/Todos'
import Completed from './components/Completed'

// Configure routes
class Routes extends React.Component {
    render() {
        return <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Todos} />
                <Route path="/completed" component={Completed} />
            </Router>
        </Provider>
    }
}

export default Routes
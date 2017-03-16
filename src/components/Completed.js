import React from 'react'
import { connect } from 'react-redux'

import Layout from './Layout'
import Nav from './Nav'
import Todo from './Todo'

class Completed extends React.Component {
    render() {
        // Get our shared Redux todos array
        let todos = this.props.redux.todos

        // Filter the todos array down to only the completed ones
        todos = todos.filter(function(todoObject) {       
            return todoObject.completed === 'yes'
        })

        // Map the filtered array of object literals to React components, passing the object literal properties through as properties (props for short) to the component
        todos = todos.map(function(todo, key) {
            return <Todo key={key} {...todo} />
        })

        return <Layout>
            <Nav />
            <h5 className="text-center">Completed Todos</h5>
            <ul className="list-group">
                {todos}
            </ul>
        </Layout>
    }
}

// Map shared Redux state to props
const mapStateToProps = (redux) => {
    return {
        redux: redux.state
    }
}

// Export the component, connected to Redux, for other components to import
export default connect(mapStateToProps)(Completed)
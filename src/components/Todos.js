import React from 'react'
import { connect } from 'react-redux'

// Load components
import Layout from './Layout'
import AddTodo from './AddTodo'
import Todo from './Todo'
import Nav from './Nav'

class Todos extends React.Component {

    // Setup
    constructor(props) {
        // Call the React.Component constructor() method
        // Pass the props onto the constructor
        super(props)

        // Bind custom methods to this object context
        this.getTodos = this.getTodos.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.toggleComplete = this.toggleComplete.bind(this)

        // Initial state
        // We no longer use the local state object, instead Redux shared state object
        // this.state = {
        //     todos: []
        // }
    }

    // React lifecycle methods
    componentWillMount() {
        // Before we mount the component onto the page, initiate API call
        this.getTodos()
    }

    // API methods
    getTodos() {
        fetch('/api/v1/todos')
        .then(window.internetConnectionCheck)
        .then(response => response.json())

        // We no longer use the local state object, instead Redux shared state object
        // .then(todos => this.setState({todos: todos}))

        // Put the todo array in redux, must have a type: 'TODOS' for our Reducer to do the correction action, and a body property with our todos array in it
        .then(todos => this.props.dispatch({type: 'TODOS', body: todos}))
    }

    addTodo(description, category) {
        if (description !== '' && category !== '') {
            fetch('/api/v1/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo: description,
                    category: category,
                    completed: false
                })
            })
            .then(this.getTodos)
        }
    }

    toggleComplete(todoId, isComplete) {
        fetch('/api/v1/todos/' + todoId + '/' + (isComplete ? 'complete' : 'incomplete'))
        .then(this.getTodos)
    }

    // Required render method, runs initially and then again after any state changes
    render() {
        // Map array of todo data to Todo components

        // We no longer use the local state object, instead Redux shared state object
        // let todos = this.state.todos.map((todo, key) => <Todo key={key} {...todo} toggleComplete={this.toggleComplete} />)

        // Loop over Redux todos array
        let todos = this.props.redux.todos.map((todo, key) => <Todo key={key} {...todo} toggleComplete={this.toggleComplete} />)

        // If there are no todos, show a friendly message
        if (todos.length === 0) {
            todos = <div className="alert alert-success text-center">Please start by adding a todo above.</div>
        }

        // Return our Layout, wrapped around AddTodo and array of Todo components
        return <Layout>
            <Nav />
            <h5 className="text-center">New Todo</h5>
            <div className="well">
                <AddTodo addTodo={this.addTodo} />
            </div>
            <h5 className="text-center">All Todos</h5>
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
export default connect(mapStateToProps)(Todos)
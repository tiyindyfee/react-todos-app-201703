import React from 'react'

class AddTodo extends React.Component {
    // Enforce property requirements
    static propTypes = {
        addTodo: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.state = {
            description: '',
            category: ''
        }
    }

    // Handles the Add Todo button click, runs parent component addTodo method, and clears the state, causing a render()
    onClick(addTodo) {
        // Call parent addTodo method
        addTodo(this.state.description, this.state.category)

        // Sets state of fields, and triggers render() again
        this.setState({
            description: '',
            category: ''
        })
    }

    render() {
        return <div>
            <div className="form-group">
                <select className="form-control" value={this.state.category} onChange={(e) => this.setState({category: e.target.value})}>
                    <option value="">Select Category...</option>
                    <option value="fun">Fun</option>
                    <option value="home">Home</option>
                    <option value="school">School</option>
                    <option value="work">Work</option>
                </select>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} onKeyPress={(e) => (e.key === 'Enter' ? this.onClick(this.props.addTodo) : undefined)} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={()=> this.onClick(this.props.addTodo)}>Add Todo</button>
                    </span>
                </div>
            </div>
        </div>
    }
}

export default AddTodo
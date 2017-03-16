import React from 'react'

class Todo extends React.Component {
    // Enforce property value requirements
    static propTypes = {
        id: React.PropTypes.any.isRequired,
        completed: React.PropTypes.string.isRequired,
        todo: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        toggleComplete: React.PropTypes.func
    }

    // Define default property values
    static defaultProps = {
        id: 0,
        completed: 'yes',
        todo: 'This is an example of default prop values',
        category: 'Uncategorized'
    }

    render() {
        return <li className={this.props.toggleComplete ? 'list-group-item' : 'list-group-item list-group-item-success'}>
            <div className="row">

                <div className="col-xs-6">
                    <div className="checkbox">
                        <label className={this.props.toggleComplete && this.props.completed === 'yes' ? 'done' : ''}>
                            {this.props.toggleComplete ? <input type="checkbox" checked={this.props.completed === 'yes' ? true : false} onChange={(e) => this.props.toggleComplete(this.props.id, e.target.checked)} /> : ''}
                            {this.props.todo}
                        </label>
                    </div>
                </div>

                <div className="col-xs-6">
                    <div className="checkbox text-right">
                        <div className="label label-default">{this.props.category}</div>
                    </div>
                </div>

            </div>
        </li>
    }
}

export default Todo
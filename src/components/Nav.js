import React from 'react'
import { browserHistory } from 'react-router'

class Nav extends React.Component {
    render() {
        return <div className="well well-sm text-center">
                <div className="btn-group">
                    <button className="btn btn-default" type="button" onClick={() => browserHistory.push('/')}>All Todos</button>
                    <button className="btn btn-default" type="button" onClick={() => browserHistory.push('/completed')}>Completed Todos</button>
                </div>
            </div>
    }
}

export default Nav
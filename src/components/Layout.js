import React from 'react'
import EasyTransition from 'react-easy-transition'

// // Animations for EasyTransition
const startAnimation = {opacity: 0}
const endAnimation = {opacity: 1}

// Example 3D card flip:
// <EasyTransition path={location.pathname} transition="all 0.5s ease" initialStyle={location.pathname === '/' ? startLeftAnimation : startRightAnimation} finalStyle={location.pathname === '/' ? endLeftAnimation : endRightAnimation}>

// const startLeftAnimation = {opacity: 0.75, transform: 'rotateY(-180deg)'}
// const endLeftAnimation = {opacity: 1, transform: 'rotateY(0deg)'}
// const startRightAnimation = {opacity: 0.75, transform: 'rotateY(180deg)'}
// const endRightAnimation = {opacity: 1, transform: 'rotateY(0deg)'}

class Layout extends React.Component {
    render() {
        return <div className="container">

            <br/><h1 className="text-center">TODO</h1>

            <div className="row">
                <div className="col-sm-6 col-sm-offset-3" style={{perspective: '1000px'}}>
                    <EasyTransition path={location.pathname} transition="all 1.5s ease" initialStyle={startAnimation} finalStyle={endAnimation}>
                        {this.props.children}
                    </EasyTransition>
                </div>
            </div>
            
        </div>
    }
}

export default Layout
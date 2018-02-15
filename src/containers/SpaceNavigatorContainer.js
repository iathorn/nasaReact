import React, { Component } from 'react';
import SpaceNavigator from 'components/SpaceNavigator';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as apodActions from 'store/modules/apod';


class SpaceNavigatorContainer extends Component {

    handlePrev = () => {
        const { ApodActions } = this.props;
        ApodActions.previous();
    }

    handleNext = () => {
        const { ApodActions } = this.props;
        ApodActions.next();
    }

    render(){
        const { handlePrev, handleNext } = this;
        return(
            <div>
                <SpaceNavigator
                    onPrev={handlePrev}
                    onNext = { handleNext }/>
            </div>
        )
    }
}

export default connect(
    ({apod}) => ({
        date : apod.get('date'),
        maxDate : apod.get('maxDate')
    }),
    (dispatch) => ({
        ApodActions : bindActionCreators(apodActions, dispatch)
    })
)(SpaceNavigatorContainer);
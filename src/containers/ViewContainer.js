import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as apodActions from 'store/modules/apod';
import Viewer from 'components/Viewer';

class ViewContainer extends Component {

    req = null;

    getApod = async () => {
        const { ApodActions, loading, date } = this.props;
        loading && this.req.cancel();

        try{
            this.req = ApodActions.getApod(date || '');
            await this.req;

        }
        catch(e) {
            console.log(e);
        }

    }

    componentDidMount() {
        this.getApod();

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.date !== prevProps.date){
            this.getApod();
        }
    }

    render() {

        const { date, url, mediaType, loading } = this.props;

        return (
                <Viewer
                    date = {date}
                    url = { url }
                    mediaType = { mediaType }
                    loading = { loading }/>
        )
    }
}

export default connect(
    ({ apod, pender })  => ({
        date : apod.get('date'),
        url : apod.get('url'),
        mediaType : apod.get('mediaType'),
        loading : pender.pending['apod/GET_APOD']
    }),
    (dispatch) => ({
        ApodActions : bindActionCreators(apodActions, dispatch)
    })
)(ViewContainer);
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as api from 'lib/api';
import moment from 'moment';
import {pender} from 'redux-pender';

const PREVIOUS = 'apod/PREVIOUS';
const NEXT = 'apod/NEXT';
const GET_APOD = 'apod/GET_APOD';

export const previous = createAction(PREVIOUS);
export const next = createAction(NEXT);
export const getApod = createAction(GET_APOD, date => api.getAPOD(date));



const initialState = Map({
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
});

export default handleActions({
    [PREVIOUS] : (state, action) => state.update('date', date => (
        moment(date).subtract(1, 'days').format('YYYY-MM-DD')
    )),
    [NEXT] : (state, action) => state.update('date', date => (
        moment(date).add(1, 'days').format('YYYY-MM-DD')
    )),
    ...pender({
        type : GET_APOD,
        onSuccess : (state, action) => {
            const { payload : response } = action;
            const { date, url, media_type : mediaType } = response.data;

            let temp = state;

            if(!temp.get('date')) {
                temp = temp.set('date', date).set('maxDate', date);
            }

            return temp.set('mediaType', mediaType).set('url', url);


        }


    })
}, initialState);
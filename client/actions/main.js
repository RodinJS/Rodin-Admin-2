/**
 * Created by Reinchard on 7/3/2017.
 */
import {counts} from  '../requests/main';
import * as types from "../constants/index";

export function getCountsSuccess(payload) {
    return {type: types.COUNTS_SUCCESS, payload: payload.data};
}

export function getCountsFail(err) {
    return {type: types.COUNTS_FAIL, payload: err};
}

export function getCounts() {
    return dispatch => counts()
        .then(payload => dispatch(getCountsSuccess(payload)))
        .catch(err => dispatch(getCountsFail(err)))
}
/**
 * Created by Reinchard on 6/23/2017.
 */
import * as request from '../requests/modules';
import * as types from "../constants/index";

export function getModulesSuccess(payload) {
    return {type: types.GET_MODULES_SUCCESS, payload: payload.data}
}

export function getModulesFail(err) {
    return {type: types.GET_MODULES_FAIL, payload: err.data}
}

export function getModules() {
    return dispatch => request.getModules()
        .then(payload => dispatch(getModulesSuccess(payload)))
        .catch(err => dispatch(getModulesFail(err)))
}



export function getModuleSuccess(payload) {
    return {type: types.GET_MODULE_SUCCESS, payload: payload.data}
}

export function getModuleFail(err) {
    return {type: types.GET_MODULE_FAIL, payload: err.data}
}
export function getModule(id) {
    return dispatch => request.getModule(id)
        .then(payload => dispatch(getModuleSuccess(payload)))
        .catch(err => dispatch(getModuleFail(err)))
}

// Module Actions
function onRejectSuccess(payload) {
    return {type: types.ON_REJECT_SUCCESS, payload: payload.data}
}

function onRejectFail(err) {
    return {type: types.ON_REJECT_FAIL, payload: err.data}
}

function onReject(data) {
    return dispatch => request.onReject(data)
        .then(payload => dispatch(onRejectSuccess(payload)))
        .catch(err => dispatch(onRejectFail(err)))
}
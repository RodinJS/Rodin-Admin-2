/**
 * Created by Reinchard on 6/23/2017.
 */

import {getModule, getModules} from '../requests/modules';
import * as types from "../constants/index";

export function getAllModulesSuccess(payload) {
    return {type: types.GET_MODULES_SUCCESS, payload: payload.data}
}

export function getAllModulesFail(err) {
    return {type: types.GET_MODULES_FAIL, payload: err.data}
}

export function getAllModules() {
    return dispatch => getModules()
        .then(payload => dispatch(getAllModulesSuccess(payload)))
        .catch(err => dispatch(getAllModulesFail(err)))
}

export function getSingleModuleSuccess(payload) {
    return {type: types.GET_MODULE_SUCCESS, payload: payload.data}
}

export function getSingleModuleFail(err) {
    return {type: types.GET_MODULE_FAIL, payload: err.data}
}
export function getSingleModule(id) {
    return dispatch => getModule(id)
        .then(payload => dispatch(getSingleModuleSuccess(payload)))
        .catch(err => dispatch(getSingleModuleFail(err)))
}
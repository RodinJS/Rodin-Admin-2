/**
 * Created by Reinchard on 6/23/2017.
 */
import * as types from "../constants/index";
import {get, list, update, remove} from '../requests/users';

export function getListSuccess(payload) {
    return {type: types.GET_USERS_SUCCESS, payload: payload.data}
}

export function getListFail(err) {
    return {type: types.GET_USERS_FAIL, payload: err.data}
}

export function getList({sort = '-createdAt', limit =  50}) {
    return dispatch => list({sort, limit})
        .then(payload => dispatch(getListSuccess(payload)))
        .catch(err => dispatch(getListFail(err)));
}

export function getUserSuccess(payload) {
    return {type: types.GET_USER_SUCCESS, payload: payload.data}
}

export function getUserFail(err) {
    return {type: types.GET_USER_SUCCESS, payload: err.data}
}

export function getUser(username) {
    return dispatch => get(username)
        .then(payload => dispatch(getUserSuccess(payload)))
        .catch(err => dispatch(getUserFail(err)))
}

// export function updateSingeUserSuccess(payload) {
//     return {type: types.UPDATE_USER_SUCCESS, payload: payload.data}
// }
//
// export function updateSingeUserFail(err) {
//     console.log(err)
//     return {type: types.UPDATE_USER_FAIL, payload: err.data}
// }

export function updateUser(username, data) {
    return dispatch => update(username, data)
        // .then(payload => dispatch(updateSingeUserSuccess(payload)))
        // .catch(err => dispatch(updateSingeUserFail(err)))
}

export function removeUser(username) {
    return dispatch => remove(username)
        .then((res) =>dispatch({type: types.REMOVE_USER, payload: res.data, key: username}))
}
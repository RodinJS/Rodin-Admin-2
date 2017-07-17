/**
 * Created by Reinchard on 6/23/2017.
 */
import * as types from "../constants/index";
import * as request from '../requests/users';

export function getUsersSuccess(payload) {
    return {type: types.GET_USERS_SUCCESS, payload: payload.data}
}

export function getUsersFail(err) {
    return {type: types.GET_USERS_FAIL, payload: err.data}
}

export function getUsers({sort = '-createdAt', limit =  50}) {
    return dispatch => request.getUsers({sort, limit})
        .then(payload => dispatch(getUsersSuccess(payload)))
        .catch(err => dispatch(getUsersFail(err)));
}

export function getUserSuccess(payload) {
    return {type: types.GET_USER_SUCCESS, payload: payload.data}
}

export function getUserFail(err) {
    return {type: types.GET_USER_SUCCESS, payload: err.data}
}

export function getUser(username) {
    return dispatch => request.getUser(username)
        .then(payload => dispatch(getUserSuccess(payload)))
        .catch(err => dispatch(getUserFail(err)))
}

export function updateUser(username, data) {
    return dispatch => request.updateUser(username, data)
}

export function removeUser(username) {
    return dispatch => request.removeUser(username)
        .then((res) =>dispatch({type: types.REMOVE_USER, payload: res.data, key: username}))
}
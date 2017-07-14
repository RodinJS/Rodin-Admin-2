import * as types from '../constants/index';
import * as request from '../requests/login';

export function loginSuccess(payload) {
    return {type: types.LOGIN_SUCCESS, payload: payload.data}
}

export function loginFail(err) {
    return {type: types.LOGIN_FAIL, payload: err}
}

export function login(data) {
    return dispatch => request.login(data)
        .then(payload => dispatch(loginSuccess(payload)))
        .catch(err => dispatch(loginFail(err)))
}

export function logOut() {
    return dispatch => request.logout()
        .then(() => dispatch({type: types.LOGOUT, payload: {}}))
}
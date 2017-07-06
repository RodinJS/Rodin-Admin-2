import * as types from '../constants/index';
import {signIn, signOut} from '../requests/login';

export function loginSuccess(payload) {
    return {type: types.LOGIN_SUCCESS, payload: payload.data}
}

export function loginFail(err) {
    return {type: types.LOGIN_FAIL, payload: err}
}

export function login(data) {
    return dispatch => signIn(data)
        .then(payload => dispatch(loginSuccess(payload)))
        .catch(err => dispatch(loginFail(err)))
}

export function logOut() {
    return dispatch => signOut()
        .then(() => dispatch({type: types.LOGOUT, payload: {}}))
}
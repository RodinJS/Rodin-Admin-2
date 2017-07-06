/**
 * Created by Reinchard on 6/23/2017.
 */
import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../constants/index';
export default function authReducer(state = {payload: {token: localStorage.getItem('token')}}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return Object.assign({}, action)
        }
        case LOGIN_FAIL: {
            return Object.assign({}, action)
        }
        case LOGOUT: {
            return Object.assign({}, action)
        }
        default:
            return state;
    }
}
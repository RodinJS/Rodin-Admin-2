/**
 * Created by Reinchard on 6/26/2017.
 */
import * as type from '../../constants/index';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case type.GET_USER_SUCCESS: {
            return Object.assign({}, action.payload);
        }
        case type.GET_USER_FAIL: {
            return Object.assign({}, action.payload);
        }
        default:
            return state
    }
}

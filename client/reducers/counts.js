/**
 * Created by Reinchard on 7/3/2017.
 */

import {COUNTS_SUCCESS, COUNTS_FAIL} from '../constants/index';
export default function countsReducer(state = {}, action) {
    switch (action.type) {
        case COUNTS_SUCCESS: {
            return Object.assign({}, action)
        }
        case COUNTS_FAIL: {
            return Object.assign({}, action)
        }
        default:
            return state;
    }
}
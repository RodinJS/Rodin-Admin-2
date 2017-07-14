/**
 * Created by Reinchard on 7/10/2017.
 */
import { GET_MODULE_FAIL, GET_MODULE_SUCCESS} from '../../constants/index';

export default function moduleReducer(state = {}, action) {
    switch (action.type) {
        case GET_MODULE_SUCCESS: {
            return Object.assign({}, action.payload);
        }
        case GET_MODULE_FAIL: {
            return Object.assign({}, action.payload);
        }
        default:
            return state
    }
}

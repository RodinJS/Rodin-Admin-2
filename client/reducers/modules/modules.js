/**
 * Created by Reinchard on 6/23/2017.
 */
import { GET_MODULES_FAIL, GET_MODULES_SUCCESS} from '../../constants/index';

export default function modulesReducer(state = [], action) {
    switch (action.type) {
        case GET_MODULES_SUCCESS: {
            return [...action.payload];
        }
        case GET_MODULES_FAIL: {
            return [...action.payload];
        }
        default:
            return state
    }
}

/**
 * Created by Reinchard on 7/10/2017.
 */
import {GET_PROJECTS_SUCCESS} from '../../constants/index';
export default function projectsReducer(state = [], action) {
    switch (action.type) {
        case GET_PROJECTS_SUCCESS: {
            return [...action.payload]
        }
        default:
            return state;
    }
}
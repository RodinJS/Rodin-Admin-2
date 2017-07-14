/**
 * Created by Reinchard on 7/10/2017.
 */
import * as type from '../constants/index';
import * as request from '../requests/projects';

export function getProjects() {
    return dispatch => request.getProjects()
}
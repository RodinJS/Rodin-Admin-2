/**
 * Created by Reinchard on 7/10/2017.
 */
import * as types from '../constants/index';
import * as request from '../requests/projects';

export function getProjectsSuccess(payload) {
    return {type: types.GET_PROJECTS_SUCCESS, payload: payload.data}
}

export function getProjectsFail(err) {
    return {type: types.GET_PROJECTS_FAIL, payload: err.data}
}

export function getProjects() {
    return dispatch => request.getProjects()
        .then((data) => dispatch(getProjectsSuccess(data)))
        .catch((err) => dispatch(getProjectsFail(err)))
}


export function getProjectSuccess(payload) {
    return {type: types.GET_PROJECT_SUCCESS, payload: payload.data}
}

export function getProjectFail(err) {
    return {type: types.GET_PROJECT_FAIL, payload: err.data}
}

export function getProject(id) {
    return dispatch => request.getProject(id)
        .then((data) => dispatch(getProjectSuccess(data)))
        .catch((err) => dispatch(getProjectFail(err)))
}


export function removeProject(id) {
    return dispatch => request.removeProject(id)
        .then((res) =>dispatch({type: types.REMOVE_PROJECT, payload: res.data, key: id}))
}

export function updateProject(id, data) {
    return dispatch => request.updateProject(id, data)

}
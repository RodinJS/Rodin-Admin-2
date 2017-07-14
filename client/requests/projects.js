/**
 * Created by Reinchard on 7/10/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';
const rootURL = '/api/project';

export function getProjects() {
    return axiosInstance.get(`${rootURL}`);
}

export function getProject(id) {
    return axiosInstance.get(`${rootURL}/${id}`);
}

export function removeProject(id) {
    return axiosInstance.delete(`${rootURL}/${id}`);
}

export function updateProject(id, data) {
    return axiosInstance.put(`${rootURL}/${id}`, data);
}

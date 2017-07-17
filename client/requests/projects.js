/**
 * Created by Reinchard on 7/10/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';
const rootURL = '/api/admin/projects';

export function getProjects() {
    return axiosInstance.get(`${rootURL}`);
}

export function getProject(id) {
    return axiosInstance.get(`${rootURL}/${id}`);
}

export function removeProject(owner,id) {
    return axiosInstance.delete(`${rootURL}/${owner}/${id}`);
}

export function updateProject(id, data) {
    return axiosInstance.put(`${rootURL}/${id}`, data);
}

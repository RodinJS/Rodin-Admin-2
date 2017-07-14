/**
 * Created by Reinchard on 7/10/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';
const rootURL = '/api/project';

export function getProjects() {
    return axiosInstance.get(`${rootURL}`);
}
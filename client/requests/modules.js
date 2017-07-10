/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';

export function getModules() {
    return axiosInstance.get('/api/modules/');
}

export function getModule(id) {
    return axiosInstance.get(`/api/modules/hook/${id}`);
}
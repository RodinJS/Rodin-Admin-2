/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';

export function getModules() {
    return axiosInstance.get('/api/admin/modules');
}

export function getModule(moduleId) {
    return axiosInstance.get(`/api/admin/modules/${moduleId}`);
}

export function onReject(data) {
    return axiosInstance.post('/api/getModule/getModules/status/Rejected', data)
}
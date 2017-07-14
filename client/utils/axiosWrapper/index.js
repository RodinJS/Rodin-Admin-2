import axios from "axios";

const getCookie = function(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

const config = {
    baseURL: '/', // all requests are routed to /api/something....
    timeout: 60000, // default timeout of 60 seconds
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate", "Expires": "0", "Pragma": "no-cache" } // don't cache getModule requests, we had an issue with IE 11 caching getModule requests
};

const axiosInstance = axios.create(config);

// before the request is sent to the server, add jwt to the Authorization header
axiosInstance.interceptors.request.use(config => {
    config.headers['x-access-token'] = getCookie('token');

    return config;
}, function (err) {
    return Promise.reject(err);
});

// whenever a response is received from the node layer
axiosInstance.interceptors.response.use(response => {
    return response;
}, function (error){
    // handle other types of response errors here
    return Promise.reject(error);
});

export default axiosInstance;

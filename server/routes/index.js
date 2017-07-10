/**
 * Created by xgharibyan on 6/7/17.
 */


const express = require('express');
const _ = require('lodash');
const router = express.Router();
const request = require('request-promise');
const conf = require('../env');

function setOptions(req, res, next){
    const isModuleRoute = _.includes(req.originalUrl, '/api/module/');
    const rootUrl = isModuleRoute ? conf.MODULE : conf.API;
    const urlParam = isModuleRoute ? req.originalUrl.replace('/api/module/', '/') : req.originalUrl;
    const options = {
        uri: `${rootUrl}${urlParam}`,
        headers: _.pick(req.headers, ['x-access-token']),
        json: true,
    };

    if (req.method !== 'GET') Object.assign(options, {method: req.method});
    if (Object.keys(req.body).length > 0) Object.assign(options, {body: req.body});
    if (Object.keys(req.query).length > 0) Object.assign(options, {qs: req.query});
    req.options = options;
    return next();
}

function sendRequest(req, res, next) {
    request(req.options)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            res.status(400).json(err.error)
        })
}


/* GET home page. */
router
    .get('/', (req, res, next) => res.status(200).json('ok'));

router
    .get('/module/*', setOptions, sendRequest)
    .post('/module/*', setOptions, sendRequest)


    .get('/*', setOptions, sendRequest)
    .post('/*', setOptions, sendRequest)
    .put('/*', setOptions, sendRequest)
    .delete('/*', setOptions, sendRequest);

module.exports = router;

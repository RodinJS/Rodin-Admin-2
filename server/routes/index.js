/**
 * Created by xgharibyan on 6/7/17.
 */


const express = require('express');
const router = express.Router();



/* GET home page. */
router
    .get('/', (req, res, next) => res.status(200).json('ok'))

module.exports = router;

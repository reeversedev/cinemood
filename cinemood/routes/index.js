var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const Moods = require('../models/moods-model');

var mdb = require('moviedb')('93fc3e24fc19362e1d839b8ea32d2d7f');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/discovertv', (req, res) => {
    mdb.discoverTv({}, (err, data) => {
        res.json(data);
    });
});

router.get('/discover/:id', (req, res) => {
    mdb.tvInfo({
        id: req.params.id
    }, (err, data) => {
        res.json(data);
    });
});


router.get('/getMood/:id', (req, res) => {
    let mediaId = req.params.id;
    console.log('Entered API.');
    Moods.getMood(mediaId, (err, response) => {
        if(err) {
            console.log(err);
        }
        res.json(response);
    });
});

module.exports = router;
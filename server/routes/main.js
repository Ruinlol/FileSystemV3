var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');
var user;
router.post('/', function(req, res) {


    // Renaming the uploaded file
    var smth = req.file.originalname.split('.');
    var filePath = './uploads/' + req.file.filename
    fs.rename(filePath, filePath + '.' + smth.pop())
    console.log(req.session.user);
    console.log();
    res.send();
});

module.exports = router;

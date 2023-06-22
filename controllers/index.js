/*
Filename: index.js
Author: Kevin Lamanna
StudentID: 301224451
Web App name: https://kevin-lamanna-comp229-midterm-fd3a782db0d9.herokuapp.com/
*/

exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);
    res.render('index', { 
        title: 'Home',
        userName: req.user ? req.user.username : ''
    });
};
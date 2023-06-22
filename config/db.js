/*
Filename: db.js
Author: Kevin Lamanna
StudentID: 301224451
Web App name: https://kevin-lamanna-comp229-midterm-fd3a782db0d9.herokuapp.com/
*/

// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://dbadmin:PwefQFdhYP8bDRTf@clustercomp229.1n2r5i0.mongodb.net/car_dealership";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}
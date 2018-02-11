const MG = require('mongoose'); 

function connectDB(){
    MG.connect('mongodb://127.0.0.1/touhou', {useMongoClient: true}); //mongod --dbpath C:\data\mongodb voor localhost
    let db = MG.connection;

    db.on('connected', () => {
        console.log('Connected to Database');
    });

    db.on('error', (err) => {
        console.log(err);
    });
}

module.exports = connectDB;
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://ratrateroo:UltraPassword@moviecollector-icuyt.mongodb.net/movie?retryWrites=true&w=majority'
        )
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        })
        .catch(error => {
            console.log(error);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;




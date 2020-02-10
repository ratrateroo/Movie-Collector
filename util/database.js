const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

MongoClient.connect(
    'mongodb+srv://ratrateroo:UltraPassword@moviecollector-icuyt.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(result => {
        console.log('Connected');
    })
    .catch(error => {
        console.log(error);
    });



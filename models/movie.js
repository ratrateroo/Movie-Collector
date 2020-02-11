const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;



module.exports = class Movie {
    constructor(title, year, imageUrl = "badboysforlife.jpg", id, userId) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.year = year;
        this._id = id ? new mongodb.ObjectId(id): null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        return db.collection('movies')
        .insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });      
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('movies').find().toArray()
        .then(movies => {
            console.log(movies);
            return movies
        })
        .catch(error => {
            console.log(error);
        });
    }

    static findById(movieId) {
        const db = getDb();
        return db.collection('movies')
        .find({ _id: new mongodb.ObjectId(movieId) })
        .next()
        .then(movie => {
            console.log(movie);
            return movie
        })
        .catch(error => {
            console.log(error);
        });;
      }
};
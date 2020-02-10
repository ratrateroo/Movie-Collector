const getDb = require('../util/database').getDb;

//const movies = [];
const fs = require('fs');
const path = require('path');

const m = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'movies.json'
    );

const getMoviesFromFile = cb => {    
    fs.readFile(m, (error, fileContent) => {
        if (error) {
         cb([]);
        } else {
         cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Movie {
    constructor(title, year, imageUrl = "badboysforlife.jpg") {
        this.title = title;
        this.imageUrl = imageUrl;
        this.year = year;
    }

    save() {
        const db = getDb();
        db.collection('movies').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });      
    }

    static fetchAll(cb) {
        getMoviesFromFile(cb);
    }

    static findById(id, cb) {
        getMoviesFromFile(movies => {
          const movie = movies.find(m => m.id === id);
          cb(movie);
        });
      }
};
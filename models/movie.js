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
    constructor(title, imageUrl, year) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.year = year;
    }

    save() {
        this.id = Math.random().toString();
        getMoviesFromFile(movies => {
            movies.push(this);
            fs.writeFile(m, JSON.stringify(movies), (error) => {
                console.log(error);
            });            
        });        
    }

    static fetchAll(cb) {
        getMoviesFromFile(cb);
    }
};
//const movies = [];
const fs = require('fs');
const path = require('path');

const getMoviesFromFile = cb => {
    const m = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'movies.json'
        );
    fs.readFile(m, (error, fileContent) => {
        if (error) {
         cb([]);
        } else {
         cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }

    save() {
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
}
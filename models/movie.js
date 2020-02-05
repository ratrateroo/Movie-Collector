//const movies = [];
const fs = require('fs');
const path = require('path');
module.exports = class Product {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }

    save() {
        //movies.push(this);
        const m = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'movies.json'
            );
        fs.readFile(m, (error, fileContent) => {
            let movies = [];
            if (!error) {
                movies = JSON.parse(fileContent);
            }
            movies.push(this);
            fs.writeFile(m, JSON.stringify(movies), (error) => {
                console.log(error);
            })
        })
    }

    static fetchAll(cb) {
        const m = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'movies.json'
            );
        fs.readFile(m, (error, fileContent) => {
            if (error) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    
    }
}
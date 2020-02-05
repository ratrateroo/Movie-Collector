const movies = [];
module.exports = class Product {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }

    save() {
        movies.push(this);
    }

    static fetchAll() {
        return movies;
    }
}
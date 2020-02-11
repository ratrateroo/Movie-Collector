const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, favorite) {
        this.name = username;
        this.email = email;
        this.favorite = favorite;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToFavorite(movie) {
        const favoriteList = this.favorite.items.findIndex(favoriteMovie => {
            return favoriteMovie._id === movie._id;
        });
        const updatedFavorite = { items: [{...movie}] };
    }

    static findById(userId) {
        const db = getDb();
        return db
        .collection('users')
        .findOne({ _id: new ObjectId(userId)})
        .then(user => {
            console.log(user);
            return user
        })
        .catch(error => console.log(error));
    }
}

module.exports = User;
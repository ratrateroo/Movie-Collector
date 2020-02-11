const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, favorite, id) {
        this.name = username;
        this.email = email;
        this.favorite = favorite;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToFavorite(movie) {
        const favoriteMovieExist = this.favorite.items.findIndex(favoriteMovie => {
            return favoriteMovie.movieId.toString() === movie._id.toString();
        });
        let newQuantity = 1;

        if (favoriteMovieExist) {
            return;
        }else{
            const updatedFavorite = { items: [{movieId: new ObjectId(movie._id)}] };
            const db = getDb();
            return db.collection('users').updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { favorite: updatedFavorite } }
                );
        }

        
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
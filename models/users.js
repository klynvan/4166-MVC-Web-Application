const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, requried: [true, 'cannot be empty'] },
    lastName: { type: String, requried: [true, 'cannot be empty'] },
    email: { type: String, requried: [true, 'cannot be empty'], unique: true },
    password: { type: String, requried: [true, 'cannot be empty'] },
});

// replace plaintext pass with hashed password before saving doc in database
//pre middleware

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));

});

//implement a method to compare the login password and the has stored in the database

userSchema.methods.comparePassword = function (loginPassoword) {
    return bcrypt.compare(loginPassoword, this.password);
}

module.exports = mongoose.model('User', userSchema);
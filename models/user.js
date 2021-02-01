const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    municipality: {
        type: String,
    },
    shoppingCart: {
        type: Array
    }
});

userSchema.pre('save', function(next) {
    let user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
    .catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    });
});

userSchema.methods.passwordComparison = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model("User", userSchema);
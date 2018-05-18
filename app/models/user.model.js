const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    forename: String,
    lastname: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
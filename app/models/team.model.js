const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: {type: String, required:true},
    logo: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);
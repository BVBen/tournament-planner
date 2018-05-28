const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    goalHomeTeam: Number,
    goalAwayTeam: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Result', ResultSchema);
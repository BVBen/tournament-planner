const mongoose = require('mongoose');
const Team = require('../models/team.model.js');
const Result = require('../models/result.model.js');

const MatchSchema = mongoose.Schema({
    homeTeam: {type: Team.schema, default:{name: "Home Team"}},
    awayTeam: {type: Team.schema, default: {name: "Away Team"}},
    result: Result.schema,
    dateTime: {type: Date},
    group: String,
    matchDay: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema);
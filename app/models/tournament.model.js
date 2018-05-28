const Team = require('../models/team.model.js');

const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema({
    key: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    groupCount: Number,
    teams: [{type: Team.schema},{_id: true}],
    matches: [{type: mongoose.Schema.ObjectId, ref: 'Match'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Tournament', TournamentSchema);
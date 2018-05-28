const Tournament = require('../models/tournament.model.js');
const Match = require('../models/match.model.js');
const result = require('../models/result.model.js');
const team = require('../models/team.model.js');

// Create and Save a new tournament
exports.create = (req, res) => {
    // Validate request
    if (!req.body.key || !req.body.title) {
        return res.status(400).send({
            message: "Title and the tournament Key can not be empty"
        });
    }

    // Create a Tournament
    const tournament = new Tournament({
        key: req.body.key,
        title: req.body.title,
        groupCount: req.body.groupCount,
        matches: []
    });

    // Save Tournament in the database
    tournament.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tournament."
            });
        });
};

// Retrieve and return all Tournaments from the database.
exports.findAll = (req, res) => {
    Tournament.find()
        .then((tournament) => {
            res.send(tournament);
        })
        .catch((err) => {
            message.err.message || "Some error occured while retrieving tournaments";
        });
};

// Find a single tournament with a tournamentId
exports.findOne = (req, res) => {
    Tournament.findById(req.params.tournamentId)
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }
            res.send(tournament);
        })
        .catch((err) => {
            res.status(500).send({
               message: err.message || "Some error occured while retrieving tournaments"
            });
        })
};

// Update a tournament identified by the tournamentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.key) {
        return res.status(400).send({
            message: "tournament key can not be empty"
        });
    }

    tournament.findByIdAndUpdate(req.params.tournamentId, {
            key: req.body.key,
            title: req.body.title,
            groupCount: req.body.groupCount,
            teams: req.body.teams
        }, {
            new: true
        })
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }
            res.send(tournament);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }
            return res.status(500).send({
                message: "Error updating tournament with id " + req.params.tournamentId
            });
        });
};

// Delete a tournament with the specified tournamentId in the request
exports.delete = (req, res) => {
    tournament.findByIdAndRemove(req.params.tournamentId)
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }

            res.status(204).send({});
        });

    return res.status(500).send({
        message: "Could not delete tournament with id " + req.params.tournamentId
    });
};
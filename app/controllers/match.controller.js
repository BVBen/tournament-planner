const Match = require('../models/match.model.js');
const Tournament = require('../models/tournament.model.js');
const Result = require('../models/result.model.js');
const Team = require('../models/team.model.js');
const ObjectId = require('mongoose').Schema.ObjectId;

// Create and Save a new match for the tournament
exports.create = (req, res) => {

    // Create a Match
    const match = new Match({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        result: req.body.result,
        dateTime: req.body.dateTime,
        matchDay: req.body.matchDay,
        group: req.body.group
    });

    Tournament.findById(req.params.tournamentId)
        .then((tournament) => {
            if(!tournament.matches) {
                tournament.matches = [];
            }
            tournament.matches.push(match);
            tournament.save().then((tournament) => {
                match.save().then((match)=> {
                     res.send(match);
                });
               
            }).catch((err) => {
                res.status(204).send({
                    message: "Match konnte nicht erstellt werden"
                });
            });
        })
        .catch((err) => {
            res.status(404).send({
                message: "Turnier nicht gefunden"
            });
        });
};

// Retrieve and return all Tournaments from the database.
exports.findAll = (req, res) => {
    Tournament.findOne({
            _id: req.params.tournamentId
        }).populate("matches").exec()
        .then((tournament) => {
            res.send(tournament.matches);
        })
        .catch((err) => {
            return res.status(404).send({
                message: err.message || "Some error occured while retrieving matchs"
            });
        });
};

exports.findOne = (req, res) => {
    Tournament.find({
            "_id": req.params.tournamentId,
            "matches": req.params.matchId
        }, {"matches.$": 1}).populate("matches")
        .then((tournament) => {
            let match = tournament[0].matches;
            if (!match) {
                res.status(404).send({
                    message: "Match konnte nicht gefunden werden"
                })
            }
            res.send(match);
        })
        .catch((err) => {
            return res.status(404).send({
                message: err.message || "Some error occured while retrieving match with id " + req.params.matchId
            });
        });
}

// Update a match identified by the tournamentId and the matchId in the request
exports.update = (req, res) => {

    Tournament.find({
        "_id": req.params.tournamentId,
        "matches": req.params.matchId
    }, {"matches.$": 1}).populate("matches")
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }
            
            let match = tournament[0].matches[0];
            if (!match) {
                return res.status(404).send({
                    message: "match not found with id " + req.params.matchId
                });
            }
            match.set(req.body);

            match.save().then((match) => {
                res.send(match);
            })

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.matchId
                });
            }
            return res.status(500).send({
                message: "Error updating match with id " + req.params.matchId
            });
        });
};

// Updates a tournament match result
exports.updateResult = (req, res) => {
    Tournament.find({
        "_id": req.params.tournamentId,
        "matches": req.params.matchId
    }, {"matches.$": 1}).populate("matches")
    .then((tournament) => {
        if (!tournament) {
            return res.status(404).send({
                message: "tournament not found with id " + req.params.tournamentId
            });
        }
        
        let match = tournament[0].matches[0];
        if (!match) {
            return res.status(404).send({
                message: "match not found with id " + req.params.matchId
            });
        }

        match.result = new Result(req.body);
        match.save().then((match) => {
            res.send(match);
        })
    });
}

// Delete a tournament with the specified tournamentId in the request
exports.delete = (req, res) => {
    Tournament.find({
        "_id": req.params.tournamentId,
        "matches": req.params.matchId
    }, {"matches.$": 1}).populate("matches")
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }

            let match = tournament[0].matches[0];
            if (!match) {
                return res.status(404).send({
                    message: "match not found with id " + req.params.matchId
                });
            }

            match.remove().then((deletedMatch) => {
                res.status(204).send({});
            }).catch((err) => {
                return res.status(400).send({
                    message: "Could not delete match with id " + req.params.matchId
                });
            });
        });
};
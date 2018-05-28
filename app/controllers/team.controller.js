const Team = require('../models/team.model.js');
const Tournament = require('../models/tournament.model.js');
const ObjectId = require('mongoose').Schema.ObjectId;

// Create and Save a new team for the tournament
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name for the team can not be empty"
        });
    }

    // Create a Team
    const team = new Team({
        name: req.body.name,
        logo: req.body.logo
    });

    Tournament.findOneAndUpdate({
            _id: req.params.tournamentId
        }, {
            $push: {
                'teams': team
            }
        },
        (error, tournament) => {
            return res.send(tournament);
        })
};

// Retrieve and return all Tournaments from the database.
exports.findAll = (req, res) => {
    Tournament.findOne({
            _id: req.params.tournamentId
        })
        .then((tournament) => {
            res.send(tournament.teams);
        })
        .catch((err) => {
            return res.status(404).send({
                message: err.message || "Some error occured while retrieving teams"
            });
        });
};

exports.findOne = (req, res) => {
    Tournament.findOne({
            _id: req.params.tournamentId,
        })
        .then((tournament) => {
            let team = tournament.teams.id(req.params.teamId);
            if (!team) {
                res.status(404).send({
                    message: "Team konnte nicht gefunden werden"
                })
            }
            res.send(team);
        })
        .catch((err) => {
            return res.status(404).send({
                message: err.message || "Some error occured while retrieving team with id " + req.params.teamId
            });
        });
}

// Update a team identified by the tournamentId and the teamId in the request
exports.update = (req, res) => {

    Tournament.findById(req.params.tournamentId)
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }
            let team = tournament.teams.id(req.params.teamId);
            if (!team) {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }
            team.set(req.body);

            tournament.save().then((tournament) => {
                res.send(tournament.teams.id(req.params.teamId));
            })

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.teamId
                });
            }
            return res.status(500).send({
                message: "Error updating team with id " + req.params.teamId
            });
        });
};

// Delete a tournament with the specified tournamentId in the request
exports.delete = (req, res) => {
    Tournament.findById(req.params.tournamentId)
        .then((tournament) => {
            if (!tournament) {
                return res.status(404).send({
                    message: "tournament not found with id " + req.params.tournamentId
                });
            }

            let team = tournament.teams.id(req.params.teamId);
            if (!team) {
                return res.status(404).send({
                    message: "team not found with id " + req.params.teamId
                });
            }

            team.remove();
            tournament.save().then((deletedTeam) => {
                res.status(204).send({});
            }).catch((err) => {
                return res.status(400).send({
                    message: "Could not delete team with id " + req.params.teamId
                });
            });
        });
};
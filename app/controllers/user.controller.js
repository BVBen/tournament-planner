const User = require('../models/user.model.js');
const Tournament = require('../models/tournament.model.js');
const Match = require('../models/match.model.js');
const result = require('../models/result.model.js');
const team = require('../models/team.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.lastname || !req.body.forename) {
        return res.status(400).send({
            message: "User forename or lastname can not be empty"
        });
    }

    // Create a User
    const user = new User({
        forename: req.body.forename,
        lastname: req.body.lastname
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            message.err.message || "Some error occured while retrieving users";
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        })
        .catch((err) => {
            message.err.message || "Some error occured while retrieving users";
        })

    return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.forename) {
        return res.status(400).send({
            message: "User forename can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
            forename: req.body.forename,
            lastname: req.body.lastname
        }, {
            new: true
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });


};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then((user) => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }

        res.status(204).send({});
    });

    return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
    });
};
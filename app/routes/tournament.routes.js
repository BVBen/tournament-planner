module.exports = (app) => {
    const tournament = require('../controllers/tournament.controller.js');

    // Create a new tournament
    app.post('/api/tournament', tournament.create);

    // Retrieve all tournaments
    app.get('/api/tournament', tournament.findAll);

    // Retrieve a single tournament with tournamentId
    app.get('/api/tournament/:tournamentId', tournament.findOne);

    // Update a tournament with tournamentId
    app.put('/api/tournament/:tournamentId', tournament.update);

    // Delete a tournament with tournamentId
    app.delete('/api/tournament/:tournamentId', tournament.delete);
}
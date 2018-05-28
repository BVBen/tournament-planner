module.exports = (app) => {
    const matchController = require('../controllers/match.controller.js');

    // Create a new match
    app.post('/api/tournament/:tournamentId/matches', matchController.create);

    // Retrieve all matches
    app.get('/api/tournament/:tournamentId/matches', matchController.findAll);

    // Retrieve a single match
    app.get('/api/tournament/:tournamentId/matches/:matchId', matchController.findOne);

    // Update a match
    app.put('/api/tournament/:tournamentId/matches/:matchId', matchController.update);

    // Update a match result
    app.put('/api/tournament/:tournamentId/matches/:matchId/result', matchController.updateResult);

    // Delete a tournament match
    app.delete('/api/tournament/:tournamentId/matches/:matchId', matchController.delete);
}
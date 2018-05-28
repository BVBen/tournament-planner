module.exports = (app) => {
    const teamController = require('../controllers/team.controller.js');

    // Create a new team
    app.post('/api/tournament/:tournamentId/teams', teamController.create);

    // Retrieve all team
    app.get('/api/tournament/:tournamentId/teams', teamController.findAll);

    // Retrieve a single tournament with team
    app.get('/api/tournament/:tournamentId/teams/:teamId', teamController.findOne);

    // Update a tournament with team
    app.put('/api/tournament/:tournamentId/teams/:teamId', teamController.update);

    // Delete a tournament with team
    app.delete('/api/tournament/:tournamentId/teams/:teamId', teamController.delete);
}
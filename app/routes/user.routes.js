module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/api/user', user.create);

    // Retrieve all users
    app.get('/api/user', user.findAll);

    // Retrieve a single user with userId
    app.get('/api/user/:userId', user.findOne);

    // Update a user with userId
    app.put('/api/user/:userId', user.update);

    // Delete a user with userId
    app.delete('/api/user/:userId', user.delete);
}
module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/api/user', user.create);

    // Retrieve all Notes
    app.get('/api/user', user.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/user/:userId', user.findOne);

    // Update a Note with noteId
    app.put('/api/user/:userId', user.update);

    // Delete a Note with noteId
    app.delete('/api/user/:userId', user.delete);
}
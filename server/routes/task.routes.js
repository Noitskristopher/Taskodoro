const TaskController = require('../controllers/task.controller');

module.exports = app => {
    app.post('/api/create-task', TaskController.createTask)
    app.get('/api/quotes', TaskController.getQuote)
    app.get('/api/get-all-tasks', TaskController.getAllTasks)
    app.get('/api/get/task/:id', TaskController.getOneTask)
    app.put('/api/update/task/:id', TaskController.updateTask)
    app.put('/api/update-pomodoro/task/:id', TaskController.updatePomodoro)
    app.delete('/api/delete/:id', TaskController.deleteTask)
    app.delete('/api/delete-all-tasks', TaskController.deleteAllTasks)
}
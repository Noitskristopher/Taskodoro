const Task = require("../models/task.model");
const axios = require('axios');

module.exports = {
    createTask: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            console.log(decodedJwt)
            const task = req.body
            const createdTask = await Task.create(task)
            res.json(createdTask)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    getAllTasks: async (req, res) => {
        try {
            const allTasks = await Task.find()
            res.json(allTasks)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    getOneTask: async (req, res) => {
        try {
            const oneTask = await Task.findOne({ _id: req.params.id })
            res.json(oneTask)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    updateTask: async (req, res) => {
        try {
            const updateTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            res.json(updateTask)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    updatePomodoro: async (req, res) => {
        try {
            const taskId = req.params.id
            const { startTime, endTime } = req.body

            const task = await Task.findById(taskId)

            if (!task) {
                return res.json(404).json({ message: "Task not found." })
            }

            // pushing new startTime and endTime in array
            task.pomodoro.push({ startTime, endTime })

            // saving
            await task.save()

            res.status(201).json({ message: "Added Pomodoro!" })
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    deleteAllTasks: async (req, res) => {
        try {
            await Task.deleteMany({});
            res.status(201).json({ message: "Deleted all tasks" });
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    deleteTask: async (req, res) => {
        try {
            const deleteTask = await Task.findOneAndDelete({ _id: req.params.id })
            res.json(deleteTask)
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    getQuote: async (req, res) => {
        try {
            const response = await axios.get('https://zenquotes.io/api/quotes/');
            const randomIndex = Math.floor(Math.random() * response.data.length);
            res.json(response.data[randomIndex]);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
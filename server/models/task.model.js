const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    targetNumber: {
        type: Number,
        required: true,
        min: [1, 'Must have at least 1 pomodoro']
    },
    pomodoro: [
        {
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            }
        }
    ],
}, { timestamps: true })

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
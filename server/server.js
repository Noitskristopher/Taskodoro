const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

app.use(cors({
    origin: "http://localhost:3000"
}));

require("./config/mongoose.config");

const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');
taskRoutes(app);
userRoutes(app);

app.listen(8000, () => console.log("Listening on Port 8000"))

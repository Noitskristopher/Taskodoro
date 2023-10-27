const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: "http://localhost:3000"
// }));

app.use(cors({
    origin: ["https://taskodoro-backend-77z1qb2rp-cabadokris32-gmailcom.vercel.app/"],
    methods: ["POST", "GET"]
}));

require("./config/mongoose.config");

const taskRoutes = require('./routes/task.routes');
taskRoutes(app);

app.listen(8000, () => console.log("Listening on Port 8000"))

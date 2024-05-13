const express = require('express')
const app = express();
require("dotenv").config();
require("./connection/connection")
const cors = require("cors");
app.use(express.json());
const UserAPI = require("../backend/routes/user")
const TaskAPI = require("../backend/routes/task")
app.use(cors());



// localhost:1000/api/v1/sign-in


app.use("/api/v1",UserAPI);
app.use("/api/v2",TaskAPI);
const PORT = 1000

app.listen(PORT, ()=>
    (console.log("server started")
));
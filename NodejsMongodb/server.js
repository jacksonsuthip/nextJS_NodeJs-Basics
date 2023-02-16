require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// mongoose.connect('mongodb://localhost:27017/tempTest') // temp
mongoose.connect(process.env.database_URL); // NextJs project
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());

// temp
// const tempRouter = require('./routes/tempRoute')
// app.use('/temp', tempRouter)

// NextJs project
const accountRouter = require("./routes/userRoute");
app.use("/api", accountRouter);

app.listen(7000, () => console.log("Server Started"));

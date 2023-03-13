
const express = require("express");
const dotenv = require("dotenv").config()
// dotenv.config();
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");


const db=process.env.DBURL


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
// Route to display users
// Route to display users
app.get("/api/users", userRoutes.get);

// Route to delete a user
app.delete("/api/users/:id", userRoutes.delete);
// Route to block a user
app.put("/api/users/:id/block", userRoutes.put);



const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}...`));

console.log("")


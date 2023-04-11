
const express = require("express");
const dotenv = require("dotenv").config()
// dotenv.config();
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gym");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const path = require("path");
const cookieParser=require('cookie-parser');
const session= require('express-session')
const multer = require("multer");





// Définir le chemin pour les fichiers statiques, y compris les images




const db=process.env.DBURL


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(session({
    secret:'my-secret-key',
    resave:false,
    saveUninitialized:false
}));


// routes
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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


app.use('/uploads', express.static('uploads'));





app.use("/api/gyms",gymRoutes);

const port = process.env.PORT || 5000;


app.listen(port, console.log(`Listening on port ${port}...`));

console.log("")


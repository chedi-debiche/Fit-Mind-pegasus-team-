
const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv").config()
// dotenv.config();
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const productRoutes = require("./routes/products"); // import products router



// Définir le chemin pour les fichiers statiques, y compris les images

// Define your MongoDBStore instance for storing sessions
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/myapp',
  collection: 'sessions'
});

// Define your session middleware
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: store
}));



const db=process.env.DBURL


// database connection
connection();

// middlewares
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  
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

app.use("/api/products", productRoutes); // use products router

app.use('/uploads', express.static('uploads'));



const port = process.env.PORT || 5000;
/** POST: http://localhost:8080/uploads  */
//  app.post("/uploads", async (req, res) => {
//      const body = req.body;
//      try{
//          const newImage = await Post.create(body)
//          newImage.save();
//          res.status(201).json({ msg : "New image uploaded...!"})
//      }catch(error){
//          res.status(409).json({ message : error.message })
//     }
//  })



app.listen(port, console.log(`Listening on port ${port}...`));

console.log("")


const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('cookie-session');
const path = require("path");
const dotenv = require("dotenv")
dotenv.config()



const localURL = "mongodb://localhost:27017/ShoppingApp";
const cloudURL = process.env.MONGO_URI
mongoose
  .connect(cloudURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err)); 

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));



app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(
  session({
  secret: 'sketches for my sweetheart the drunk', 
  resave: false,
  saveUninitialized: false
  })
)
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes);
app.use("/users", userRoutes); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
 }); 

app.post("/signup", (req, res) => {
  console.log(req.body);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 2000, () => {
  console.log("Server is up");
});

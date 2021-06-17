const express = require("express");
const User = require("../models/userData");
const cartItems = require("../models/cartItems");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let userRouter = express.Router();

userRouter.use(methodOverride("_method"));
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/", (req, res) => {
  res.send("works");
});

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username: username }).then(async (user) => {
    if (user) {
      res.send({ code: 101, msg: "user already exists" });
    } else {
      const newUser = new User({
        username,
        email,
        password,
      });

      bcrypt.genSalt(10, (_err, salt) =>
        bcrypt.hash(newUser.password, salt, null, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((_user) => {
              res.send({ code: 100, msg: "succesfully registered" });
            })
            .catch((__err) => console.log(err));
        })
      );

      const cartObject = {
        user: username,
        itemList: [],
        items: 0,
      };
      await cartItems.create(cartObject);
    }
  });
});

userRouter.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("error");
    }
    if (!user) {
      res.send({ status: 404, msg: "wrong username or password" });
    } else {
      req.logIn(user, (errr) => {
        if (errr) {
          console.log(err);
        }
        res.send({ status: 200, msg: "success" });
      });
    }
  })(req, res, next);
});

userRouter.post("/addData", (req, res) => {
  const {
    username,
    firstname,
    lastname,
    address1,
    address2,
    contactno,
    city,
    state,
    zip,
  } = req.body;
  console.log(zip);
  User.findOneAndUpdate(
    { username: username },
    {
      username: username,
      firstname: firstname,
      lastname: lastname,
      address1: address1,
      address2: address2,
      contactno: contactno,
      city: city,
      state: state,
      zip: zip,
    },
    (err, docs) => {
      if (err) throw err;
      else {
        console.log(docs);
        res.send("success");
      }
    }
  );
});

userRouter.get("/getuser", (req, res) => {
  res.send(req.user);
});

userRouter.post("/getuserbyId", async(req, res) => {
  const {id} = req.body;
  const user = await User.findById(id)
  res.send(user)
});

userRouter.get("/getcart", async (req, res) => {
  const user = req.user.username;
  const userCart = await cartItems.findOne({ user: user });
  res.send(userCart);
});

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.send("succesfully logged out");
});

userRouter.get("/getAll",async (req,res)=>{
  const userArray = await User.find()
  res.send(userArray)
})

userRouter.post("/addToCart", async (req, res) => {
  const cart = req.body;
  // await cartItems.create(cart); x
  await cartItems.findOneAndUpdate(
    { user: cart.user },
    {
      items: cart.items,
      itemList: cart.itemList,
      user: cart.user,
    },
    (err, docs) => {
      if (err) throw err;
      else {
        res.send({ status: "success" });
      }
    }
  );
});

userRouter.post("/setRole",async(req,res)=>{
  const {id,userRole} = req.body;
  console.log(id.id)
  console.log(userRole)
  await User.findByIdAndUpdate(id.id,{userRole:userRole},(err,docs)=>{
    if(err) throw err;
    else{
      res.send({status:"successs"}); 
    }
  })

})

userRouter.post("/deleteUser",async(req,res)=>{
  const {id} = req.body;
  const docs = await User.findByIdAndDelete(id.id)
  if(docs){
    res.send({status:"success"})
  }
})

module.exports = userRouter;

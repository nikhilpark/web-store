const express = require("express");
const Product = require("../models/productData");
const methodOverride = require("method-override");  

let productRouter = express.Router();


productRouter.use(methodOverride("_method"));
productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));


productRouter
  .route("/create")
  .post(async (req, res) => {
    const product = req.body;
    await Product.create(product);
    console.log("Product Created")
    res.json({status: "Succesfull"});
  });

productRouter.patch("/edit",async (req,res) =>{
  const product = req.body;
    await Product.findByIdAndUpdate(product.id,product)
    console.log("Product Edited")
    res.json({status: "Succesfull"});
})

productRouter.route("/view").get(async (req, res) => {
  const data = await Product.find({});
  res.send(data);
});

productRouter.post("/viewproduct",async (req,res)=>{
  const id = req.body.id
  try{
  const data = await Product.findById(id)
  res.send(data)
  }
  catch{
    console.log("Product not found")
  }
  
})

productRouter.post("/delete",async(req,res)=>{
  const id = req.body.productID.id
  await Product.findByIdAndDelete(id)

})
  

module.exports = productRouter;

const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema ({
    user:String,
   items:Number,
   itemList:Array,
})

const cartItems = mongoose.model('cartItems',cartItemSchema)
module.exports = cartItems;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemShema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    name: String,
    price: Number,
    quantity: Number,
    category : Object
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem",CartItemShema)

const OrderSchema = new mongoose.Schema(
    {
        products : [CartItemShema],
        total_quatity : {type : Number},
        total_quatity : {type : Number},
        amount : {type : Number},
        infoPayment_address : {type : String},
        infoPayment_city : {type : String},
        infoPayment_full_name : {type : String},
        infoPayment_phone_number : {type : Number},
        date : Object,
        status : {
            type : String,
            default : 'Not processed',
            enum : ['Not processed','Processing','Shipped','Delivered','Cancelled']
        },
        updated : Date,
        user : {
            type : ObjectId, ref : 'User'
        }
    },
    {timestamps:true}
)
const Order = mongoose.model("Order", OrderSchema);
module.exports = {Order , CartItem}

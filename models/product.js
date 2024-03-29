const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 350,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category", // reference - rolationShipe
      require: true,
    },
    shipping: {
      type: Boolean,
      require: false,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productShema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:'https://img.freepik.com/free-vector/ecofood-logo-template_1195-33.jpg'
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;

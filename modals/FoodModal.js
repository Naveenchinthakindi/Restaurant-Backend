const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema(
  {
    title: {
      type: String,
      required: ["true", "Food Title is required"],
    },
    description: {
      type: String,
      required: ["true", "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Editable-Photoshop-Food-Logo-Design-1536x1024.jpg",
    },
    foodTag: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;

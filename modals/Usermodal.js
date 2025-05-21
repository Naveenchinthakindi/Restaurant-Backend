const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
    default: "client",
    enum: ["client", "admin", "vender", "driver"],
  },
  profile: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
  },
  answer:{
    type: String,
    required:true
  }
},{timestamps:true});
const User = mongoose.model("User", userSchema);

module.exports = User;
 
const Food = require("../modals/FoodModal");
// create food
const createFood = async (req, res) => {
  const {
    title,
    description,
    price,
    imageUrl,
    foodTag,
    category,
    code,
    isAvailable,
    restaurant,
    rating,
    ratingCount,
  } = req.body;
  try {
    if (!title || !description || !price || !restaurant) {
      return res
        .status(401)
        .json({ success: false, message: "Please provide all fields" });
    }

    const newFood = new Food({
      title,
      description,
      price,
      imageUrl,
      foodTag,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    return res.status(200).json({
      success: true,
      message: "New food item created successfully",
      newFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "creating food api error ",
      error: error.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(400)
        .json({ success: false, message: "Food Id is required" });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food is not available with id" });
    }

    await Food.findByIdAndDelete(foodId);

    return res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully", food });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in deleting food item",
      message: error.message,
    });
  }
};

const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();

    return res.status(200).json({ success: true, food });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get all food error ",
      error: error.message,
    });
  }
};

const getSingleFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    if (!foodId) {
      return res
        .status(400)
        .json({ success: false, message: "Food id required" });
    }

    const food = await Food.findById(foodId);

    if (!food) {
      return res
        .status(401)
        .json({ success: false, message: "Food is not found with id" });
    }

    return res.status(200).json({ success: true, food });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "get single food api error",
        error: error.message,
      });
  }
};

const getFoodByRestaurant = async(req, res)=>{
  try {
    const restaurantId = req.params.id;

    if(!restaurantId){
      return res.status(400).json({success:false, message:"Please provide the restaurant id"})
    }
    
    const food = await Food.find({restaurant:restaurantId});

    if(!food){
      return res.status(401).json({success:false, message:"no food found with this id"})
    }

    return res.status(200).json({success:true,food})

  } catch (error) {
    return res.status(500).json({success:false, message:"get food by restaurant api error",error:error.message})
  }
}

const updateFood = async () => {};

module.exports = { createFood, deleteFood, getAllFood, getSingleFood, getFoodByRestaurant };

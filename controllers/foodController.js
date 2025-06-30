const Food = require("../modals/FoodModal");
const Order = require("../modals/OrderModal");
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

//delete food item
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

//get all food item
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

//get single food item based on food id
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
    return res.status(500).json({
      success: false,
      message: "get single food api error",
      error: error.message,
    });
  }
};

//get food item based on restaurant id
const getFoodByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the restaurant id" });
    }

    const food = await Food.find({ restaurant: restaurantId });

    if (!food) {
      return res
        .status(401)
        .json({ success: false, message: "no food found with this id" });
    }

    return res.status(200).json({ success: true, food });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get food by restaurant api error",
      error: error.message,
    });
  }
};

//update the food item
const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res
        .status(404)
        .json({ success: false, message: "Please provide the food Id" });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res
        .status(401)
        .json({ success: false, message: "Food item not found" });
    }

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

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      {
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
      },
      {
        new: true,
      }
    );
    return res.status(402).json({
      success: true,
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "update food api error: ",
      error: error.message,
    });
  }
};

//place order the food item
const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    let totalAmount = 0;
    cart.map((item) => (totalAmount += item.price));

    const newOrder = new Order({
      foods: cart,
      payment: totalAmount,
      buyer: req.body.id,
    });

    await newOrder.save();
    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully", newOrder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "place order api error",
      error: error.message,
    });
  }
};

//update the place order of food item
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide order id" });
    }
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all details" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order is not placed with this id" });
    }

    order.status = status;

    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "order updated successfully", order });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "update order status api error: ",
        error: error.message,
      });
  }
};

module.exports = {
  createFood,
  deleteFood,
  getAllFood,
  getSingleFood,
  getFoodByRestaurant,
  updateFood,
  placeOrder,
  updateOrderStatus,
};

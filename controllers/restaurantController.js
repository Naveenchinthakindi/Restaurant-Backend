const Restaurant = require("../modals/RestaurantModal");

const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide required fields" });
    }

    const newRestaurant = new Restaurant({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();
    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      newRestaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Creating new restaurant api error ",
      error: error.message,
    });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    console.log("restaurant ",restaurant)
    if (!restaurant) {
      return res
        .status(402)
        .json({ success: false, message: "No Restaurant Available" });
    }
    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "fetch all restaurant error",
      error: error.message,
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res
        .status(402)
        .json({ success: false, message: "Please provide the restaurant id" });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res
        .status(402)
        .json({ success: false, message: "no restaurant found" });
    }

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error in get restaurant by Id",
        error: error.message,
      });
  }
};

const deleteRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res
        .status(402)
        .json({ success: false, message: "Please provide the restaurant id" });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res
        .status(402)
        .json({ success: false, message: "no restaurant found" });
    }

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error in delete restaurant by id",
        error: error.message,
      });
  }
};

module.exports = {
  createRestaurant,
  getRestaurant,
  getRestaurantById,
  deleteRestaurantById,
};

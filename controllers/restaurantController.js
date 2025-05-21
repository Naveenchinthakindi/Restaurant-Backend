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
    const res = await Restaurant.find();
    return res.status(200).json({ success: true, restuarant: res });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "fetch all restaurant error",
        error: error.message,
      });
  }
};

module.exports = { createRestaurant, getRestaurant };

const Category = require("../modals/CategoryModal");

const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide title" });
    }

    const category = new Category({ title, imageUrl });

    await category.save();
    console.log("category ",category)

    return res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("error ",error)
    return res.status(500).json({
      success: false,
      message: "create category api error ",
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    if (!category) {
      res.status(402).json({ success: false, message: "no category found " });
    }

    return res.status(200).json({ success: true, category });
  } catch (error) {
    return res.json(500).json({
      success: false,
      message: "all category api error",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log("categoryId ",categoryId)
    const { title, imageUrl } = req.body;

    if (!categoryId) {
      return res
        .status(402)
        .json({ success: false, message: "please provide category id" });
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { title, imageUrl },
      { new: true }
    );

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "No category found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully ",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "update category error",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "please provide category id" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "category not found" });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).send({success:true, message:"category added successfully"})
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "category delete api error ",
        error: error.message,
      });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};

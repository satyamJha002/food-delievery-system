const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

const getMenu = asyncHandler(async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json({ success: true, menu });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const createMenu = asyncHandler(async (req, res) => {
  const { name, category, price, availability } = req.body;

  if (!name || !category || !price || availability === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the details" });
  }

  try {
    const menuExists = await Menu.findOne({ name }).lean();

    if (menuExists) {
      return res
        .status(400)
        .json({ success: false, message: "Menu item already exists" });
    }

    const newMenu = await Menu.create({ name, category, price, availability });

    return res.status(201).json({ success: true, data: newMenu });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

const updateMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, price, availability } = req.body;

  const menu = await Menu.findById(id);

  if (!menu) {
    return res
      .status(404)
      .json({ success: false, message: "Menu item not found" });
  }

  menu.name = name;
  menu.category = category;
  menu.price = price;
  menu.availability = availability;

  await menu.save();
  res.status(200).json({ success: true, menu });
});

const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menu = await Menu.findById(id);

  if (!menu) {
    return res
      .status(404)
      .json({ success: false, message: "Menu item not found" });
  }

  await Menu.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "Menu item deleted" });
});

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };

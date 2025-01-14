const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;
    console.log(userId); //undefined

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid order items" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) {
        return res
          .status(400)
          .json({ message: `Menu item ${item.menuItem} not found` });
      }

      totalAmount += menuItem.price * item.quantity;
      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
      });
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.menuItem", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = { placeOrder, getOrders };

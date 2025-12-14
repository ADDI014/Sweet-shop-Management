const mongoose = require("mongoose");
const Sweet = require("../models/Sweet");
const AuditLog = require("../models/AuditLog");

exports.createSweet = async (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      image: req.file ? req.file.path : ""
    });

    res.status(201).json(sweet);
  } catch (error) {
    next(error);
  }
};

exports.getAllSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find({ isDeleted: false });
    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};

exports.searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = { isDeleted: false };

    if (name) {
      filter.name = new RegExp(name, "i");
    }

    if (category) {
      filter.category = category;
    }


    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};


exports.purchaseSweet = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findOneAndUpdate(
      { _id: req.params.id, quantity: { $gt: 0 }, isDeleted: false },
      { $inc: { quantity: -1 } },
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not available" });
    }

    if (req.user) {
      await AuditLog.create({
        action: "PURCHASE",
        userId: req.user.id,
        sweetId: sweet._id
      });
    }

    res.status(200).json(sweet);
  } catch (error) {
    next(error);
  }
};

exports.restockSweet = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += Number(req.body.quantity);
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    next(error);
  }
};

exports.updateSweet = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    res.status(200).json(sweet);
  } catch (error) {
    next(error);
  }
};

exports.deleteSweet = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    next(error);
  }
};

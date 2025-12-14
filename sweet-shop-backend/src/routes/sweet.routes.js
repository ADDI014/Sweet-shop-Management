const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/role.middleware");

const {
  createSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
  updateSweet,
  deleteSweet
} = require("../controllers/sweet.controller");
const upload = require("../middleware/upload");


router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweet);


router.get("/admin", authMiddleware, adminMiddleware, getAllSweets);
router.post("/", authMiddleware, adminMiddleware,upload.single("image"), createSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);


module.exports = router;

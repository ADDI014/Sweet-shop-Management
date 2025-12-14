

const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: String,
  userId: String,
  sweetId: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);

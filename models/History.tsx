const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  itemId: {
    type: [],
  },
  categoryId: {
    type: [],
  },
  progress: {
    type: String,
  },
  timestamps: {
    type: String,
  },
});

export default mongoose.models.Historydt ||
  mongoose.model("Historydt", HistorySchema);

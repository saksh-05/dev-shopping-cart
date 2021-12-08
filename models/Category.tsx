const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please give a category to item"],
  },
});

export default mongoose.models.CategoryList ||
  mongoose.model("CategoryList", CategorySchema);

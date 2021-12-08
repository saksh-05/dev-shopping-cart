const mongoose = require("mongoose");

const MenuListSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [40, "Name can not be more than 40 charactes"],
  },
  note: {
    type: String,
    maxLength: [120, "Description can not be more than 40 charactes"],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Please give a category to item"],
  },
});

export default mongoose.models.MenuList ||
  mongoose.model("MenuList", MenuListSchema);

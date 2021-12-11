const withPlugins = require("next-compose-plugins");

const nextConfiguration = {
  env: {
    MONGODB_URI:
      "mongodb+srv://imageUser:ImageUser@cluster0.nq078.mongodb.net/shoppingList?retryWrites=true&w=majority",
    DEV_URL: "http://localhost:3000/menu",
    PROD_URL: "",
  },
};

module.exports = withPlugins([], nextConfiguration);

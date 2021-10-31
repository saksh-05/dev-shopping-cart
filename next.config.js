const withPlugins = require("next-compose-plugins");

const nextConfiguration = {
  env: {
    MONGODB_URI:
      "mongodb+srv://shoppingList:ImageUser@cluster0.nq078.mongodb.net/shoppingList?retryWrites=true&w=majority",
    DB_NAME: "shoppingList",
    DEV_URL: "http://localhost:3000",
    PROD_URL: "",
  },
};

module.exports = withPlugins([], nextConfiguration);

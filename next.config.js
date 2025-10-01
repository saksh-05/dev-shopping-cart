const withPlugins = require("next-compose-plugins");

const nextConfiguration = {
  env: {
    MONGODB_URI:
      "mongodb+srv://saksh_db_user:RJfBggiKHOmizPx6@cluster0.ycygdq9.mongodb.net/shoppingList?retryWrites=true&w=majority&appName=Cluster0",
    DEV_URL: "http://localhost:3000/menu",
    PROD_URL: "",
  },
};

module.exports = withPlugins([], nextConfiguration);

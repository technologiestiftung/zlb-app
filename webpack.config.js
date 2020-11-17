const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    map: "./source/js/map.js",
    fontsize: "./source/js/fontsize.js",
    overview: "./source/js/overview.js",
    service: "./source/js/service.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./source/js/bundle"),
  },
  plugins: [new Dotenv()],
};

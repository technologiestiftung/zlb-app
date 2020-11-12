const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    map: "./source/js/map.js",
    print: "./source/js/print.js",
    fontsize: "./source/js/fontsize.js",
    service: "./source/js/service.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./source/js/bundle"),
  },
  plugins: [new Dotenv()],
};

module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "localhost:3000"
      }
    }
  }
};

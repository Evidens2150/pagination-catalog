const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      modules: ["src", "node_modules"],
    },
  },
  devServer: {
    allowedHosts: "all",
  },
});

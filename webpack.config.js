// webpack.config.js
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader")
var path = require("path");
module.exports = {
  entry: path.join(__dirname, "./src/main.js"),
  //注意路径别写错
  output: {
    path: path.join(__dirname, "./dist"),
    libraryTarget: "system",
    filename: "bundle.js",
  },
  devServer: {
    // Not required, but it's often useful to run webpack-dev-server in SPA mode
    historyApiFallback: true,
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    quiet: true,
  },
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader" },
      { test: /\.css$/, loader: "css-loader" },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.(jpg|png|jpeg|gif)$/, loader: "url-loader" },
    ],
  },
  plugins: [
    // the standalone plugin works in conjunction with HtmlWebpackPlugin
    new HtmlWebpackPlugin(),
    new VueLoaderPlugin(),
    new StandaloneSingleSpaPlugin({
      // required
      appOrParcelName: "nav",

      // optional - strongly encouraged for single-spa applications
      activeWhen: ["/route-prefix"],

      // optional - useful for enabling cross-microfrontend imports
    //   importMapUrl: new URL("https://my-cdn.com/importmap.json"),

      // optional - useful for adding an additional, local-only import map
      importMap: {
        imports: {
          "other-module": "/other-module.js",
        },
      },

      // optional - defaults to false. This determines whether to mount
      // your microfrontend as an application or a parcel
      isParcel: false,

      // optional - you can disable the plugin by passing in this boolean
      disabled: false,

      // optional - the standalone plugin relies on optionalDependencies in the
      // package.json. If this doesn't work for you, pass in your HtmlWebpackPlugin
      // to ensure the correct one is being referenced
      HtmlWebpackPlugin,

      // optional - defaults to true - turns on or off import-map-overrides.
      importMapOverrides: true,

      // optional - defaults to null. This allows you to hide the import-map-overrides UI
      // unless a local storage key is set. See more info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/ui.md#enabling-the-ui
      importMapOverridesLocalStorageKey: null,
    }),
  ],
};

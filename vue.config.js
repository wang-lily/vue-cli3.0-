/*eslint-disable */
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
  /* 部署应用包的基本URL */
  /* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",

  /* 生产环境构建文件的目录 defalut: dist */

  outputDir: "dist",

  /* 放置生成的静态文件目录（js css img） */

  assetsDir: "static",

  /* 指定生成的index.html 输出路径 相对 default: index.html */

  indexPath: "index.html",

  /* 指定生成文件名中包含hash default: true */

  filenameHashing: true,

  /* 多页模式下 */

  /* pages: {

      index: {

        // page 的入口

        entry: "src/index/main.js",

        // 模板来源

        template: "public/index.html",

        // 在 dist/index.html 的输出

        filename: "index.html",

        // 当使用 title 选项时，

        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>

        // title: "Index Page",

        // 在这个页面中包含的块，默认情况下会包含

        // 提取出来的通用 chunk 和 vendor chunk。

        chunks: ["chunk-vendors", "chunk-common", "index"]

      },

      // 当使用只有入口的字符串格式时，

      // 模板会被推导为 `public/subpage.html`

      // 并且如果找不到的话，就回退到 `public/index.html`。

      // 输出文件名会被推导为 `subpage.html`。

      // subpage: "src/subpage/main.js"

    } */

  /* 是否保存时 lint 代码 */

  lintOnSave: false,

  // 你也可以通过设置让浏览器 overlay 同时显示警告和错误：

  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },

  /* 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。 */

  runtimeCompiler: false,

  /* 默认babel-loader会忽略node_modules中的文件，你想显示的话在这个选项中列出来 */

  // transpileDependencies: [],

  /* 生产环境的source map */

  productionSourceMap: true,

  // crossorigin: "",

  integrity: false,

  configureWebpack: config=>{
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, "./dist"),
          routes: ["/", "/about"],
          renderer: new Renderer({
            inject: {
              foo: "bar"
            },
            headless: false,
            renderAfterDocumentEvent: "render-event",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
          })
        })
      ]
    };
  },

  // css相关配置

  css: {
    // 是否使用css分离插件 ExtractTextPlugin

    extract: true,

    // 开启 CSS source maps?

    sourceMap: true,

    // css预设器配置项

    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      sass: {
        // 假设你有 `src/variables.scss` 这个文件
        //全局引用
        data: `@import "~@/assets/scss/base.scss";`
      }
    },

    // 启用 CSS modules for all css / pre-processor files.

    modules: false
  },

  // eslint-disable-next-line no-dupe-keys
  devServer: {
    port: 8080,

    host: "localhost",

    https: true,

    // 自动启动浏览器

    open: false,

    proxy: {
      "/api": {
        //代理路径 例如 https://baidu.com
        target: "http://127.0.0.1:3001",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        ws: true, //是否启用websocket
        pathRewrite: {
          "^/api": "" //接口中使用/api替代target
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {}
};

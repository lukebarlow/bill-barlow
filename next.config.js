const withMdxEnhanced = require("next-mdx-enhanced");
const oembed = require('remark-oembed');

const convertYoutubeLinks = require('./src/plugins/convertYoutubeLinks.js')

const rehypePrism = require("@mapbox/rehype-prism");

module.exports = withMdxEnhanced({
  layoutPath: "src/layouts",
  defaultLayout: true,
  remarkPlugins: [convertYoutubeLinks],
  rehypePlugins: [rehypePrism],
})({
  trailingSlash: true,
  pageExtensions: ["mdx", "tsx"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
});

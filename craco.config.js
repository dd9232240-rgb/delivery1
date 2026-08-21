module.exports = {
  webpack: {
    configure: (config) => {
      const sourceMapLoaderRule = config.module.rules.find(
        (rule) => rule.enforce === "pre" && rule.loader?.includes("source-map-loader")
      );
      if (sourceMapLoaderRule) {
        sourceMapLoaderRule.exclude = /node_modules|@babel(?:\/|\\{1,2})runtime/;
      }
      return config;
    },
  },
};

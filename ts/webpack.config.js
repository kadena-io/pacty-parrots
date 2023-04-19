module.exports = {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      webpackConfig['resolve'] = {
        fallback: {
          https: require.resolve("https-browserify"),
          buffer: require.resolve("buffer-browserify"),
        },
      }
      return webpackConfig;
    },
  }
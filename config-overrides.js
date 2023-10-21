const path = require("path");

module.exports = function override(config) {
  // Разрешаем полифил 'path' и добавляем полифил 'fs' в конфигурацию Webpack
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    fs: false,
  };

  return config;
};

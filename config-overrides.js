
module.exports = config => {
  require('react-app-rewire-postcss')(config, {
     plugins: loader => [
      require('postcss-rtl')()
    ]
  });

  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  return config;
};

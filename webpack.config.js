const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack.common');

module.exports = (env) => {
  const environment = env.prod ? 'prod.js' : 'dev.js'; 
  const config = require('./config/webpack.' + environment);
  return merge(commonConfig, config);
};

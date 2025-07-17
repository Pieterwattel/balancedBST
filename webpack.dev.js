import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // Only one devtool will apply; this is the last one you had
  devServer: {
    watchFiles: ['./src/index.html', './src/styles.css'],
  },
});


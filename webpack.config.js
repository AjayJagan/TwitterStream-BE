const path = require('path');
module.exports = {
  mode: 'development',
  entry:'src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-arrow-functions',
              ["@babel/plugin-proposal-class-properties",
                { "loose": true }],
            ],
          },
        }
      },
    ]
  },

};
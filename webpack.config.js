module.exports = {
  entry: [
    '@babel/polyfill',
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

// basic

// module.exports = {
//   entry: './index.js', // assumes your entry point is the index.js in the root of your project folder
//   mode: 'development',
//   output: {
//     path: __dirname, // assumes your bundle.js will also be in the root of your project folder
//     filename: 'bundle.js'
//   },
//   devtool: 'source-maps',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       }
//     ]
//   }
// }

module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['shebang', 'babel'],
      }
    ]
  },
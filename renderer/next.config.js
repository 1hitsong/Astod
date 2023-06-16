module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.tsx$/, 
      use: 'ts-loader',
      exclude: /node_modules/,
    });

    config.module.rules.push({
      test: /\.ts$/, 
      use: 'ts-loader'
    });

    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
};

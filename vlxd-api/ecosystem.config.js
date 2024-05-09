module.exports = {
  apps: [
    {
      name: 'VLXD-API',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
    },
  ],
};

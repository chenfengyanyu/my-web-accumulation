module.exports = {
  apps: [
    {
      name: 'student_middle_dev',
      script: './app.js',
      watch: true,
      env: {
        NODE_ENV: 'dev',
      },
    },
  ],
};
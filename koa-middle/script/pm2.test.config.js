module.exports = {
  apps: [
    {
      name: 'student_middle_test',
      script: './app.js',
      watch: false,
      env: {
        NODE_ENV: 'test',
      },
    },
  ],
};
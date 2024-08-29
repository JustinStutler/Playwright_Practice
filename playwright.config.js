// playwright.config.js
module.exports = {
    testDir: './', // Specify the directory where your test files are located
    testMatch: '**/*.test.js', // Pattern to match test files
    use: {
      headless: true, // Run tests in headless mode
    },
  };
  
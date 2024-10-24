# Playwright Testing - Quality Assurance (QA)

## Project Overview
This project showcases the use of Playwright to automate the validation of article sorting on [Hacker News](https://news.ycombinator.com/newest). The goal was to ensure that the articles are listed from oldest to newest. I created this project as part of a coding assessment for a Quality Assurance role. By implementing pagination handling, the code efficiently processes the articles, preventing browser overload and ensuring accurate validation across multiple pages.

## Technologies Used
- **Playwright**
- **JavaScript**
- **GitHub** for version control

## Challenges and Solutions
Hacker News displays only 30 articles per page, which introduced the challenge of managing pagination without missing entries. By implementing a pagination solution, the code retrieves articles in manageable chunks, allowing seamless validation regardless of how many articles are being tested.

## Results
- The code reliably checks the sorting of articles, ensuring they appear in chronological order from oldest to newest.
- It can be adapted to validate any number of articles, making it highly reusable for future automated tests.

## Code
```javascript
// import packages test, expect
const { test, expect } = require('@playwright/test');

// helper function
function areDatesSorted(dates) {
    for (let i = 0; i < dates.length - 1; i++) {
        if (dates[i] < dates[i + 1]) {
            console.log('The following pair of times were found not in order: ' + dates[i] + " and " + dates[i + 1]);
            return false; // Found a pair that is not in order
        }
    }
    console.log('test passed');
    return true; // All dates are in order
}

// write a test
test('testName', async ({ page }) => {
    // navigate to a website
    await page.goto('https://news.ycombinator.com/newest');
    // Get locators
    var timestampLocators = page.locator('span.age');
    ...

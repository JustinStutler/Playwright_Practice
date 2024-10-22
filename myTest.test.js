// import packages test, expect
const { test, expect } = require('@playwright/test');
// num articles 
const num_articles = 100;
// website
const website = 'https://news.ycombinator.com/newest';
// init remainder
var remainder = num_articles;

// helper function
function areDatesSorted(dates) {
    var verify_count = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        verify_count += 1;
        if (dates[i] < dates[i + 1]) {
            console.log('The following pair of times were found not in order: ' + dates[i] + " and " + dates[i + 1]);
            return false; // Found a pair that is not in order
        }
    }
    // Corrected the string interpolation
    console.log(`Test passed: ${verify_count} articles verified.`);
    return true; // All dates are in order
}


const testPage = async (page, timestamps) => {
    // Get locators
    const timestampLocators = page.locator('span.age');

    // Count the number of timestamp elements / articles
    const count = await timestampLocators.count();

    if (remainder > count) {
        // Extract and process each timestamp element
        for (let i = 0; i < count; i++) {
            const timestampSpan = timestampLocators.nth(i);

            // Extract the 'title' attribute which contains the timestamp
            const timestampTitle = await timestampSpan.getAttribute('title');
            timestamps.push(new Date(timestampTitle)); // Add the timestamp to the array
        }
        remainder -= count;
    }
    else {
        // Extract and process each timestamp element
        for (let i = 0; i < remainder; i++) {
            const timestampSpan = timestampLocators.nth(i);

            // Extract the 'title' attribute which contains the timestamp
            const timestampTitle = await timestampSpan.getAttribute('title');
            timestamps.push(new Date(timestampTitle)); // Add the timestamp to the array
        }
        remainder -= remainder;
    }
    // Log all extracted timestamps
    // console.log('Extracted Timestamps:', timestamps);
};

// write a test
test('testName', async ({ page }) => {

    // navigate to a website
    await page.goto(website);

    // Get locators
    var timestampLocators = page.locator('span.age');

    // counts the number of timestamp elements / articles
    var count = await timestampLocators.count();

    // create [] to store dates
    var timestamps = [];

    // init moreButton
    var moreButton;

    // always rounds up
    var pages = Math.ceil(num_articles / count);
    //console.log(`num_articles: ${num_articles}, count: ${count}, pages: ${pages}`);

    while (pages > 0) {
        // test page
        await testPage(page, timestamps);
        if (pages > 1) {
            // Click More Button
            moreButton = page.getByRole('link', { name: 'More', exact: true })
            await moreButton.click();
        }
        pages -= 1;
    }

    // print array
    console.log('Extracted Timestamps:', timestamps);

    // Check if dates are sorted
    const sorted = areDatesSorted(timestamps);
    //check size of array
    // console.log(timestamps.length);

    // Use `expect` to assert that the dates are sorted
    expect(sorted).toBe(true);

});
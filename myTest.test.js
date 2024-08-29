// import packages test, expect
const { test, expect } = require('@playwright/test');

// helper function
function areDatesSorted(dates) {
    for (let i = 0; i < dates.length - 1; i++) {
        if (dates[i] < dates[i + 1]) {
            console.log('The following pair of times were found not in order: ' + dates[i] + " and " + dates[i+1])
            return false; // Found a pair that is not in order
        }
        //console.log('1 date proccessed: ' + dates[i])
    }
    console.log('test passed')
    return true; // All dates are in order
}

// write a test
test('testName', async({ page }) => {

    // navigate to a website
    await page.goto('https://news.ycombinator.com/newest');

    // Get locators
    var timestampLocators = page.locator('span.age');

    // counts the number of timestamp elements
    var count = await timestampLocators.count();

    // Extract and process each timestamp element
    var timestamps = [];
    for (let i = 0; i < count; i++) {
        var timestampSpan = timestampLocators.nth(i);
        
        // Extract the 'title' attribute which contains the timestamp
        var timestampTitle = await timestampSpan.getAttribute('title');

        timestamps.push(new Date(timestampTitle));
    }

    // Log all extracted timestamps
    console.log('Timestamps:', timestamps);

    // Click More Button
    var moreButton = page.getByRole('link', { name: 'More', exact: true })
    await moreButton.click();


    // Get locators
    timestampLocators = page.locator('span.age');

    // counts the number of timestamp elements
    count = await timestampLocators.count();

    // Extract and process each timestamp element
    for (let i = 0; i < count; i++) {
        timestampSpan = timestampLocators.nth(i);
        
        // Extract the 'title' attribute which contains the timestamp
        timestampTitle = await timestampSpan.getAttribute('title');

        timestamps.push(new Date(timestampTitle));
    }

    // Log all extracted timestamps
    console.log('Timestamps:', timestamps);

    // Click More Button
    await moreButton.click();

    // Get more timestamps

    // Get locators
    timestampLocators = page.locator('span.age');
    
    // counts the number of timestamp elements
    count = await timestampLocators.count();

    // Extract and process each timestamp element
    for (let i = 0; i < count; i++) {
        timestampSpan = timestampLocators.nth(i);
        
        // Extract the 'title' attribute which contains the timestamp
        timestampTitle = await timestampSpan.getAttribute('title');

        timestamps.push(new Date(timestampTitle));
    }

    // Log all extracted timestamps
    console.log('Timestamps:', timestamps);

    // Click More Button
    await moreButton.click();

    // Get more timestamps
    // Get locators
    timestampLocators = page.locator('span.age');
    
    // counts the number of timestamp elements
    count = await timestampLocators.count();

    // Extract and process each timestamp element
    for (let i = 0; i < count; i++) {
        timestampSpan = timestampLocators.nth(i);
        
        // Extract the 'title' attribute which contains the timestamp
        timestampTitle = await timestampSpan.getAttribute('title');

        timestamps.push(new Date(timestampTitle));
    }

    // Log all extracted timestamps
    console.log('Timestamps:', timestamps);

    // Check if dates are sorted
    const sorted = areDatesSorted(timestamps);

    // Use `expect` to assert that the dates are sorted
    expect(sorted).toBe(true);

});
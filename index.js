const puppeteer = require('puppeteer');

// Define the URL
const URL = 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGoOKhEPm1ANwAAAZUvZFdgRJuX9WhAqRPbcCAZKzdRN5H3mOMbEkj13Ht5n8a7eJ_1jcU-3dR0k2E7cxloWCdGizPGxlsiAhPQyDxQHqLmQw59ZzxxDgWkjDuQTBKfQ5H-im0=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2F';

const start = async () => {
    // Launch the browser
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: ['--start-maximized', '--no-sandbox'],
        headless: false, // Ensure the browser is visible
        slowMo: 10, // Slow down actions for debugging (optional)
    });

    console.log('Browser launched');

    const page = await browser.newPage();

    // Set the desired viewport size (width, height)
    
    await page.setViewport({ width: 1366, height: 768 });  // Set width to 1366px and height to 768px

    // Navigate to the URL
    await page.goto(URL, { timeout: 0 });

    console.log(`Went to ${URL}`);

    // Wait for the page to load completely
    await page.waitForNetworkIdle({ idleTime: 500 });

    console.log('URL process done');

    // Get the WebSocket endpoint to connect to the same browser later
    const wsEndpoint = browser.wsEndpoint();
    console.log('WebSocket Endpoint:', wsEndpoint);

    // Optionally, keep the browser open for further interaction
    // await browser.close();
};

(async () => {
    await start();
})();

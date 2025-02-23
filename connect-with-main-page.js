const puppeteer = require('puppeteer');


const URL = 'https://www.linkedin.com/school/university-of-manchester/people/?educationStartYear=2020&facetFieldOfStudy=101444%2C101479&keywords=real%20estate'

const browserWSEndpoint = 'ws://127.0.0.1:35095/devtools/browser/3bada9d7-8ecc-4426-84f6-ee276851b2db'; // Use the actual wsEndpoint value

const start = async () => {
    // Connect to the existing browser instance
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });

  // Get the list of all open pages in the browser
  const page = await browser.newPage();
  const content = await page.content()
  print(content)


  // Now you can interact with the page
  await page.goto(URL);
  await page.waitForNetworkIdle();
  console.log('URL process done');
  console.log('wait to make everything extracted')
  await new Promise(function(resolve, reject) { setTimeout( resolve, 1000)});


} 


(async () => {
    await start();
    // await browser.close();
  
  
})();

const fs = require('fs')

const puppeteer = require('puppeteer');
const domains = ['http://localhost:3335/', 'http://localhost:3001/'];

const loops = 100;

function cleanMetricsObj(metrics) {
  return metrics;
}

async function runTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const results = [];
  for(let thisDomain of domains) {
    let thisDomainResponse = [];
    await page.goto(thisDomain);
    const selector = 'body button';
    await page.waitForSelector(selector);

    // aggregate this response with the rest for this domain
    let metrics = cleanMetricsObj(await page.metrics());
    thisDomainResponse.push(metrics);

    for(let i = 0; i < loops; i++) {
      console.log(`${i}/${loops}`);
      await page.click(selector);
      let metrics = cleanMetricsObj(await page.metrics());
      thisDomainResponse.push(metrics);
    }

    // aggregated responses for this domain
    results.push(thisDomainResponse);
  }
      // thisDomainResponse.push(objectsReducer(thisDomainResponse[thisDomainResponse.length - 1], metrics));
  await browser.close();
  return results;
}

(async () => {
  console.log('start');
  let results = await runTests();
  console.log('running');
  let traces = [];
  results.forEach((values, index) => {
    traces[index] = {
      x: [],
      y: []
    };
    values.forEach((test, testIndex) => {
      traces[index]['x'].push(testIndex);
      traces[index]['y'].push(test);
    });
  });
  fs.writeFile('results.json', JSON.stringify(traces), err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Done!');
  })
})();
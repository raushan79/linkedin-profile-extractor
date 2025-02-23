const fs = require("fs");
const cheerio = require("cheerio");
const { createObjectCsvWriter } = require("csv-writer");

const csvWriter = createObjectCsvWriter({
  path: "output.csv", // File path where the CSV will be saved
  header: [
    { id: "name", title: "Name" },
    { id: "title", title: "Title" },
    { id: "linkedInUrl", title: "LinkedIn URL" },
  ],
});

const extractDetails = (htmlContent) => {
  let profiles = [];
  const $ = cheerio.load(htmlContent);
  $("ul.display-flex li").each(function (index, element) {
    const name = $(element).find(".artdeco-entity-lockup__title").text().trim();
    const title = $(element)
      .find(".artdeco-entity-lockup__subtitle")
      .text()
      .trim();
    let linkedInUrl = $(element)
      .find("a.kvxOIgzTihjbTHaLGrgQguzNnXGpbPhmw")
      .attr("href");
    console.log(`Profile ${index + 1}:`);
    console.log("-----------------------------------");
    profilesObj = {
      name: name || "Not available",
      title: title || "Not available",
      linkedInUrl: linkedInUrl?.split("?")[0] || "Not available",
    };
    console.log(profilesObj);
    profiles.push(profilesObj);
  });
  // Write the data to the CSV file
  csvWriter
    .writeRecords(profiles)
    .then(() => {
      console.log("CSV file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing CSV file:", err);
    });
};

extractDetails(fs.readFileSync("input.html", "utf8"));

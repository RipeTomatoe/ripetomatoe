var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var permalinks = require("metalsmith-permalinks");
var asset = require("metalsmith-static");
var beautify = require("metalsmith-beautify");
var date = new Date();

var data = {
  title: "Daniel Cossu | Game Developer",
  description: "The home of Daniel Cossu!",
  year: date.getFullYear(),
  url: "https://ripetomatoe.github.io/",
  headerTitle: "DANIEL COSSU",
  links: [
    {
      name: "LINKEDIN",
      url: "https://www.linkedin.com/in/dcossu",
      isExternal: true,
    }, // },
    // {
    //   name: "GITHUB",
    //   url: "https://github.com/ripetomatoe",
    //   isExternal: true,
    // },
  ],
};

Metalsmith(__dirname)
  .metadata(data)
  .source("./src")
  .destination("./build")
  .clean(false)
  .use(markdown())
  .use(
    permalinks({
      relative: false,
    })
  )
  .use(
    layouts({
      engine: "handlebars",
    })
  )
  .use(
    asset({
      src: "public",
      dest: ".",
      createDest: true,
    })
  )
  .use(beautify())
  .build(function (err, files) {
    if (err) {
      throw err;
    }
  });

const express = require("express");
const app = express();

app.use(express.static("build"));

app.listen(9292, () => console.log("Site running on http://localhost:9292!"));

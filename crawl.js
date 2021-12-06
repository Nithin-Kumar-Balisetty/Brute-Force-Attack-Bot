let fetch = require("node-fetch");
let cheerio = require("cheerio");
let path = require("path");
let urlParser = require("url");

const seenUrls = {};

const getUrl = (link, host, protocol) => {
  if (link.includes("https")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url }) => {
  if (seenUrls[url]) return;
  console.log("crawling", url);
  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const links = $("a").map((i, link) => link.attribs.href).get();

    links.filter((link) => !link.includes('discord') && !link.includes('instagram') && !link.includes('#')).forEach((link) => {
        crawl({
        url: getUrl(link, host, protocol),
      });
    });
};

crawl({
  url: "https://team27-phase2.herokuapp.com/",
});
import http from "http";
import { downloadImages } from "./download-helpers.js";
import { getGalleryContent, getHomePageContent } from "./ui-helpers.js";

const parseSiteMap = async (url) => {
  const response = await fetch(`${url}/sitemap.xml`);
  const xml = await response.text();
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);
};

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, val = true] = arg.split("=");
    return [key.replace(/^--/, ""), val];
  })
);

const targetUrl = args.url || "";

(async () => {
  if (!targetUrl) {
    console.error("Please provide a target URL using --url=");
    process.exit(1);
  } else {
    console.table(args);
  }
  const urls = await parseSiteMap(targetUrl);
  const htmlPages = [];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const matches = text.matchAll(/<img[^>]+src=["']([^"']+)["']/g);

      const imageUrls = [];

      for (const match of matches) {
        imageUrls.push(match[1]);
      }

      if (args.download) {
        await downloadImages(
          imageUrls,
          url.replace(targetUrl, "").replace(/\//g, "_")
        );
      }

      const html = getGalleryContent(imageUrls);
      htmlPages.push({ url: url.replace(targetUrl, ""), html });
    } catch (error) {
      console.error(`Error processing ${url}: ${error}`);
    }
  }

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(getHomePageContent(htmlPages));
    } else {
      const page = htmlPages.find((p) => p.url === req.url);
      if (page) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Images for ${req.url}</title>
        </head>
        <body>
          <a href="/">Back to index</a>
          ${page.html}
        </body>
        </html>`);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    }
  });

  server.listen(3001, () => console.log("http://localhost:3001"));
})();

export const getGalleryContent = (urls) => {
  return `<section>
    ${urls
      .map(
        (url) => `<img src="${url}" style="max-width: 300px; margin: 10px;" />`
      )
      .join("")}
    </section>`;
};

export const getHomePageContent = (pages) => {
  return `<!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Image Gallery</title>
        </head>
        <body>
        <h1>Image Gallery</h1>
        <ul>
            ${pages
              .map((page) => `<li><a href="${page.url}">${page.url}</a></li>`)
              .join("")}
        </ul>
      </body>
      </html>`;
};

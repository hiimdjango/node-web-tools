import https from "https";
import fs from "fs";

const outputDir = "./output/images/";

export const downloadImage = async (url, filename) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(outputDir, { recursive: true });
    https.get(url, (response) => {
      if (response.statusCode == 200) {
        const ext = response.headers["content-type"].split("/")[1] || "jpg";
        const file = fs.createWriteStream(`${outputDir}${filename}.${ext}`);
        response.pipe(
          file
            .on("error", () => {
              reject(`Failed to download image: ${url}`);
            })
            .once("finish", () => {
              resolve(filename);
            })
        );
      } else {
        response.resume(); // consume response data to free up memory
        reject(`Failed to download image: ${url}`);
      }
    });
  });
};

export const downloadImages = async (urls, groupName) => {
  let index = 0;
  for (const url of urls) {
    await downloadImage(url, `${groupName}_${index}`);
    index++;
  }
};

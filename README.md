# Node Web Tools

A lightweight Node.js tool for web crawling and image extraction. This tool parses website sitemaps, extracts images from all pages, and provides a local gallery interface to browse and optionally download the extracted images.

## Features

- **Sitemap Parsing**: Automatically fetches and parses a website's sitemap.xml
- **Image Extraction**: Crawls all URLs from the sitemap and extracts image sources
- **Optional Download**: Save all extracted images locally with organized naming
- **Gallery Interface**: Built-in HTTP server with a clean gallery UI to browse extracted images
- **Page Organization**: Images are grouped by their source page URL

## Installation

```bash
# Clone the repository
git clone https://github.com/hiimdjango/node-web-tools.git

# Navigate to the project directory
cd node-web-tools

# Install dependencies (if any are added in the future)
npm install
```

## Usage

### Basic Usage (Browse Only)

Extract images and view them in a local gallery without downloading:

```bash
npm start -- --url=https://example.com
```

Or directly with node:

```bash
node crawl.js --url=https://example.com
```

### Extract and Download Images

Extract images and save them to the `./output/images/` directory:

```bash
npm run extract -- --url=https://example.com
```

Or directly with node:

```bash
node crawl.js --url=https://example.com --download
```

### Access the Gallery

After running either command, the gallery will be available at:

```
http://localhost:3001
```

The homepage displays a list of all crawled pages. Click on any page to view its extracted images.

## Project Structure

```
node-web-tools/
├── crawl.js              # Main entry point - handles sitemap parsing and server
├── download-helpers.js   # Image downloading functionality
├── ui-helpers.js         # HTML generation for gallery interface
├── package.json          # Project metadata and scripts
└── output/               # Generated directory for downloaded images
    └── images/
```

## How It Works

1. **Sitemap Parsing**: The tool fetches the sitemap.xml from the target URL and extracts all page URLs
2. **Page Crawling**: Each URL is fetched and parsed for image sources using regex matching
3. **Image Processing**:
   - Images are displayed in the gallery interface
   - If `--download` flag is used, images are downloaded to `./output/images/`
4. **Gallery Server**: An HTTP server runs on port 3001, providing:
   - Homepage with links to all crawled pages
   - Individual gallery pages showing all images from each URL

## Requirements

- Node.js (ES Modules support required)
- Target website must have a sitemap.xml file

## Command Line Arguments

- `--url`: (Required) The target website URL to crawl
- `--download`: (Optional) Download images to local storage

## Output

When using the `--download` flag, images are saved to:
```
./output/images/
```

Images are named using the pattern: `{page-url-slug}_{index}.{extension}`

## License

MIT

## Author

hiimdjango

## Repository

https://github.com/hiimdjango/node-web-tools

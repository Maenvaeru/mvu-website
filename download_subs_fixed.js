const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve();
            return;
        }
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function scrapeSubsImages() {
    try {
        const data = JSON.parse(fs.readFileSync('boosty_data.json', 'utf8'));

        // Download subs images
        console.log("Downloading subscription thumbnails...");

        if (data.subs && data.subs.data) {
            let index = 1;
            for (const s of data.subs.data) {
                if (!s.deleted) {
                    let imgUrl = null;

                    if (s.data && Array.isArray(s.data)) {
                        for (const block of s.data) {
                            if (block.type === 'image' && block.url) {
                                imgUrl = block.url;
                                break;
                            }
                        }
                    }

                    if (imgUrl) {
                        const dest = path.join(imgDir, `sub_${index}.jpg`);
                        await download(imgUrl, dest);
                        console.log(`Downloaded image for sub: ${s.name} -> sub_${index}.jpg`);
                    } else {
                        console.log(`No image found for sub: ${s.name} -> sub_${index}.jpg`);
                    }
                }
                index++;
            }
        }
        console.log("Done downloading sub images.");
    } catch (err) {
        console.error("Error scraping images:", err);
    }
}
scrapeSubsImages();

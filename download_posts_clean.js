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

async function scrapePostsImages() {
    try {
        const data = JSON.parse(fs.readFileSync('boosty_data.json', 'utf8'));

        // Download posts images
        console.log("Downloading post thumbnails properly...");
        let count = 0;
        const items = [];
        if (data.posts && data.posts.data) {
            for (const p of data.posts.data) {
                let imgUrl = null;
                if (p.teaser) {
                    for (const block of p.teaser) {
                        if (block.type === 'image' && block.url) {
                            imgUrl = block.url;
                            break;
                        }
                    }
                }

                if (imgUrl) {
                    count++;
                    const dest = path.join(imgDir, `post_${count}.jpg`);
                    await download(imgUrl, dest);
                    items.push({ id: `post_${count}`, title: p.title, url: imgUrl });
                    console.log(`Downloaded image for: ${p.title} -> post_${count}.jpg`);
                    if (count >= 4) break; // top 4 for showcase
                }
            }
        }
        fs.writeFileSync('posts_showcase.json', JSON.stringify(items, null, 2));
        console.log("Done downloading post images.");
    } catch (err) {
        console.error("Error scraping images:", err);
    }
}
scrapePostsImages();

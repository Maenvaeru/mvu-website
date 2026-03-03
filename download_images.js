const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

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

async function scrapeImages() {
    try {
        const data = JSON.parse(fs.readFileSync('boosty_data.json', 'utf8'));

        // Download Cover
        console.log("Downloading cover...");
        const blogRes = await fetch('https://api.boosty.to/v1/blog/maenvaeru');
        const blogData = await blogRes.json();
        if (blogData.coverUrl) {
            await download(blogData.coverUrl, path.join(imgDir, 'cover.jpg'));
            console.log("Cover downloaded.");
        }
        if (blogData.owner && blogData.owner.avatarUrl) {
            await download(blogData.owner.avatarUrl, path.join(imgDir, 'avatar.jpg'));
            console.log("Avatar downloaded.");
        }

        // Download posts images
        console.log("Downloading post thumbnails...");
        let count = 0;
        if (data.posts && data.posts.data) {
            for (const p of data.posts.data) {
                // We look for the first image in the post content
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
                    const safeTitle = p.title ? p.title.replace(/[^a-z0-9]/gi, '_').substring(0, 30) : `post_${p.id}`;
                    const dest = path.join(imgDir, `${safeTitle}.jpg`);
                    await download(imgUrl, dest);
                    console.log(`Downloaded image for: ${p.title} -> ${safeTitle}.jpg`);
                    count++;
                    if (count >= 6) break; // Download top 6 for the showcase
                }
            }
        }
        console.log("Done downloading images.");
    } catch (err) {
        console.error("Error scraping images:", err);
    }
}
scrapeImages();

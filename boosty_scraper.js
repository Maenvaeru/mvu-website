const fs = require('fs');

async function scrape() {
    try {
        const data = {};

        console.log("Fetching subscription levels...");
        const subsRes = await fetch('https://api.boosty.to/v1/blog/maenvaeru/subscription_level/');
        if (subsRes.ok) data.subs = await subsRes.json();

        console.log("Fetching posts (showcase/products)...");
        const postsRes = await fetch('https://api.boosty.to/v1/blog/maenvaeru/post/?limit=50');
        if (postsRes.ok) data.posts = await postsRes.json();

        fs.writeFileSync('boosty_data.json', JSON.stringify(data, null, 2));
        console.log('Successfully saved to boosty_data.json');
    } catch (err) {
        console.error("Error scraping:", err);
    }
}
scrape();

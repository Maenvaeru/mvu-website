const fs = require('fs');
const data = JSON.parse(fs.readFileSync('boosty_data.json', 'utf8'));

console.log("=== SUBSCRIPTIONS ===");
if (data.subs && data.subs.data) {
    data.subs.data.forEach(s => {
        if (!s.deleted) {
            console.log(`- ${s.name} | ${s.price} RUB | Subscribers: ${s.subscribersCount}`);
            // parse benefits
            // s.description usually contains blocks
        }
    });
}

console.log("\n=== PRODUCTS/SHOWCASE ===");
if (data.posts && data.posts.data) {
    data.posts.data.forEach(p => {
        if (p.price > 0 && p.showcase) {
            console.log(`- ${p.title} | ${p.price} RUB`);
        } else if (p.tags && p.tags.length > 0) {
            if (p.title) {
                console.log(`- [POST] ${p.title.substring(0, 50)}`);
            }
        }
    });
}

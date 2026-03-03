const https = require('https');
const fs = require('fs');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (response) => {
            let redirectUrl = response.headers.location;
            if (!redirectUrl && response.headers['content-location']) {
                redirectUrl = response.headers['content-location'];
            }
            if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307 || response.statusCode === 308) {
                console.log('Redirecting to:', redirectUrl || 'unknown');
                if (!redirectUrl) return reject('Redirect without location header');
                file.close();

                let newUrl = redirectUrl;
                if (redirectUrl.startsWith('/')) {
                    const parsed = new URL(url);
                    newUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
                }

                download(newUrl, dest).then(resolve).catch(reject);
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                    console.log('Download successful.');
                });
            } else {
                reject(`Failed with status: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
}

if (!fs.existsSync('.bin')) fs.mkdirSync('.bin');
download('https://frippery.org/files/busybox/busybox.exe', '.bin/bash.exe').catch(console.error);

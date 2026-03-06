const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Logo Replacement
const logoBuffer = fs.readFileSync('Logo_final_ver.png');
const base64Logo = 'data:image/png;base64,' + logoBuffer.toString('base64');
// The current logo is href="CK logo.png" according to the previous replacement run
html = html.replace(/href="CK logo\.png"/g, `href="${base64Logo}"`);

// Also catch if it was somehow left as data:image...
if (!html.includes(base64Logo)) {
     html = html.replace(/href="data:image\/[^"]+"/g, `href="${base64Logo}"`);
}

// 2. Hero Image Swap
html = html.replace(/Revive_Ver2\.jpg/g, 'Hero.jpg');

// 3. Service Cards Swap
html = html.replace(/<img src="[^"]+" alt="Dealership & Fleet"/g, '<img src="c_k.jpg" alt="Dealership & Fleet"');
html = html.replace(/<img src="[^"]+" alt="Insurance Claims"/g, '<img src="ck.jpg" alt="Insurance Claims"');

fs.writeFileSync('index.html', html);
console.log('Images and logo updated successfully!');

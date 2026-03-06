const fs = require('fs');
const path = require('path');

const baseDir = 'instagram posts and reels';
const postsDir = path.join(baseDir, 'image posts');
const reelsDir = path.join(baseDir, 'reels');

const mediaInfo = { posts: [], reels: [] };

if (fs.existsSync(postsDir)) {
    const postFolders = fs.readdirSync(postsDir).filter(f => fs.statSync(path.join(postsDir, f)).isDirectory());
    // sort naturally
    postFolders.sort((a,b) => parseInt(a.replace(/[^0-9]/g, '')) - parseInt(b.replace(/[^0-9]/g, '')));
    for (const folder of postFolders) {
        const p = path.join(postsDir, folder);
        const files = fs.readdirSync(p);
        const images = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png')).map(f => path.join(p, f));
        let url = '';
        if (files.includes('url.txt')) {
            url = fs.readFileSync(path.join(p, 'url.txt'), 'utf8').trim();
        }
        if (images.length > 0) {
            mediaInfo.posts.push({ dir: folder, images, url });
        }
    }
}

if (fs.existsSync(reelsDir)) {
    const reelFolders = fs.readdirSync(reelsDir).filter(f => fs.statSync(path.join(reelsDir, f)).isDirectory());
    reelFolders.sort((a,b) => parseInt(a.replace(/[^0-9]/g, '')) - parseInt(b.replace(/[^0-9]/g, '')));
    for (const folder of reelFolders) {
        const p = path.join(reelsDir, folder);
        const files = fs.readdirSync(p);
        const video = files.find(f => f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.webm'));
        let url = '';
        if (files.includes('url.txt')) {
            url = fs.readFileSync(path.join(p, 'url.txt'), 'utf8').trim();
        }
        if (video) {
            mediaInfo.reels.push({ dir: folder, video: path.join(p, video), url });
        }
    }
}

fs.writeFileSync('media_info.json', JSON.stringify(mediaInfo, null, 2));
console.log('media_info.json regenerated!');

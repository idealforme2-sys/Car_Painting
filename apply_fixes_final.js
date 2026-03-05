const fs = require('fs');

let indexContent = fs.readFileSync('./index.html', 'utf8');
const mediaInfo = JSON.parse(fs.readFileSync('./media_info.json', 'utf8'));

// 1. Portfolio items
let html = '';
let postIdx = 0;
let reelIdx = 0;

for (let i = 0; i < 16; i++) {
    // Alternate post and reel, or use the other if one runs out
    if ((i % 2 === 0 || reelIdx >= mediaInfo.reels.length) && postIdx < mediaInfo.posts.length) {
        const post = mediaInfo.posts[postIdx];
        const carouselId = `carousel-${postIdx}`;
        let slides = '';
        let dots = '';
        post.images.forEach((img, idx) => {
            const encodedImg = img.replace(/\\/g, '/');
            slides += `<img src="${encodedImg}" alt="Portfolio Post" class="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 -z-10'}" data-carousel="${carouselId}" data-index="${idx}" onclick="window.open('${post.url}', '_blank')">`;
            dots += `<button class="w-2 h-2 rounded-full ${idx === 0 ? 'bg-racingRed' : 'bg-white/50'} mx-1 transition-colors" data-carousel="${carouselId}" data-dot="${idx}" onclick="setSlide('${carouselId}', ${idx}, event)"></button>`;
        });

        html += `
                <div class="relative h-[450px] overflow-hidden group clip-reveal rounded-xl border border-white/10" id="${carouselId}">
                    ${slides}
                    <div class="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    
                    <!-- Navigation -->
                    ${post.images.length > 1 ? `
                    <button class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-carbon/50 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-racingRed" onclick="prevSlide('${carouselId}', event)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-carbon/50 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-racingRed" onclick="nextSlide('${carouselId}', event)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                    <!-- Indicators -->
                    <div class="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-auto">
                        ${dots}
                    </div>
                    ` : ''}

                    <a href="${post.url}" target="_blank" class="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                </div>`;
        postIdx++;
    } else if (reelIdx < mediaInfo.reels.length) {
        const reel = mediaInfo.reels[reelIdx];
        const videoId = `video-${reelIdx}`;
        const encodedVid = reel.video.replace(/\\/g, '/');

        html += `
                <div class="relative h-[450px] overflow-hidden group clip-reveal rounded-xl border border-white/10 video-container">
                    <video id="${videoId}" class="w-full h-full object-cover cursor-pointer" autoplay loop muted playsinline onclick="window.open('${reel.url}', '_blank')">
                        <source src="${encodedVid}" type="video/mp4">
                    </video>
                    <div class="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    
                    <button class="absolute bottom-4 left-4 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10" onclick="toggleMute('${videoId}', event)">
                        <svg class="mute-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        <svg class="unmute-icon hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>

                    <a href="${reel.url}" target="_blank" class="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect></svg>
                    </a>
                </div>`;
        reelIdx++;
    }
}

// 2. Replace Portfolio Grid
indexContent = indexContent.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-container">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/,
    `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-container">
${html}
            </div>$1`
);


// 3. New Preloader HTML
const preloaderHTML = `<!-- Preloader -->
    <style>
        @keyframes loaderWidth {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        @keyframes textReveal {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .preloader-hidden {
            opacity: 0;
            pointer-events: none;
        }
    </style>
    <div id="preloader" class="fixed inset-0 z-[100] flex items-center justify-center bg-carbon transition-opacity duration-700 ease-in-out">
        <div class="absolute inset-0 bg-[url('Logo.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div class="relative z-10 flex flex-col items-center pointer-events-none">
            <div class="overflow-hidden mb-6">
                <h1 class="font-heading text-5xl md:text-6xl text-white font-bold tracking-[0.3em] uppercase" style="animation: textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;">Revive</h1>
            </div>
            <div class="w-64 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
                <div class="absolute top-0 left-0 h-full bg-racingRed shadow-[0_0_15px_#e53935]" style="animation: loaderWidth 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;"></div>
            </div>
            <div class="mt-8 font-heading text-xs text-steel tracking-[0.4em] uppercase" style="animation: textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0;">
                Paint & Panel
            </div>
        </div>
    </div>`;

indexContent = indexContent.replace(
    /<!-- Preloader -->[\s\S]*?<!-- Emergency Top Bar -->/,
    preloaderHTML + `
    <div class="noise-overlay"></div>
    <div id="cursor"></div>
    <div id="cursor-follower"></div>

    <!-- Emergency Top Bar -->`
);

// 4. Update preloader hiding logic in script
indexContent = indexContent.replace(
    /loader\.classList\.add\('opacity-0'\);\s*setTimeout\(\(\) => loader\.style\.display = 'none', 500\);/g,
    `setTimeout(() => {
                    loader.classList.add('preloader-hidden');
                    setTimeout(() => loader.style.display = 'none', 700);
                }, 1500);`
);

// 5. Update Map iframe
indexContent = indexContent.replace(
    /class="absolute inset-0 cursor-hover pointer-events-none"><\/iframe>/,
    `class="absolute inset-0 z-20 will-change-transform transform-gpu"></iframe>`
);
// In case pointer-events-none was slightly different
indexContent = indexContent.replace(
    /class="absolute inset-0[^"]*pointer-events-none[^"]*"><\/iframe>/,
    `class="absolute inset-0 z-20 will-change-transform transform-gpu"></iframe>`
);

fs.writeFileSync('./index.html', indexContent);
console.log('Fixed portfolio, map, and preloader.');

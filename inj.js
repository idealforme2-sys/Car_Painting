const fs = require('fs');
const mediaInfo = JSON.parse(fs.readFileSync('./media_info.json', 'utf8'));

let html = '';
let postIdx = 0;
let reelIdx = 0;

for (let i = 0; i < 12; i++) {
    // Alternate post and reel. We have 7 posts and 5 reels for a total of 12 items.
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

// Read index.html
let indexContent = fs.readFileSync('./index.html', 'utf8');

// Replace Portfolio Grid
indexContent = indexContent.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-container">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/,
    `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-container">
${html}
            </div>$1`
);


const logoBuffer = fs.readFileSync('Logo_final_ver.png');
const base64Logo = 'data:image/png;base64,' + logoBuffer.toString('base64');

// New Sleek Preloader HTML
const preloaderHTML = `<!-- Preloader -->
    <style>
        @keyframes pulseLogo {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 20px #e53935; }
            100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes spinRing {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .preloader-hidden {
            opacity: 0;
            pointer-events: none;
        }
    </style>
    <div id="preloader" class="fixed inset-0 z-[100] flex items-center justify-center bg-carbon transition-opacity duration-700 ease-in-out">
        <div class="absolute inset-0 bg-[url('Hero.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div class="relative z-10 flex flex-col items-center pointer-events-none">
            <div class="relative w-32 h-32 mb-8 flex items-center justify-center">
                <svg class="absolute inset-0 w-full h-full text-racingRed opacity-80" viewBox="0 0 100 100" style="animation: spinRing 2s linear infinite;">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="20 10 5 10 30 15"></circle>
                </svg>
                <svg width="80" height="80" viewBox="0 0 100 100" class="rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <defs>
                        <clipPath id="preloader-clip">
                            <circle cx="50" cy="50" r="50" />
                        </clipPath>
                    </defs>
                    <image href="${base64Logo}" width="100" height="100" clip-path="url(#preloader-clip)" preserveAspectRatio="xMidYMid slice" />
                </svg>
            </div>
            <div class="font-heading text-3xl md:text-5xl text-white font-bold tracking-[0.2em] uppercase" style="animation: pulseLogo 2s ease-in-out infinite;">
                CK Paint
            </div>
            <div class="mt-4 font-body text-xs text-steel tracking-[0.4em] uppercase opacity-70">
                Paint & Panel
            </div>
        </div>
    </div>`;

// Inject new preloader
indexContent = indexContent.replace(
    /<!-- Preloader -->[\s\S]*?<!-- Emergency Top Bar -->/,
    preloaderHTML + `\n    <div class="noise-overlay"></div>\n    <div id="cursor"></div>\n    <div id="cursor-follower"></div>\n\n    <!-- Emergency Top Bar -->`
);

fs.writeFileSync('./index.html', indexContent);
console.log('Portfolio injected and preloader upgraded successfully!');

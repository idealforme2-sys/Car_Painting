const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Make hero image covering smaller
content = content.replace(
    'class="w-full h-[120%] object-cover transform -translate-y-[15%] hero-img opacity-50"',
    'class="w-full h-full object-cover hero-img opacity-50"'
);

// 2. Replace preloader from scratch
content = content.replace(
    /<div id="preloader"[\s\S]*?<div class="noise-overlay">/m,
    `<div id="preloader" class="fixed inset-0 z-[100] bg-carbon flex justify-center items-center transition-opacity duration-500 ease-in-out">
        <div class="text-4xl md:text-6xl font-heading font-bold text-white tracking-[0.2em] uppercase animate-pulse">
            Revive <span class="text-racingRed">Paint & Panel</span>
        </div>
    </div>
    <div class="noise-overlay">`
);

// 3. Swap dealership image
content = content.replace('src="dealership_fleet.png"', 'src="dealership.jpg"');

// 4. Swap insurance claims image
content = content.replace('src="insurance_claims.png"', 'src="revive.jpg"');

// 5. Fix HTML classes for Mute / Unmute icons (there are 3 sets of such icons)
content = content.replaceAll('<svg class="mute-icon hidden"', '<svg class="mute-icon"');
content = content.replaceAll('<svg class="unmute-icon" width="20"', '<svg class="unmute-icon hidden" width="20"');

// 6. Fix Javascript Mute Logic
const oldLogicStr = `if (video.muted) {
                video.muted = false;
                muteIcon.classList.remove('hidden');
                unmuteIcon.classList.add('hidden');
            } else {
                video.muted = true;
                muteIcon.classList.add('hidden');
                unmuteIcon.classList.remove('hidden');
            }`;
const newLogicStr = `if (video.muted) {
                video.muted = false;
                muteIcon.classList.add('hidden');
                unmuteIcon.classList.remove('hidden');
            } else {
                video.muted = true;
                muteIcon.classList.remove('hidden');
                unmuteIcon.classList.add('hidden');
            }`;
content = content.replace(oldLogicStr, newLogicStr);

// 7. Remove the literal '\n\n' text near the Google Map
content = content.replaceAll('\\n\\n', '\n\n');

fs.writeFileSync('index.html', content);
console.log('Fixes applied successfully.');

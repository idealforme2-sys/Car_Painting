const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Mobile Menu Button & Overlay
content = content.replace(
    /<div class="hidden md:block">\s*<a href="#contact" class="btn-primary cursor-hover text-sm py-3 px-6 rounded">Get a Free Quote<\/a>\s*<\/div>\s*<\/nav>/m,
    `<div class="hidden md:block">
            <a href="#contact" class="btn-primary cursor-hover text-sm py-3 px-6 rounded">Get a Free Quote</a>
        </div>
        <div class="lg:hidden flex items-center z-50">
            <button id="mobile-menu-btn" class="text-white hover:text-racingRed focus:outline-none transition-colors cursor-hover">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 bg-carbon/95 backdrop-blur-md z-[100] hidden flex-col items-center justify-center gap-8 opacity-0 transition-opacity duration-300">
        <a href="#services" class="mobile-link text-2xl font-heading text-white uppercase tracking-widest hover:text-racingRed transition-colors">Services</a>
        <a href="#process" class="mobile-link text-2xl font-heading text-white uppercase tracking-widest hover:text-racingRed transition-colors">How It Works</a>
        <a href="#gallery" class="mobile-link text-2xl font-heading text-white uppercase tracking-widest hover:text-racingRed transition-colors">Gallery</a>
        <a href="#faq" class="mobile-link text-2xl font-heading text-white uppercase tracking-widest hover:text-racingRed transition-colors">FAQ</a>
        <a href="#contact" class="mobile-link text-2xl font-heading text-white uppercase tracking-widest hover:text-racingRed transition-colors">Contact</a>
        <a href="#contact" class="mobile-link btn-primary mt-4 py-3 px-8 text-lg rounded-lg">Get a Free Quote</a>
    </div>`
);

// 2. Mobile Menu JS
content = content.replace(
    /<\/script>\s*<\/body>/m,
    `
        // Mobile Menu Logic
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        let menuOpen = false;

        function toggleMenu() {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }, 300);
            }
        }

        if (mobileBtn) {
            mobileBtn.addEventListener('click', toggleMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });
    </script>
</body>`
);

// 3. Hero image sizing
content = content.replace(
    /<img src="Revive_Ver2\.jpg" alt="Premium Car Repair Adelaide"\s+class="w-full h-full object-cover hero-img opacity-50"\s+style="object-position: 60% 40%;" \/>/m,
    '<img src="Revive_Ver2.jpg" alt="Premium Car Repair Adelaide" class="w-full h-full object-contain object-right hero-img opacity-60" />'
);

// 4. Mail icon sizing
content = content.replace(
    /<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"\s+stroke-width="2">\s+<path\s+d="M4 4h16c1\.1 0 2 \.9 2 2v12c0 1\.1-\.9 2-2 2H4c-1\.1 0-2-\.9-2-2V6c0-1\.1\.9-2 2-2z">\s+<\/path>\s+<polyline points="22,6 12,13 2,6"><\/polyline>\s+<\/svg>/m,
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>`
);

fs.writeFileSync('index.html', content);
console.log('Mobile features applied successfully.');

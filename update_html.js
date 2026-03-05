const fs = require('fs');
let file = fs.readFileSync('c:/Users/SHINIGAMI/Desktop/Car_Painting/index.html', 'utf8');
const logoBase64 = fs.readFileSync('c:/Users/SHINIGAMI/Desktop/Car_Painting/Logo_base64.txt', 'utf8').trim();

// 1. Hero layout
file = file.replace(
    '<section class="relative h-[100vh] flex items-center justify-center overflow-hidden pt-20">',
    '<section class="relative min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden pt-20">'
);
file = file.replace(
    'src="https://images.unsplash.com/photo-1611821064430-0d40221e4f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"',
    'src="revive.jpg"'
);

// 2. Trust cards loading (remove fade-up)
file = file.replace('<div class="fade-up px-4 group">', '<div class="px-4 group">');
file = file.replace('<div class="fade-up px-4 group" style="transition-delay: 0.1s;">', '<div class="px-4 group">');
file = file.replace('<div class="fade-up px-4 group" style="transition-delay: 0.2s;">', '<div class="px-4 group">');
file = file.replace('<div class="fade-up px-4 group" style="transition-delay: 0.3s;">', '<div class="px-4 group">');

// 3. Service images
file = file.replace('src="https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80"');
file = file.replace('src="https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"');
file = file.replace('src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80"');
file = file.replace('src="https://images.unsplash.com/photo-1600705353846-512c011e40a0?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80"');
file = file.replace('src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80"');
file = file.replace('src="https://images.unsplash.com/photo-1551608779-c5c8f61e7d0f?auto=format&fit=crop&w=800&q=80"', 'src="https://images.unsplash.com/photo-1518225547634-111005fbcdea?w=800&q=80"');

// 4. Navbar logo replacements
const logoSvg = `<svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="transform group-hover:rotate-12 transition-transform duration-500"><defs><clipPath id="circle-cut"><circle cx="50" cy="50" r="50"/></clipPath></defs><image href="data:image/jpeg;base64,${logoBase64}" width="100" height="100" clip-path="url(#circle-cut)" preserveAspectRatio="xMidYMid slice"/></svg>`;
const regexNavLogo = /<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#dc2626"[^>]+><path d="[^"]+"\/><\/svg>/;
const regexFooterLogo = /<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626"[^>]+><path d="[^"]+"\/><\/svg>/;

file = file.replace(regexNavLogo, logoSvg);
file = file.replace(regexFooterLogo, logoSvg.replace('width="36" height="36"', 'width="28" height="28"').replace('class="transform group-hover:rotate-12 transition-transform duration-500"', ''));

// 5. Move FAQ
let faqStartMarker = '<!-- 7 FAQ Section -->';
let faqStartIndex = file.indexOf(faqStartMarker);
if (faqStartIndex !== -1) {
    let sub = file.substring(faqStartIndex);
    let faqEndIndex = faqStartIndex + sub.indexOf('</section>') + '</section>'.length;
    let faqHTML = file.substring(faqStartIndex, faqEndIndex);
    
    // Remove it from original
    let newFile = file.substring(0, faqStartIndex) + file.substring(faqEndIndex);
    
    // Insert before map
    let mapMarker = '<!-- Google Map -->';
    let mapIndex = newFile.indexOf(mapMarker);
    if (mapIndex !== -1) {
        newFile = newFile.substring(0, mapIndex) + faqHTML + '\\n\\n            ' + mapMarker + newFile.substring(mapIndex + mapMarker.length);
        fs.writeFileSync('c:/Users/SHINIGAMI/Desktop/Car_Painting/index.html', newFile);
        console.log('Successfully updated HTML file');
    } else {
        console.log('Map not found');
    }
} else {
    console.log('FAQ not found');
}

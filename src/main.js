import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Smooth Scroll (Lenis)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync GSAP ScrollTrigger with Lenis
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
        gsap.ticker.lagSmoothing(0);

        // Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');
        const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea, select, .faq-item');

        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

        gsap.to({}, 0.016, {
            repeat: -1,
            onRepeat: function() {
                posX += (mouseX - posX) / 6;
                posY += (mouseY - posY) / 6;
                
                gsap.set(follower, {
                    css: { left: posX, top: posY }
                });
                gsap.set(cursor, {
                    css: { left: mouseX, top: mouseY }
                });
            }
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
        });

        // Magnetic Button effect
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { duration: 0.3, x: x * 0.2, y: y * 0.2, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', function() {
                gsap.to(btn, { duration: 0.3, x: 0, y: 0, ease: 'power2.out' });
            });
        });

        // FAQ Accordion Logic
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const button = item.querySelector('.faq-button');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');

            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all others
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                    otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    otherItem.style.borderColor = 'rgba(255,255,255,0.05)';
                });

                if (!isOpen) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(45deg)';
                    item.style.borderColor = 'rgba(220, 38, 38, 0.4)'; // Highlight active FAQ
                }
            });
        });

        // GSAP Animations
        
        // Initial Loading Hero Animations
        const tl = gsap.timeline();
        tl.to('.text-mask-inner', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2
        })
        .to('.hero-btns', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");

        // Hero Parallax
        gsap.to('.hero-img', {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-img",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Image unmasking (Gallery)
        gsap.utils.toArray('.clip-reveal').forEach(container => {
            gsap.fromTo(container, 
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1.5,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                    }
                }
            );
        });

        // Universal Fade Up Elements
        gsap.utils.toArray('.fade-up').forEach(element => {
            gsap.fromTo(element, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Navbar styling on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                navbar.classList.add('bg-carbon/95', 'shadow-2xl');
                navbar.classList.remove('bg-carbon/60');
            } else {
                navbar.classList.remove('bg-carbon/95', 'shadow-2xl');
                navbar.classList.add('bg-carbon/60');
            }
        });


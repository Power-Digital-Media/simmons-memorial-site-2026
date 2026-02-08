// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const heroVideo = document.querySelector('.hero-video');
    const scrolled = window.scrollY;

    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax Hero
    if (heroVideo) {
        heroVideo.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            document.getElementById('nav-overlay').classList.remove('active');
        }
    });
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const navOverlay = document.getElementById('nav-overlay');

menuToggle?.addEventListener('click', () => navOverlay.classList.add('active'));
closeMenu?.addEventListener('click', () => navOverlay.classList.remove('active'));

// Intersection Observer for Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Stagger internal elements if it's a grid/container
            const staggeredItems = entry.target.querySelectorAll('.bento-item, .team-member, .card');
            staggeredItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('active');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .reveal').forEach(el => revealObserver.observe(el));

// --- 2026 INTERACTIONS ---

// 1. Custom Cinematic Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const interactiveElements = document.querySelectorAll('a, button, .bento-item, .card, .menu-toggle');

window.addEventListener('mousemove', e => {
    if (!cursor || !cursorDot) return;

    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';

    // Smooth follow logic would be ideal, but direct for now for performance
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-hover'));
});

// 2. Magnetic Logo & Buttons
const magneticElements = document.querySelectorAll('.btn, .logo, .nav-links a');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        if (cursor) cursor.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0) translate(-50%, -50%) scale(1.5)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate3d(0, 0, 0)`;
        if (cursor) cursor.style.transform = `translate(-50%, -50%) scale(1)`;
    });
});

// 3. 3D Tilt for Bento Items & Cards
const tiltItems = document.querySelectorAll('.bento-item, .card');

tiltItems.forEach(item => {
    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 50; // Divided by 50 instead of 15 for subtle movement
        const rotateY = (x - centerX) / 50;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

        // Add dynamic glare based on mouse position
        const glare = item.querySelector('.glare') || document.createElement('div');
        if (!item.querySelector('.glare')) {
            glare.classList.add('glare');
            item.appendChild(glare);
            // Glare styles (inline for simplicity or add to CSS)
            Object.assign(glare.style, {
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`,
                pointerEvents: 'none',
                zIndex: 10
            });
        }
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        const glare = item.querySelector('.glare');
        if (glare) glare.style.opacity = '0';
    });

    item.addEventListener('mouseenter', () => {
        const glare = item.querySelector('.glare');
        if (glare) glare.style.opacity = '1';
    });
});

// 4. Headers Reveal
document.querySelectorAll('h1, h2').forEach(h => {
    revealObserver.observe(h);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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

menuToggle.addEventListener('click', () => navOverlay.classList.add('active'));
closeMenu.addEventListener('click', () => navOverlay.classList.remove('active'));

// Intersection Observer for Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Mouse Tracking for Bento Spotlight Effect AND Team Honeycomb
document.querySelectorAll('.bento-item, .team-section').forEach(item => {
    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
    });
});

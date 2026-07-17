// ==============================
// NAVIGATION
// ==============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section, #hero');

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link based on scroll
    updateActiveNav();
    
    // Back to top button
    updateBackToTop();
});

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==============================
// BACK TO TOP
// ==============================
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==============================
// HERO PARTICLES
// ==============================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

createParticles();

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounters() {
    const counters = document.querySelectorAll('.highlight-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ==============================
// SCROLL ANIMATIONS (Fade In)
// ==============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.research-card, .project-card, .team-card, .course-card, .media-card, .award-item, .talk-item, .detail-card, .pub-year-group'
    );
    
    elements.forEach(el => el.classList.add('fade-in'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

initScrollAnimations();

// ==============================
// PUBLICATION FILTERS
// ==============================
const filterBtns = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        pubItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-type') === filter) {
                item.style.display = 'flex';
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==============================
// PUBLICATION SEARCH
// ==============================
const pubSearch = document.getElementById('pubSearch');

pubSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    pubItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show/hide year groups based on visible items
    document.querySelectorAll('.pub-year-group').forEach(group => {
        const visibleItems = group.querySelectorAll('.pub-item[style*="display: flex"], .pub-item:not([style*="display"])');
        let hasVisible = false;
        visibleItems.forEach(item => {
            if (item.style.display !== 'none') hasVisible = true;
        });
        group.style.display = hasVisible ? 'block' : 'none';
    });
});

// ==============================
// CONTACT FORM
// ==============================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#38a169';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    }, 1500);
});

// ==============================
// NEWS TICKER - Duplicate for seamless loop
// ==============================
function setupTicker() {
    const track = document.querySelector('.ticker-track');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items; // Duplicate for seamless loop
    }
}

setupTicker();

// ==============================
// SMOOTH SCROLL for all anchor links
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPos = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ==============================
// INITIALIZE
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for scroll position
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    updateBackToTop();
    updateActiveNav();
});
// Den Ree - Algo DJ Landing Page

// Configuration
const SOUNDCLOUD_URL = 'https://soundcloud.com/den-ree/machine-music-by-den-ree-x-nikilia';

// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Listen button - redirects to Soundcloud
    const listenBtn = document.getElementById('listenBtn');
    if (listenBtn) {
        listenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(SOUNDCLOUD_URL, '_blank', 'noopener,noreferrer');
        });
    }
    
    // About button - smooth scroll to about section
    const aboutBtn = document.getElementById('aboutBtn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#about');
        });
    }
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add parallax effect to hero text
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroText.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Handle image loading errors - show placeholder
    document.querySelectorAll('.grid-item img').forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = '#1a1a1a';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#666';
            placeholder.style.fontSize = '0.9rem';
            placeholder.textContent = 'Image placeholder';
            this.parentElement.appendChild(placeholder);
        });
    });
    
    // Console message for developers
    console.log('%c🎵 Den Ree - Algo DJ', 'font-size: 20px; font-weight: bold;');
    console.log('%cMachine Music', 'font-size: 14px; color: #888;');
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'L' to open Listen link
    if (e.key === 'l' || e.key === 'L') {
        if (!e.target.matches('input, textarea')) {
            window.open(SOUNDCLOUD_URL, '_blank', 'noopener,noreferrer');
        }
    }
    
    // Press 'A' to scroll to About
    if (e.key === 'a' || e.key === 'A') {
        if (!e.target.matches('input, textarea')) {
            smoothScroll('#about');
        }
    }
    
    // Press 'H' to scroll to top
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// Add hover effect sound (optional - commented out by default)
/*
function playHoverSound() {
    const audio = new Audio('path/to/hover-sound.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
}

document.querySelectorAll('.nav-button, .social-links a').forEach(element => {
    element.addEventListener('mouseenter', playHoverSound);
});
*/


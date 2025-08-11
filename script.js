// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link, .hero-cta, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle WhatsApp links
            if (href === '#whatsapp') {
                e.preventDefault();
                const message = encodeURIComponent('Olá! Gostaria de um diagnóstico gratuito para meu controle.');
                const whatsappUrl = `https://wa.me/5511992174900?text=${message}`;
                window.open(whatsappUrl, '_blank');
                return;
            }
            
            // Handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .service-item, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .service-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Mobile menu logic can be added here
            console.log('Mobile view detected');
        }
    };
    
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add click tracking for analytics (placeholder)
    const trackClick = (element, action) => {
        // Google Analytics or other tracking can be added here
        console.log(`Tracked: ${action} on ${element}`);
    };
    
    // Track CTA clicks
    document.querySelectorAll('.hero-cta, .cta-button, .nav-cta').forEach(button => {
        button.addEventListener('click', function() {
            trackClick(this.textContent, 'CTA Click');
        });
    });
    
    // Add typing effect to hero title (optional)
    const addTypingEffect = () => {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;
        
        const originalText = titleElement.innerHTML;
        titleElement.innerHTML = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        const typeText = () => {
            if (index < originalText.length) {
                titleElement.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeText, typeSpeed);
            }
        };
        
        // Uncomment to enable typing effect
        // setTimeout(typeText, 1000);
    };
    
    // Initialize typing effect
    // addTypingEffect();
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for PWA functionality
        console.log('Service Worker support detected');
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});


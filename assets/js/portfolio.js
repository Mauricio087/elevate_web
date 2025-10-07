// Portfolio Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Portfolio Cards Animation on Scroll
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Initialize cards with hidden state
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        portfolioObserver.observe(card);
    });
    
    // Enhanced Hover Effects
    portfolioCards.forEach(card => {
        const image = card.querySelector('.portfolio-image img');
        const button = card.querySelector('.portfolio-btn');
        
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect to other cards
            portfolioCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.98)';
                }
            });
            
            // Add ripple effect to button
            if (button && !button.querySelector('.ripple')) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            // Reset other cards
            portfolioCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
        
        // Click effect for mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Only prevent default if clicking on the card itself, not on buttons
                if (!e.target.closest('.portfolio-btn')) {
                    e.preventDefault();
                    
                    // Add click animation
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Show button with animation
                    if (button) {
                        button.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            button.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
            }
        });
    });
    
    // Lazy Loading for Images
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const card = img.closest('.portfolio-card');
                
                // Add loading state
                card.classList.add('loading');
                
                // Simulate loading delay for better UX
                setTimeout(() => {
                    img.style.opacity = '1';
                    card.classList.remove('loading');
                }, 300);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    portfolioImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
    
    // Floating Animation for Cards (Desktop only)
    if (window.innerWidth > 768) {
        portfolioCards.forEach((card, index) => {
            const delay = index * 0.2;
            const duration = 3 + (index % 3) * 0.5;
            
            card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }
    
    // Keyboard Navigation Support
    portfolioCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = card.querySelector('.portfolio-btn');
                if (button) {
                    button.click();
                }
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = portfolioCards[index + 1];
                if (nextCard) {
                    nextCard.focus();
                }
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = portfolioCards[index - 1];
                if (prevCard) {
                    prevCard.focus();
                }
            }
        });
        
        // Focus styles
        card.addEventListener('focus', function() {
            card.style.outline = '2px solid var(--primary-color)';
            card.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            card.style.outline = 'none';
        });
    });
    
    // Parallax Effect on Scroll (Desktop only)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const portfolioSection = document.querySelector('.portfolio');
            
            if (portfolioSection) {
                const rect = portfolioSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    portfolioCards.forEach((card, index) => {
                        const speed = 0.5 + (index % 3) * 0.1;
                        const yPos = -(scrolled * speed);
                        card.style.transform = `translateY(${yPos}px)`;
                    });
                }
            }
        });
    }
    
    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize animations based on new screen size
            if (window.innerWidth <= 768) {
                portfolioCards.forEach(card => {
                    card.style.animation = 'none';
                    card.style.transform = 'translateY(0)';
                });
            }
        }, 250);
    });
    
    // Error handling for images
    portfolioImages.forEach(img => {
        img.addEventListener('error', function() {
            const card = this.closest('.portfolio-card');
            card.classList.remove('loading');
            
            // Add placeholder or fallback
            this.style.background = 'linear-gradient(135deg, #f8fafc, #e2e8f0)';
            this.alt = 'Imagen no disponible';
        });
    });
});

// CSS Animations (injected via JavaScript for better performance)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .portfolio-card:focus {
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 30px rgba(120, 119, 198, 0.2) !important;
    }
`;
document.head.appendChild(style);
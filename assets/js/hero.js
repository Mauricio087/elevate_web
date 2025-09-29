// Hero section functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const floatingElements = document.querySelectorAll('.element');
    
    // Enhanced floating animation with mouse interaction
    function initFloatingElements() {
        floatingElements.forEach((element, index) => {
            // Set initial random positions within bounds
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Add individual animation delays
            element.style.animationDelay = `${index * 2}s`;
        });
    }
    
    // Mouse parallax effect for hero section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Move floating elements based on mouse position
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = (x - 0.5) * speed * 20;
                const moveY = (y - 0.5) * speed * 20;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            // Subtle parallax for hero content
            if (heroContent) {
                const contentMoveX = (x - 0.5) * 10;
                const contentMoveY = (y - 0.5) * 10;
                heroContent.style.transform = `translate(${contentMoveX}px, ${contentMoveY}px)`;
            }
        });
        
        // Reset positions when mouse leaves
        hero.addEventListener('mouseleave', function() {
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
            
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
            }
        });
    }
    
    // Typing animation for hero title
    function initTypingAnimation() {
        const titleHighlight = document.querySelector('.title-highlight');
        if (!titleHighlight) return;
        
        const text = titleHighlight.textContent;
        titleHighlight.textContent = '';
        titleHighlight.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 100;
        
        function typeChar() {
            if (index < text.length) {
                titleHighlight.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Add blinking cursor effect
                titleHighlight.classList.add('typing-complete');
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeChar, 1000);
    }
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('hero-content')) {
                        setTimeout(() => {
                            initTypingAnimation();
                        }, 500);
                    }
                }
            });
        }, observerOptions);
        
        if (heroContent) observer.observe(heroContent);
        if (heroVisual) observer.observe(heroVisual);
    }
    
    // Button hover effects
    function initButtonEffects() {
        const ctaButtons = document.querySelectorAll('.hero-cta .btn');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Responsive adjustments
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable parallax on mobile for better performance
            const hero = document.querySelector('.hero');
            hero.removeEventListener('mousemove', initParallaxEffect);
        } else {
            initParallaxEffect();
        }
    }
    
    // Initialize all hero functionality
    initFloatingElements();
    initScrollAnimations();
    initButtonEffects();
    
    // Only init parallax on desktop
    if (window.innerWidth > 768) {
        initParallaxEffect();
    }
    
    // Scroll down arrow functionality
    function initScrollDownArrow() {
        const scrollDown = document.querySelector('.scroll-down');
        if (!scrollDown) return;
        
        scrollDown.addEventListener('click', function() {
            const servicesSection = document.querySelector('#servicios');
            if (servicesSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = servicesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll arrow when user scrolls down
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                scrollDown.style.opacity = '0';
                scrollDown.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollDown.style.opacity = '1';
                scrollDown.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
    
    // Initialize scroll down arrow
    initScrollDownArrow();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Add CSS for typing animation and ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .title-highlight.typing-complete::after {
            content: '|';
            animation: blink 1s infinite;
            color: var(--primary-purple);
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
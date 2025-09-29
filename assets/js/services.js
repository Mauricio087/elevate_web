// Services section functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Enhanced card animations
    function initServiceAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation delays
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        serviceCards.forEach(card => observer.observe(card));
    }
    
    // Interactive card effects
    function initCardInteractions() {
        serviceCards.forEach((card, index) => {
            // Mouse enter effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                
                // Add glow effect to icon
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
                }
                
                // Animate other cards slightly
                serviceCards.forEach((otherCard, otherIndex) => {
                    if (otherIndex !== index) {
                        otherCard.style.transform = 'translateY(-2px) scale(0.98)';
                        otherCard.style.opacity = '0.7';
                    }
                });
            });
            
            // Mouse leave effect
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                // Reset icon glow
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.boxShadow = '';
                }
                
                // Reset other cards
                serviceCards.forEach(otherCard => {
                    otherCard.style.transform = 'translateY(0) scale(1)';
                    otherCard.style.opacity = '1';
                });
            });
            
            // Click effect for mobile
            card.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 200);
            });
            
            // Keyboard navigation support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Icon animation on scroll
    function initIconAnimations() {
        const icons = document.querySelectorAll('.service-icon i');
        
        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'iconBounce 0.6s ease-out';
                }
            });
        }, { threshold: 0.5 });
        
        icons.forEach(icon => iconObserver.observe(icon));
    }
    
    // Enhanced floating particles effect
    function initParticleEffect() {
        const servicesSection = document.querySelector('.services');
        if (!servicesSection) return;
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
        `;
        
        servicesSection.appendChild(particleContainer);
        
        // Create more particles with different sizes and shapes
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random particle properties
            const size = Math.random() * 8 + 4; // 4px to 12px
            const isCircle = Math.random() > 0.3; // 70% circles, 30% squares
            const speed = 6 + Math.random() * 8; // 6s to 14s
            const opacity = 0.4 + Math.random() * 0.4; // 0.4 to 0.8
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 
                    ? 'linear-gradient(135deg, var(--primary-purple), var(--secondary-purple))'
                    : 'linear-gradient(135deg, var(--accent-coral), var(--accent-orange))'
                };
                border-radius: ${isCircle ? '50%' : '20%'};
                opacity: ${opacity};
                animation: floatParticle ${speed}s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * speed}s;
                box-shadow: 0 0 ${size * 2}px currentColor;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add some larger geometric shapes
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            const size = Math.random() * 20 + 15; // 15px to 35px
            const speed = 12 + Math.random() * 8; // 12s to 20s
            const shapeType = Math.random();
            
            let shapeStyle = '';
            if (shapeType < 0.33) {
                // Triangle
                shapeStyle = `
                    width: 0;
                    height: 0;
                    border-left: ${size/2}px solid transparent;
                    border-right: ${size/2}px solid transparent;
                    border-bottom: ${size}px solid;
                `;
            } else if (shapeType < 0.66) {
                // Diamond
                shapeStyle = `
                    width: ${size}px;
                    height: ${size}px;
                    transform: rotate(45deg);
                    border-radius: 10%;
                `;
            } else {
                // Hexagon-like
                shapeStyle = `
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 30%;
                `;
            }
            
            shape.style.cssText = `
                position: absolute;
                ${shapeStyle}
                background: ${Math.random() > 0.5 
                    ? 'rgba(139, 92, 246, 0.15)'
                    : 'rgba(255, 107, 107, 0.12)'
                };
                opacity: 0.6;
                animation: floatShape ${speed}s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * speed}s;
                filter: blur(1px);
            `;
            
            particleContainer.appendChild(shape);
        }
    }
    
    // Service card tilt effect (3D)
    function initTiltEffect() {
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                this.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    // Initialize all functionality
    initServiceAnimations();
    initCardInteractions();
    initIconAnimations();
    
    // Only add advanced effects on desktop
    if (window.innerWidth > 768) {
        initParticleEffect();
        initTiltEffect();
    }
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-card.clicked {
            transform: translateY(-5px) scale(0.98);
        }
        
        .service-icon {
            transition: all 0.3s ease;
        }
        
        @keyframes iconBounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            80% {
                transform: translateY(-5px);
            }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes floatShape {
            0% {
                transform: translateY(100vh) rotate(0deg) scale(0.8);
                opacity: 0;
            }
            15% {
                opacity: 0.6;
            }
            85% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-150px) rotate(180deg) scale(1.2);
                opacity: 0;
            }
        }
        
        .particle-container {
            z-index: 0;
        }
        
        .floating-shape {
            filter: blur(1px) !important;
        }
        
        @media (max-width: 768px) {
            .service-card:hover {
                transform: translateY(-5px) scale(1.01) !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset transforms on resize
        serviceCards.forEach(card => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
});
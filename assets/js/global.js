// Global JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink(activeId = null) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (activeId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === activeId) {
                    link.classList.add('active');
                }
            });
        } else {
            // Auto-detect based on scroll position
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }
    
    // Scroll event listener for active nav updates and header effects
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateHeaderOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Header scroll effect
    function updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .hero-content, .hero-visual');
    animateElements.forEach(el => observer.observe(el));
    
    // Utility function to add loading states
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Cargando...';
        button.disabled = true;
        
        return function removeLoadingState() {
            button.textContent = originalText;
            button.disabled = false;
        };
    }
    
    // Form handling utility (for future contact forms)
    function handleFormSubmission(form, callback) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const removeLoading = addLoadingState(submitButton);
            
            // Simulate form processing
            setTimeout(() => {
                removeLoading();
                if (callback) callback();
            }, 2000);
        });
    }
    
    // Expose utilities globally
    window.ElevateWeb = {
        addLoadingState,
        handleFormSubmission,
        updateActiveNavLink
    };
    
    // Initialize page
    updateActiveNavLink();
    updateHeaderOnScroll();
});
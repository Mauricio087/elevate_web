// Simple and subtle logo effects
document.addEventListener('DOMContentLoaded', function() {
    const navLogo = document.querySelector('.nav-logo');
    const footerBrand = document.querySelector('.footer-brand');
    
    // Very subtle hover enhancement
    function initSubtleLogoEffects(logoContainer, isFooter = false) {
        if (!logoContainer) return;
        
        const logo = logoContainer.querySelector('img');
        if (!logo) return;
        
        logoContainer.addEventListener('mouseenter', function() {
            logo.style.transition = 'all 0.3s ease';
            logo.style.transform = 'scale(1.02)';
            logo.style.filter = isFooter 
                ? 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))'
                : 'drop-shadow(0 0 18px rgba(139, 92, 246, 0.5))';
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            logo.style.transform = 'scale(1)';
            logo.style.filter = isFooter 
                ? 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))'
                : 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))';
        });
    }
    
    // Initialize subtle effects
    initSubtleLogoEffects(navLogo, false);
    initSubtleLogoEffects(footerBrand, true);
    
    // Add minimal CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Smooth transitions for logos */
        .nav-logo img, .footer-logo {
            transition: all 0.3s ease;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .nav-logo img, .footer-logo {
                transition: all 0.2s ease;
            }
        }
    `;
    document.head.appendChild(style);
});
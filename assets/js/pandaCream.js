// PandaCream.js - Funcionalidades específicas para la página PandaCream
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');

    function adjustMainOffset() {
        if (!header || !main) return;
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = headerHeight + 'px';
    }

    adjustMainOffset();
    window.addEventListener('resize', adjustMainOffset);
});
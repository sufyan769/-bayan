(function() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'classic' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon();
        // Optional: refresh if scripts rely on layout significantly
    };

    function updateToggleIcon() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'classic') {
            btn.innerHTML = '<i data-lucide="layout"></i> <span style="margin-right:8px">النمط الحديث</span>';
        } else {
            btn.innerHTML = '<i data-lucide="scroll"></i> <span style="margin-right:8px">النمط التراثي</span>';
        }
        if (window.lucide) window.lucide.createIcons();
    }

    // Run on load
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.getElementById('themeToggle')) {
            const btn = document.createElement('button');
            btn.id = 'themeToggle';
            btn.className = 'nav-link theme-toggle-btn';
            btn.style.background = 'var(--card-bg)';
            btn.style.border = '1px solid var(--border-color)';
            btn.style.cursor = 'pointer';
            btn.style.color = 'var(--primary-color)';
            btn.style.padding = '8px 16px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.borderRadius = '20px';
            btn.style.marginRight = '12px';
            btn.title = 'تبديل النمط الزخرفي';
            btn.onclick = window.toggleTheme;
            
            // Insert at the beginning of nav-links
            navLinks.insertBefore(btn, navLinks.firstChild);
            updateToggleIcon();
        }
    });

    // Handle flicker-free initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

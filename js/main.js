// Add this function to save language before navigating
function saveLanguage() {
    const dropdownToggle = document.querySelector('#languageDropdown');
    const currentLang = dropdownToggle.textContent.includes('English') ? 'en' : 'zh';
    localStorage.setItem('preferredLanguage', currentLang);
}

document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    loadLanguage(savedLang);
});

// Modify language switch handler in i18n.js to save preference
function loadLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update selected language in dropdown
    const dropdownToggle = document.querySelector('#languageDropdown');
    if (dropdownToggle) {
        dropdownToggle.textContent = lang === 'en' ? 'English' : '中文';
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update privacy policy tabs if on that page
    if (window.location.pathname.includes('Privacy_Policy')) {
        const tabToShow = lang === 'en' ? '#english' : '#chinese';
        const tabButtonToActivate = lang === 'en' ? '#english-tab' : '#chinese-tab';
        
        document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
        
        document.querySelector(tabButtonToActivate).classList.add('active');
        document.querySelector(tabToShow).classList.add('show', 'active');
    }
}

// Add this to handle language dropdown clicks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            loadLanguage(lang);
            // Update active class in dropdown
            document.querySelectorAll('[data-lang]').forEach(item => {
                item.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
});

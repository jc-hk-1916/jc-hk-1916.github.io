const translations = {
    en: {
        title: "Trivix Tech",
        subtitle: "Wuhan Trivix Technology Co., Ltd",
        tagline: "Specializing in tool software development, application software development and technical services",
        contactBtn: "Contact Us",
        learnMoreBtn: "Learn More",
        aboutTitle: "About Us",
        aboutContent: "Wuhan Trivix Technology Co., Ltd. is a high-tech enterprise focusing on software development and technical services. We are committed to providing professional software development solutions for customers, including tool software development, application software development and comprehensive technical service support.",
        navHome: "Home",
        navAbout: "About",
        navServices: "Services",
        navContact: "Contact",
        servicesTitle: "Our Services",
        servicesToolDev: "Tool Software Development",
        servicesToolDesc: "Provide professional tool software development services to help customers improve work efficiency.",
        servicesAppDev: "Application Software Development",
        servicesAppDesc: "Customized application software development to meet specific customer needs.",
        servicesTechSupport: "Technical Services",
        servicesTechDesc: "Provide professional technical support and services to ensure system stability.",
        companyName: "Company Name:",
        companyValue: "Wuhan Trivix Technology Co., Ltd",
        footerCopyright: "© 2025 Wuhan Trivix Technology Co., Ltd. All rights reserved.",
        errorTitle: "Page Not Found",
        errorMessage: "Sorry, the page you requested does not exist or has been removed.",
        backToHome: "Back to Home",
        privacyPolicy: "NaviTerm Privacy Policy"
    },
    zh: {
        title: "Trivix Tech",
        subtitle: "武汉特维克斯科技有限公司",
        tagline: "专注于工具软件开发、应用软件开发和技术服务",
        contactBtn: "联系我们",
        learnMoreBtn: "了解更多",
        aboutTitle: "关于我们",
        aboutContent: "武汉特维克斯科技有限公司是一家专注于软件开发和技术服务的高新技术企业。我们致力于为客户提供专业的软件开发解决方案，包括工具软件开发、应用软件开发以及全方位的技术服务支持。",
        navHome: "首页",
        navAbout: "关于我们",
        navServices: "业务范围",
        navContact: "联系我们",
        servicesTitle: "业务范围",
        servicesToolDev: "工具软件开发",
        servicesToolDesc: "提供专业的工具软件开发服务，帮助客户提高工作效率。",
        servicesAppDev: "应用软件开发",
        servicesAppDesc: "定制化的应用软件开发，满足客户的特定需求。",
        servicesTechSupport: "技术服务",
        servicesTechDesc: "提供专业的技术支持和服务，确保系统的稳定运行。",
        companyName: "公司名称：",
        companyValue: "武汉特维克斯科技有限公司",
        footerCopyright: "© 2025 武汉特维克斯科技有限公司. All rights reserved.",
        errorTitle: "页面未找到",
        errorMessage: "抱歉，您访问的页面不存在或已被移除。",
        backToHome: "返回首页",
        privacyPolicy: "NaviTerm隐私政策"
    }
};

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
}

// Set default language to saved preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    loadLanguage(savedLang);
    
    // Handle language switch
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

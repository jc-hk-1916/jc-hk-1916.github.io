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
        privacyPolicy: "NaviTerm Privacy Policy",
        pwaInstallTitle: "Install App",
        pwaInstallDesc: "Add to home screen for a better experience",
        pwaInstallBtn: "Install",
        pwaDismissBtn: "Later",
        downloadNaviTerm: "Download NaviTerm",
        productTitle: "Our Product",
        navitermTitle: "NaviTerm - Professional SSH & SFTP Client",
        navitermSubtitle: "Professional SSH & SFTP Client",
        navitermDesc: "A powerful SSH and SFTP client for Apple devices, providing secure and streamlined remote access solutions for developers, system administrators, and network engineers.",
        keyFeatures: "Key Features:",
        feature1: "SSH Terminal Access - Securely connect to remote servers",
        feature2: "SFTP File Management - Browse and manage remote file systems",
        feature3: "Port Forwarding - Set up proxies and access internal environments via SSH tunnels",
        feature4: "Key Management - Support for RSA, ED25519 and other key formats",
        feature5: "Multi-Device Experience - Optimized for Mac, iPhone, and iPad",
        feature6: "Session Management - Save server configurations for quick reconnection",
        availableOn: "Available on:",
        freeVersion: "Free version supports up to 5 hosts with full feature access",
        downloadOnAppStore: "Download on the App Store"
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
        privacyPolicy: "NaviTerm隐私政策",
        pwaInstallTitle: "安装应用",
        pwaInstallDesc: "添加到主屏幕，获得更好的体验",
        pwaInstallBtn: "安装",
        pwaDismissBtn: "稍后",
        downloadNaviTerm: "下载NaviTerm",
        productTitle: "我们的产品",
        navitermTitle: "NaviTerm - 专业SSH和SFTP客户端",
        navitermSubtitle: "专业SSH和SFTP客户端",
        navitermDesc: "适用于所有Apple设备的强大SSH和SFTP客户端，为开发者、系统管理员和网络工程师提供安全高效的远程访问解决方案。",
        keyFeatures: "核心功能：",
        feature1: "SSH终端访问 - 安全连接远程服务器",
        feature2: "SFTP文件管理 - 浏览和管理远程文件系统",
        feature3: "端口转发 - 通过SSH隧道设置代理和访问内部环境",
        feature4: "密钥管理 - 支持RSA、ED25519等多种密钥格式",
        feature5: "多设备体验 - 完美适配Mac、iPhone和iPad",
        feature6: "会话管理 - 保存常用服务器配置，快速重连",
        availableOn: "支持平台：",
        freeVersion: "免费版本支持管理最多5个主机，享受完整功能",
        downloadOnAppStore: "在App Store下载"
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

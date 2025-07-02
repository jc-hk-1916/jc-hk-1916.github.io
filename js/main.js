// 移动端优化工具类
class MobileOptimizer {
    constructor() {
        this.isMobile = window.innerWidth <= 767;
        this.isTouch = 'ontouchstart' in window;
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupTouchOptimizations();
        this.setupPerformanceOptimizations();
        this.setupViewportOptimizations();
    }

    // 平滑滚动优化
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // 移动端自动关闭导航菜单
                    if (this.isMobile) {
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        if (navbarCollapse.classList.contains('show')) {
                            navbarToggler.click();
                        }
                    }
                }
            });
        });
    }

    // 移动端导航优化
    setupMobileNavigation() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // 点击外部区域关闭菜单
            document.addEventListener('click', (e) => {
                if (this.isMobile && navbarCollapse.classList.contains('show')) {
                    if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                        navbarToggler.click();
                    }
                }
            });

            // 滚动时关闭菜单
            let scrollTimer;
            window.addEventListener('scroll', () => {
                if (this.isMobile && navbarCollapse.classList.contains('show')) {
                    clearTimeout(scrollTimer);
                    scrollTimer = setTimeout(() => {
                        navbarToggler.click();
                    }, 150);
                }
            });
        }
    }

    // 触摸优化
    setupTouchOptimizations() {
        if (this.isTouch) {
            // 添加触摸反馈
            document.querySelectorAll('.btn, .nav-link, .feature-card').forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.style.transform = 'scale(0.98)';
                }, { passive: true });

                element.addEventListener('touchend', () => {
                    setTimeout(() => {
                        element.style.transform = '';
                    }, 150);
                }, { passive: true });
            });

            // 防止双击缩放
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }
    }

    // 性能优化
    setupPerformanceOptimizations() {
        // 懒加载图片（如果有的话）
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // 预加载关键资源
        this.preloadCriticalResources();
    }

    // 视口优化
    setupViewportOptimizations() {
        // 处理iOS Safari的视口高度问题
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    // 预加载关键资源
    preloadCriticalResources() {
        const criticalResources = [
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css'
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// 语言管理
function saveLanguage() {
    const dropdownToggle = document.querySelector('#languageDropdown');
    const currentLang = dropdownToggle.textContent.includes('English') ? 'en' : 'zh';
    localStorage.setItem('preferredLanguage', currentLang);
}

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

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端优化
    new MobileOptimizer();

    // 检查保存的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    loadLanguage(savedLang);

    // 语言切换处理
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

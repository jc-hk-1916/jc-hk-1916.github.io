document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const langSwitch = document.getElementById('langSwitch');
    const langSwitchMobile = document.getElementById('langSwitchMobile');

    // ---------- Sticky nav background ----------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ---------- Mobile menu ----------
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ---------- Language switcher ----------
    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            toggleLanguage();
        });
    }

    if (langSwitchMobile) {
        langSwitchMobile.addEventListener('click', () => {
            toggleLanguage();
            if (navToggle && mobileMenu) {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ---------- Smooth-scroll anchor ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- Mobile viewport height fix ----------
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // ---------- Bottom nav active state ----------
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateBottomNav() {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === '#' && scrollY < 300) {
                item.classList.add('active');
            } else if (href === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateBottomNav);
    updateBottomNav();

    // ---------- Scroll-reveal animation (IntersectionObserver) ----------
    if ('IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything for very old browsers
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    }

    // ---------- FAQ accordion: only one open at a time ----------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ---------- Animated count-up for hero stats (subtle) ----------
    const statNums = document.querySelectorAll('.stat-num');
    if (statNums.length && 'IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    // Only animate plain integers like "25"
                    const match = text.match(/^(\d+)(\D*)$/);
                    if (match) {
                        const target = parseInt(match[1], 10);
                        const suffix = match[2];
                        let current = 0;
                        const step = Math.max(1, Math.ceil(target / 30));
                        const tick = () => {
                            current = Math.min(target, current + step);
                            el.textContent = current + suffix;
                            if (current < target) requestAnimationFrame(tick);
                        };
                        tick();
                    }
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNums.forEach(el => statObserver.observe(el));
    }
});

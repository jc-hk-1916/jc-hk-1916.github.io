// Service Worker for Trivix Tech PWA
const CACHE_NAME = 'trivix-tech-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/i18n.js',
    '/manifest.json',
    '/NaviTerm_Privacy_Policy.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css'
];

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
    console.log('Service Worker: 安装中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: 缓存文件');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: 安装完成');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: 安装失败', error);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('Service Worker: 激活中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: 删除旧缓存', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: 激活完成');
            return self.clients.claim();
        })
    );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
    // 只处理GET请求
    if (event.request.method !== 'GET') {
        return;
    }

    // 跳过chrome-extension和其他非http请求
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果缓存中有，直接返回
                if (response) {
                    console.log('Service Worker: 从缓存返回', event.request.url);
                    return response;
                }

                // 否则从网络获取
                console.log('Service Worker: 从网络获取', event.request.url);
                return fetch(event.request).then((response) => {
                    // 检查响应是否有效
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // 克隆响应，因为响应流只能使用一次
                    const responseToCache = response.clone();

                    // 将新资源添加到缓存
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch((error) => {
                    console.error('Service Worker: 网络请求失败', error);
                    
                    // 如果是导航请求且网络失败，返回离线页面
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                    
                    throw error;
                });
            })
    );
});

// 处理推送通知（可选）
self.addEventListener('push', (event) => {
    console.log('Service Worker: 收到推送消息');
    
    const options = {
        body: event.data ? event.data.text() : '您有新消息',
        icon: '/manifest-icon-192.png',
        badge: '/manifest-icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '查看详情',
                icon: '/manifest-icon-192.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/manifest-icon-192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Trivix Tech', options)
    );
});

// 处理通知点击
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: 通知被点击');
    event.notification.close();

    if (event.action === 'explore') {
        // 打开应用
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// 处理后台同步（可选）
self.addEventListener('sync', (event) => {
    console.log('Service Worker: 后台同步', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // 执行后台同步任务
            console.log('执行后台同步任务')
        );
    }
});

// 错误处理
self.addEventListener('error', (event) => {
    console.error('Service Worker: 发生错误', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: 未处理的Promise拒绝', event.reason);
});

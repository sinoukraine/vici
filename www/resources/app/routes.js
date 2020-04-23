var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=2.4',
        name: 'home',
    },
    {
        path: '/panel-left/',
        panel: {
            componentUrl: './resources/pages/panel.left.html?v=1.9',
        },
        name: 'panel.left'
    },
    {
        path: '/forgot-password/',
        componentUrl: './resources/pages/forgot-password.html?v=1.4',
        name: 'forgot-password',
    },
    {
        path: '/profile-settings/',
        componentUrl: './resources/pages/profile.settings.html?v=2.4',
        name: 'profile.settings',
    },
    {
        path: '/timing-settings/',
        componentUrl: './resources/pages/timing.settings.html?v=2.4',
        name: 'timing.settings',
    },
    {
        path: '/share/',
        componentUrl: './resources/pages/share.html?v=2.4',
        name: 'share',
    },
    {
        path: '/inform-about-test/',
        componentUrl: './resources/pages/inform.about.test.html?v=2.4',
        name: 'inform.about.test',
    },
    {
        path: '/inform-about-recovery/',
        componentUrl: './resources/pages/inform.about.recovery.html?v=2.4',
        name: 'inform.about.recovery',
    },
    {
        path: '/qr-code/',
        componentUrl: './resources/pages/qr.code.html?v=2.6',
        name: 'qr.code',
    },

    {
        path: '/registration/',
        componentUrl: './resources/pages/registration.html?v=2.4',
        name: 'registration',
    },
    {
        path: '/notifications/',
        componentUrl: './resources/pages/notifications.html?v=2.4',
        name: 'notifications',
    },
    {
        path: '/notification/',
        componentUrl: './resources/pages/notification.html?v=2.4',
        name: 'notification',
    },

    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];

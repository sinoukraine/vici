var routes = [
    {
        path: '/',
        componentUrl: './resources/pages/home.html?v=2.1',
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
        componentUrl: './resources/pages/profile.settings.html?v=2.1',
        name: 'profile.settings',
    },
    {
        path: '/timing-settings/',
        componentUrl: './resources/pages/timing.settings.html?v=2.1',
        name: 'timing.settings',
    },
    {
        path: '/share/',
        componentUrl: './resources/pages/share.html?v=2.1',
        name: 'share',
    },

    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];

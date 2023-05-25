const path = require('path');
const withPWAInit = require('next-pwa');

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit({
    dest: 'public',
    // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
    buildExcludes: ['app-build-manifest.json'],
    register: true,
    skipWaiting: true,
});

const generateAppDirEntry = (entry) => {
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, 'register.js');

    return entry().then((entries) => {
        // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
        if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
            if (Array.isArray(entries['main-app'])) {
                entries['main-app'].unshift(registerJs);
            } else if (typeof entries['main-app'] === 'string') {
                // eslint-disable-next-line no-param-reassign
                entries['main-app'] = [registerJs, entries['main-app']];
            }
        }
        return entries;
    });
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['cdn.sanity.io', 'lh3.googleusercontent.com'],
    },
    webpack: (config) => {
        // Apply webpack changes only if environment is not in development mode
        if (process.env.NODE_ENV !== 'development') {
            const entry = generateAppDirEntry(config.entry);
            // eslint-disable-next-line no-param-reassign
            config.entry = () => entry;
        }

        return config;
    },
};

// Only enable next-pwa if NODE_ENV is not in development mode
module.exports =
    process.env.NODE_ENV !== 'development' ? withPWA(nextConfig) : nextConfig;

const path = require('path')

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/resources',
                destination: '/checklist',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['images.prismic.io'],
    },
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname)
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        })
        return config
    },
}

module.exports = nextConfig

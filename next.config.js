const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs/config')

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
            issuer: /\.(js|ts)x?$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
}

module.exports = withSentryConfig(nextConfig, {
    silent: true,
    // Sourcemap upload needs a Sentry auth token + org/project pointed at
    // the self-hosted GlitchTip instance's own upload API; not wired up
    // yet, so disable it rather than let the build warn/fail on missing
    // credentials. Error capture itself doesn't depend on this.
    sourcemaps: { disable: true },
})

export function localeDisplayName(locale) {
    if (locale === 'en') {
        return 'English (EN)'
    } else if (locale === 'es') {
        return 'Español (ES)'
    } else {
        return locale, console.error('No display name set for', locale)
    }
}

export function localeWithRegion(locale) {
    if (locale === 'en') {
        return 'en-us'
    } else if (locale === 'es') {
        return 'es-mx'
    } else {
        return locale, console.error('No region set for', locale)
    }
}

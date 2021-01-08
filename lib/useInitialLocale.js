import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'

export default function useInitialLocale() {
    const router = useRouter()
    const { locale, defaultLocale } = router

    const [initialLocale, setInitialLocale] = useState(() => {
        const cookies = parseCookies()
        return cookies.NEXT_LOCALE || defaultLocale
    })

    useEffect(() => {
        setCookie(null, 'NEXT_LOCALE', locale)
    }, [initialLocale])

    return { initialLocale, setInitialLocale }
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookies, setCookie } from 'cookies-next'

export default function useInitialLocale() {
    const router = useRouter()
    const { locale, defaultLocale } = router

    const [initialLocale, setInitialLocale] = useState(() => {
        const cookies = getCookies()
        return cookies.NEXT_LOCALE || defaultLocale
    })

    useEffect(() => {
        setCookie('NEXT_LOCALE', locale)
    }, [initialLocale])

    return { initialLocale, setInitialLocale }
}

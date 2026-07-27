import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/styles/globals.css'
import { getCookies, setCookie } from 'cookies-next'

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const cookies = getCookies({ req: ctx.req, res: ctx.res })
    const isSpanish = ctx.pathname.startsWith('/es')

    if (cookies.NEXT_LOCALE) {
        if (cookies.NEXT_LOCALE === 'en' && isSpanish) {
            setCookie('NEXT_LOCALE', 'es', { req: ctx.req, res: ctx.res })
        }

        if (cookies.NEXT_LOCALE === 'es' && !isSpanish) {
            ctx.res.writeHead(302, {
                Location: `/es${ctx.pathname}`,
            })
            ctx.res.end()
        }
    } else {
        setCookie('NEXT_LOCALE', isSpanish ? 'es' : 'en', { req: ctx.req, res: ctx.res })
    }

    const pageProps = Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : {}

    return {
        pageProps,
    }
}

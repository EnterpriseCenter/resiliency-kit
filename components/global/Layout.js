import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

export default function Layout({ children, layoutContent }) {
    return (
        <div className="h-full relative">
            <div className="blob print:hidden"></div>
            <div className="flex flex-col min-h-screen h-full justify-between">
                <Header headerContent={layoutContent} />
                <main className="flex-grow">{children}</main>
                <Footer footerContent={layoutContent} />
            </div>
        </div>
    )
}

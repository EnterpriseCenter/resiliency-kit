import { linkResolver } from '@/lib/linkResolver'
import { RichText } from 'prismic-reactjs'

export default function Footer({ footerContent }) {
    return (
        <footer>
            <div className="container py-10 print:hidden footer_content">
                <RichText
                    render={footerContent.footer_content}
                    linkResolver={linkResolver}
                />
            </div>
        </footer>
    )
}

import { linkResolver } from '@/lib/linkResolver'
import { PrismicRichText } from '@prismicio/react'

export default function Footer({ footerContent }) {
    return (
        <footer>
            <div className="container py-10 print:hidden footer_content">
                <PrismicRichText
                    field={footerContent.footer_content}
                    linkResolver={linkResolver}
                />
            </div>
        </footer>
    )
}

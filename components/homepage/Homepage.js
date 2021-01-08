import useStickyState from '@/lib/useStickyState'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'
import HomepagePromise from '@/components/homepage/HomepagePromise'
import HomepageSlider from '@/components/homepage/HomepageSlider'

export default function HomepageContent({ doc, people, globals }) {
    const [answersData, setAnswersData] = useStickyState([], 'formData')

    return (
        <div className="container">
            <div className="flex flex-col md:flex-row sm:items-center">
                <div className="w-full md:w-1/2 pt-4 sm:pt-10 md:pt-0 pb-4 sm:pb-8 md:pb-0 sm:text-center sm:max-w-lg md:max-w-none md:text-left">
                    <h1 className="h1 mb-4">{RichText.asText(doc.heading)}</h1>
                    <Link href="/checklist">
                        <a className="btn btn-blue">
                            {!answersData || answersData.length === 0
                                ? globals.button_cta
                                : globals.button_cta_returning_users}
                        </a>
                    </Link>

                    <div className="mt-12 max-w-sm sm:mx-auto md:mx-0">
                        <HomepagePromise
                            content={doc.time_promise}
                            icon="time"
                        />
                        <HomepagePromise
                            content={doc.data_security_promise}
                            icon="security"
                        />
                    </div>
                </div>

                <div className="w-full py-4 md:w-1/2 md:pl-12 max-w-sm lg:max-w-none">
                    <HomepageSlider people={people} />
                </div>
            </div>
        </div>
    )
}

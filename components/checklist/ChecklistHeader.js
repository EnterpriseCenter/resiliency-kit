import { Fragment } from 'react'
import InfoIcon from '@/public/info.svg'

export default function ChecklistFooter({ headline, intro }) {
    return (
        <Fragment>
            <h1 className="h2 print:text-lg print:text-black print:font-semibold">
                {headline}
            </h1>
            <div className="bg-blue-50 py-1 px-3 md:py-3 md:px-6 rounded inline-flex items-center mt-4 print:pl-0 print:mx-0">
                <InfoIcon className="hidden md:block mr-3" />
                <div className="text-blue-500 leading-snug print:hidden text-base">
                    {intro}
                </div>
            </div>
        </Fragment>
    )
}

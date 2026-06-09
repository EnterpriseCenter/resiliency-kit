import { PrismicRichText } from '@prismicio/react'
import useStickyState from '@/lib/useStickyState'
import React, { useEffect, Fragment } from 'react'
import HelpIcon from '@/public/help.svg'
import CollapseIcon from '@/public/collapse.svg'

export default function HelpBar({ content, filteredCheckListItems }) {
    const [helpBarIsOpen, setHelpBarIsOpen] = useStickyState(true, 'helpBar')
    const [firstStepComplete, setFirstStepComplete] = useStickyState(
        false,
        'firstStepComplete'
    )

    useEffect(() => {
        setFirstStepComplete(false)
    }, [helpBarIsOpen])

    return (
        <Fragment>
            {helpBarIsOpen ? (
                <div className="bg-blue-600 text-white w-full py-4 md:py-8 lg:py-10 fixed bottom-0 left-0 right-0 z-50 print:hidden">
                    <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
                        {!firstStepComplete ? (
                            <Fragment>
                                <div className="max-w-4xl">
                                    <h3 className="leading-tight mb-4">
                                        {content.help_content_step_1_headline.replace(
                                            '%count%',
                                            filteredCheckListItems.length
                                        )}
                                    </h3>
                                    <PrismicRichText
                                        field={content.help_content_step_1}
                                    />
                                </div>
                                <button
                                    className="btn btn-blue mt-4 md:mt-0"
                                    onClick={() => setFirstStepComplete(true)}
                                >
                                    {content.help_content_step_1_button_text}
                                </button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className="max-w-4xl help-text-step-2">
                                    <PrismicRichText
                                        field={content.help_content_step_2}
                                    />
                                </div>
                                <button
                                    className="btn btn-blue mt-4 md:mt-0"
                                    onClick={() => setHelpBarIsOpen(false)}
                                >
                                    {content.help_content_step_2_button_text}
                                </button>
                            </Fragment>
                        )}
                    </div>
                    <button
                        className="absolute right-0 top-0 p-4 bg-blue-600 hover:bg-blue-500"
                        onClick={() => setHelpBarIsOpen(false)}
                    >
                        <span className="sr-only">
                            {content.help_drawer_collapse_text}
                        </span>
                        <CollapseIcon />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setHelpBarIsOpen(true)}
                    className="btn bg-blue-600 hover:bg-blue-500 text-white shadow-lg fixed bottom-0 right-0 mr-4 mb-4 z-50 flex align-center px-6 print:hidden"
                >
                    <HelpIcon className="mr-3" />
                    {content.help_button_text}
                </button>
            )}
        </Fragment>
    )
}

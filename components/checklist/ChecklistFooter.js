import { PrismicRichText } from '@prismicio/react'

export default function ChecklistFooter({ doc, checklistActionsContent }) {
    return (
        <div className="rich-text mt-4 lg:mt-8 bg-blue-100 border border-blue-400 shadow-lg rounded-lg p-4 md:p-8 lg:p-12 xl:p-18 text-gray-900 print:hidden">
            <PrismicRichText field={doc.end_of_checklist_content}></PrismicRichText>
            {doc.enable_print_button_in_footer ? (
                <button
                    className="btn btn-blue mt-4"
                    onClick={() => window.print()}
                >
                    {checklistActionsContent?.action_item__print}
                </button>
            ) : null}
        </div>
    )
}

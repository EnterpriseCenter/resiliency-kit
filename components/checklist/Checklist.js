import { RichText } from 'prismic-reactjs'
import React, { Fragment, useEffect } from 'react'
import useStickyState from '@/lib/useStickyState'
import { filterCheckListItems, sortChecklistItems } from '@/lib/helpers'
import HelpBar from './HelpBar'
import ActionButton from './ActionButton'
import ChecklistHeader from './ChecklistHeader'
import CategoryHeader from './CategoryHeader'
import ChecklistItem from './ChecklistItem'
import ChecklistFooter from './ChecklistFooter'
import { Transition } from '@headlessui/react'

export default function Checklist({
    doc,
    questions,
    answers,
    checklistItems,
    checklistHelpContent,
    checklistActionsContent,
}) {
    const [completedItems, setCompletedItems] = useStickyState(
        [],
        'completedCheckItems'
    )
    const categories = Object.keys(
        checklistItems.reduce(
            (results, item) => ({
                ...results,
                [item.category]: true,
            }),
            {}
        )
    )

    const filteredCheckListItems = answers['skipped']
        ? checklistItems
        : filterCheckListItems(checklistItems, questions, answers)

    // Sort checklist items by category
    const sortedChecklistItems = sortChecklistItems(filteredCheckListItems)

    return (
        <Fragment>
            <HelpBar
                filteredCheckListItems={filteredCheckListItems}
                content={checklistHelpContent}
            />

            <Transition
                as="div"
                className="max-w-6xl mx-auto"
                show={true}
                enter="transition-opacity duration-300 delay-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
            >
                <div className="shadow-lg bg-white overflow-hidden relative print:shadow-none w-full print:overflow-visible">
                    <div className="p-6 pr-12 md:p-8 border-t-8 border-blue-500 lg:text-center lg:p-12 lg:pr-24 print:px-0 print:border-black print:border-t-0 print:pt-0">
                        <ChecklistHeader
                            headline={doc.page_headline}
                            intro={doc.intro}
                        />

                        <ActionButton
                            setCompletedItems={setCompletedItems}
                            checklistActionsContent={checklistActionsContent}
                        />
                    </div>

                    {Object.keys(sortedChecklistItems).length
                        ? categories.map(category => (
                              <Fragment key={category}>
                                  {sortedChecklistItems[category] && (
                                      <>
                                          <CategoryHeader
                                              category={category}
                                              sortedChecklistItems={
                                                  sortedChecklistItems
                                              }
                                              completedItems={completedItems}
                                          />
                                          <ol>
                                              {sortedChecklistItems[
                                                  category
                                              ].map((item, index) =>
                                                  item._meta ? (
                                                      <ChecklistItem
                                                          key={index}
                                                          index={index}
                                                          item={item}
                                                          completedItems={
                                                              completedItems
                                                          }
                                                          setCompletedItems={
                                                              setCompletedItems
                                                          }
                                                      />
                                                  ) : null
                                              )}
                                          </ol>
                                      </>
                                  )}
                              </Fragment>
                          ))
                        : null}
                </div>
                <ChecklistFooter
                    doc={doc}
                    checklistActionsContent={checklistActionsContent}
                />
            </Transition>
        </Fragment>
    )
}

import { useState, useRef, useEffect, useCallback } from 'react'
import Router from 'next/router'
import MicroModal from 'react-micro-modal'
import Caret from '@/public/caret.svg'

export default function ActionButton({
    setCompletedItems,
    checklistActionsContent,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isUncheckAllModalOpen, setIsUncheckAllModalOpen] = useState(false)
    const [isChangeAnswersModalOpen, setIsChangeAnswersModalOpen] = useState(
        false
    )
    const [isRestartFormModalOpen, setIsRestartFormModalOpen] = useState(false)
    const firstLink = useRef(null)
    const actionMenu = useRef(null)
    const actionButton = useRef(null)

    // Trap focus
    useEffect(() => {
        if (isOpen) {
            let focusableEls = actionMenu.current.querySelectorAll(
                'a[href]:not([disabled]), button:not([disabled])'
            )
            let firstFocusableEl = focusableEls[0]
            let lastFocusableEl = focusableEls[focusableEls.length - 1]
            let KEYCODE_TAB = 9

            actionMenu.current.addEventListener('keydown', function (e) {
                let isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

                if (!isTabPressed) {
                    return
                }

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus()
                        e.preventDefault()
                    }
                } else {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus()
                        e.preventDefault()
                    }
                }
            })
        } else {
            // null
        }
    }, [isOpen, actionMenu])

    // Close the menu if esc key is pressed
    const closeMenu = useCallback(
        e => {
            if (
                e.keyCode === 27 &&
                !isUncheckAllModalOpen &&
                !isChangeAnswersModalOpen &&
                !isRestartFormModalOpen
            ) {
                setIsOpen(false)
                actionButton.current.focus()
            }
        },
        [
            actionButton,
            isUncheckAllModalOpen,
            isChangeAnswersModalOpen,
            isRestartFormModalOpen,
        ]
    )

    useEffect(() => {
        document.addEventListener('keydown', closeMenu, false)

        return () => {
            document.removeEventListener('keydown', closeMenu, false)
        }
    }, [
        isUncheckAllModalOpen,
        isChangeAnswersModalOpen,
        isRestartFormModalOpen,
    ])

    function clearAndReload() {
        window.localStorage.removeItem('formData')
        window.localStorage.removeItem('completedCheckItems')
        window.localStorage.removeItem('interstitial')
        Router.reload(window.location.pathname)
    }

    function restartForm() {
        window.localStorage.removeItem('formData')
        window.localStorage.removeItem('interstitial')
        Router.reload(window.location.pathname)
    }

    function handleClickOutside(event) {
        if (
            actionMenu &&
            !actionMenu.current.contains(event.target) &&
            !isUncheckAllModalOpen &&
            !isChangeAnswersModalOpen &&
            !isRestartFormModalOpen
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [
        isUncheckAllModalOpen,
        isChangeAnswersModalOpen,
        isRestartFormModalOpen,
    ])

    return (
        <div
            ref={actionMenu}
            className="relative mt-4 md:absolute md:top-0 md:right-0 md:mt-8 md:mr-6 z-40 print:hidden"
        >
            <button
                ref={actionButton}
                className="rounded px-3 py-2 bg-white border border-gray-400  focus:bg-gray-300 hover:bg-gray-200 flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="mr-3 font-semibold">
                    {checklistActionsContent?.actions_menu_button_text}
                </span>
                <Caret className="w-3" />
            </button>

            {isOpen ? (
                <div className="bg-white rounded border border-gray-400 shadow-md py-2 absolute left-0 md:left-auto md:right-0 w-48 top-0 mt-10">
                    <ul>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                                onClick={() => window.print()}
                                ref={firstLink}
                            >
                                {checklistActionsContent?.action_item__print}
                            </button>
                        </li>
                        <li>
                            <MicroModal
                                disableFirstElementFocus={true}
                                modalOverlayClassName="z-50"
                                containerStyles={{
                                    maxWidth: '95%',
                                    padding: '0',
                                }}
                                handleClose={() =>
                                    setIsUncheckAllModalOpen(false)
                                }
                                open={isUncheckAllModalOpen}
                                trigger={handleOpen => (
                                    <button
                                        className="block w-full text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            handleOpen()
                                            setIsUncheckAllModalOpen(true)
                                        }}
                                    >
                                        {
                                            checklistActionsContent?.action_item__uncheck_all
                                        }
                                    </button>
                                )}
                                children={handleClose => (
                                    <div className="text-center p-8 sm:p-12">
                                        <h3 className="h3 mb-4">
                                            {
                                                checklistActionsContent?.uncheck_all_confirmation_title
                                            }
                                        </h3>
                                        <p>
                                            {
                                                checklistActionsContent?.uncheck_all_confirmation_text
                                            }
                                        </p>
                                        <div className="flex flex-col sm:flex-row mt-12 justify-center flex-no-wrap">
                                            <button
                                                className="btn btn-gray mt-4 sm:mt-0 sm:mr-4 order-2 sm:order-1"
                                                onClick={handleClose}
                                            >
                                                {
                                                    checklistActionsContent?.confirmation_cancel_button_text
                                                }
                                            </button>
                                            <button
                                                className="btn btn-orange order-1 sm:order-2"
                                                onClick={function () {
                                                    handleClose()
                                                    setCompletedItems([])
                                                }}
                                            >
                                                {
                                                    checklistActionsContent?.action_item__uncheck_all
                                                }
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        </li>
                        <li>
                            <MicroModal
                                disableFirstElementFocus={true}
                                modalOverlayClassName="z-50"
                                containerStyles={{
                                    maxWidth: '95%',
                                    padding: '0',
                                }}
                                handleClose={() =>
                                    setIsChangeAnswersModalOpen(false)
                                }
                                open={isChangeAnswersModalOpen}
                                trigger={handleOpen => (
                                    <button
                                        className="block w-full text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            handleOpen()
                                            setIsChangeAnswersModalOpen(true)
                                        }}
                                    >
                                        {
                                            checklistActionsContent?.action_item__change_answers
                                        }
                                    </button>
                                )}
                                children={handleClose => (
                                    <div className="text-center p-8 sm:p-12">
                                        <h3 className="h3 mb-4">
                                            {
                                                checklistActionsContent?.change_answers_confirmation_title
                                            }
                                        </h3>
                                        <p>
                                            {
                                                checklistActionsContent?.change_answers_confirmation_text
                                            }
                                        </p>
                                        <div className="flex flex-col sm:flex-row mt-12 justify-center flex-no-wrap">
                                            <button
                                                className="btn btn-gray mt-4 sm:mt-0 sm:mr-4 order-2 sm:order-1"
                                                onClick={handleClose}
                                            >
                                                {
                                                    checklistActionsContent?.confirmation_cancel_button_text
                                                }
                                            </button>
                                            <button
                                                className="btn btn-orange order-1 sm:order-2"
                                                onClick={function () {
                                                    handleClose()
                                                    restartForm()
                                                }}
                                            >
                                                {
                                                    checklistActionsContent?.action_item__change_answers
                                                }
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        </li>
                        <li>
                            <MicroModal
                                disableFirstElementFocus={true}
                                modalOverlayClassName="z-50"
                                containerStyles={{
                                    maxWidth: '95%',
                                    padding: '0',
                                }}
                                handleClose={() =>
                                    setIsRestartFormModalOpen(false)
                                }
                                open={isRestartFormModalOpen}
                                trigger={handleOpen => (
                                    <button
                                        className="block w-full text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            handleOpen()
                                            setIsRestartFormModalOpen(true)
                                        }}
                                    >
                                        {
                                            checklistActionsContent?.action_item__start_over
                                        }
                                    </button>
                                )}
                                children={handleClose => (
                                    <div className="text-center p-8 sm:p-12">
                                        <h3 className="h3 mb-4">
                                            {
                                                checklistActionsContent.start_over_confirmation_title
                                            }
                                        </h3>
                                        <p>
                                            {
                                                checklistActionsContent.start_over_confirmation_text
                                            }
                                        </p>
                                        <div className="flex flex-col sm:flex-row mt-12 justify-center flex-no-wrap">
                                            <button
                                                className="btn btn-gray mt-4 sm:mt-0 sm:mr-4 order-2 sm:order-1"
                                                onClick={handleClose}
                                            >
                                                {
                                                    checklistActionsContent.confirmation_cancel_button_text
                                                }
                                            </button>
                                            <button
                                                className="btn btn-orange order-1 sm:order-2"
                                                onClick={function () {
                                                    handleClose()
                                                    clearAndReload()
                                                }}
                                            >
                                                {
                                                    checklistActionsContent?.action_item__start_over
                                                }
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

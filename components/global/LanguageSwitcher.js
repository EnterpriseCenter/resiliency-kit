import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Caret from '@/public/caret.svg'
import Check from '@/public/check-blue.svg'
import { localeDisplayName } from '@/lib/localeFormat'
import { setCookie } from 'nookies'

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const languageSwitcher = useRef(null)
    const languageSwitcherTrigger = useRef(null)
    const router = useRouter()
    const { locale, locales } = router

    // Trap focus
    useEffect(() => {
        if (isOpen) {
            let focusableEls = languageSwitcher.current.querySelectorAll(
                'a[href]:not([disabled]), button:not([disabled])'
            )
            let firstFocusableEl = focusableEls[0]
            let lastFocusableEl = focusableEls[focusableEls.length - 1]
            let KEYCODE_TAB = 9

            languageSwitcher.current.addEventListener('keydown', function (e) {
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
    }, [isOpen, languageSwitcher])

    // Close the menu if esc key is pressed
    const closeSwitcher = useCallback(
        e => {
            if (e.keyCode === 27) {
                setIsOpen(false)
                languageSwitcherTrigger.current.focus()
            }
        },
        [languageSwitcherTrigger]
    )

    useEffect(() => {
        document.addEventListener('keydown', closeSwitcher, false)

        return () => {
            document.removeEventListener('keydown', closeSwitcher, false)
        }
    }, [])

    // const isFirstRun = useRef(true)
    // useEffect(() => {
    //     const getPath = path =>
    //         path.replace(/\/es/g, '').replace(/^\/|\/$/g, '')
    //     if (isFirstRun.current) {
    //         isFirstRun.current = false
    //         return
    //     }

    //     router.replace(
    //         locale === 'en'
    //             ? `/${getPath(router.pathname)}`
    //             : `/es/${getPath(router.pathname)}`
    //     )
    // }, [locale])

    function handleClickOutside(event) {
        if (
            languageSwitcher &&
            !languageSwitcher.current.contains(event.target)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={languageSwitcher}
            className="relative mt-0 xs:mt-2 md:mt-0 md:ml-8 z-50 print:hidden"
        >
            <button
                ref={languageSwitcherTrigger}
                className="bg-white hover:bg-gray-200 focus:bg-gray-300 border border-gray-400 rounded py-2 px-4 font-semibold text-gray-900 flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="sr-only">Current language: </span>
                {localeDisplayName(locale)}
                <Caret className="ml-4" />
            </button>

            {isOpen ? (
                <div className="bg-white rounded border border-gray-400 shadow-md py-2 absolute right-0 xs:left-0 xs:right-auto w-48 top-0 mt-10">
                    <ul>
                        {locales.map((item, index) => (
                            <li key={index}>
                                <Link href={router.pathname} locale={item}>
                                    <a
                                        className={`w-full flex items-center justify-between text-left px-4 py-1 hover:bg-gray-200 cursor-pointer ${
                                            item === locale && 'font-semibold'
                                        }`}
                                        onClick={() =>
                                            setCookie(
                                                null,
                                                'NEXT_LOCALE',
                                                item,
                                                { path: '/' }
                                            )
                                        }
                                    >
                                        <span>{localeDisplayName(item)}</span>
                                        {item === locale && (
                                            <Check className="w-4 h-4" />
                                        )}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

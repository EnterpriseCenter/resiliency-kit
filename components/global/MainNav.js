// Unused

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

export default function MainNav() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleButton = useRef(null)
    const menuWrapper = useRef(null)
    const firstLink = useRef(null)

    // Close the menu if esc key is pressed
    const closeMenu = useCallback(e => {
        if (e.keyCode === 27) {
            setIsOpen(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', closeMenu, false)

        return () => {
            document.removeEventListener('keydown', closeMenu, false)
        }
    }, [])

    // Focus on the first item when the menu opens
    useEffect(() => {
        if (isOpen) {
            firstLink.current.focus()
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    // Trap focus inside the menu when open
    useEffect(() => {
        if (isOpen) {
            let focusableEls = menuWrapper.current.querySelectorAll(
                'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
            )
            let firstFocusableEl = focusableEls[0]
            let lastFocusableEl = focusableEls[focusableEls.length - 1]
            let KEYCODE_TAB = 9

            menuWrapper.current.addEventListener('keydown', function (e) {
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
    }, [isOpen, menuWrapper])

    return (
        <div ref={menuWrapper}>
            <button
                ref={toggleButton}
                className="btn absolute right-0 mr-8 z-50 h-12 w-12 py-0 px-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <span className="flex flex-col">
                        <span className="block bg-white h-1 w-full transform -rotate-45 absolute -translate-x-2"></span>
                        <span className="block bg-white h-1 w-full transform rotate-45 absolute -translate-x-2"></span>
                    </span>
                ) : (
                    <span className="flex flex-col">
                        <span className="block bg-white h-1 w-full"></span>
                        <span className="block bg-white h-1 w-full mt-2"></span>
                        <span className="block bg-white h-1 w-full mt-2"></span>
                    </span>
                )}
                <span className="sr-only">Toggle Menu</span>
            </button>

            {isOpen ? (
                <div className="fixed flex flex-col justify-between max-h-screen top-0 right-0 bottom-0 left-0 bg-gray-900 py-10 px-6 sm:px-0 sm:py-20 sm:text-center sm:text-lg md:text-xl lg:py-32 lg:text-2xl xl:text-3xl">
                    <nav className="block">
                        <ul>
                            <li>
                                <Link href="/" passHref>
                                    <a
                                        ref={firstLink}
                                        className="text-white hover:text-gray-500 hover:underline py-3 px-2 block font-semibold"
                                    >
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources">
                                    <a className="text-white hover:text-gray-500 hover:underline py-3 px-2 block font-semibold">
                                        Resource Checklist
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <a className="text-white hover:text-gray-500 hover:underline py-3 px-2 block font-semibold">
                                        About This Project
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <a className="text-white hover:text-gray-500 hover:underline py-3 px-2 block font-semibold">
                                        Contact Us
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="text-sm text-gray-400">
                        &copy; 2020 The Enterprise Center.
                    </div>
                </div>
            ) : null}
        </div>
    )
}

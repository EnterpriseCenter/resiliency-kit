import { useState, useEffect } from 'react'
import useHasMounted from '@/lib/useHasMounted.js'

/*
 * useStickyState will get or set data to localstorage
 */
function useStickyState(defaultValue, key) {
    const hasMounted = useHasMounted()
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        if (!hasMounted) {
            return undefined
        }
        const stickyValue = window.localStorage.getItem(key)

        if (stickyValue !== null) {
            setValue(JSON.parse(stickyValue))
        }
    }, [hasMounted])

    useEffect(() => {
        if (!hasMounted) {
            return undefined
        }

        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useStickyState

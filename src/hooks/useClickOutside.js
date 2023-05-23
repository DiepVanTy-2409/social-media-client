import { useRef, useEffect } from 'react';
export const useClickOutside = (callback) => {
    const ref = useRef()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [ref])
    return ref
}

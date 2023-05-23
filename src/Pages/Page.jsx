import React from 'react'

const Page = ({ children }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <>{children}</>
}

export default Page
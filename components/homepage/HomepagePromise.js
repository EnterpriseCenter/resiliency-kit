export const HomepagePromise = ({ content, icon }) => {
    function displayPromiseIcon(type) {
        if (type === 'time') {
            return (
                <svg
                    className="text-orange-300 w-6 h-6 stroke-current flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            )
        } else if (type === 'security') {
            return (
                <svg
                    className="text-orange-300 w-6 h-6 stroke-current flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                </svg>
            )
        } else {
            return null
        }
    }

    return (
        <div className="flex sm:justify-center md:justify-start mb-4">
            {displayPromiseIcon(icon)}
            <p className="ml-2 leading-snug text-gray-800">{content}</p>
        </div>
    )
}

export default HomepagePromise

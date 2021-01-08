export default function CategoryHeader({
    category,
    sortedChecklistItems,
    completedItems,
}) {
    // Clean the array of checklist item into titles only
    const itemsInCategory = sortedChecklistItems[category].map(
        item => item.title
    )

    // Check the completed items against the new array and look for matches
    const completedInCategory = completedItems.filter(function (obj) {
        return itemsInCategory.indexOf(obj) >= 0
    })

    return (
        <div className="bg-gray-150 py-4 px-6 lg:px-20 flex justify-between items-center border-t border-gray-300 print:pl-0 print:border-none print:bg-white">
            <h2 className="text-sm tracking-widest font-normal text-gray-800 uppercase print:text-black print:font-normal w-2/3">
                {category}
            </h2>
            <div className="flex overflow-hidden rounded print:hidden">
                <div
                    className={`text-right py-1 px-4 text-sm font-semibold leading-none pl-6 pr-3 ${
                        completedInCategory.length === itemsInCategory.length
                            ? 'text-gray-900'
                            : 'text-gray-500'
                    }`}
                >
                    {completedInCategory.length}{' '}
                    <span className="sr-only">items completed out of</span>
                </div>

                <div className="text-left py-1 px-4 text-gray-900 leading-none text-sm font-semibold rounded-r transform -skew-x-12 pr-6 pl-3 -mr-4 border-l-2 border-gray-500">
                    <div className="transform skew-x-12">
                        {itemsInCategory.length}{' '}
                        <span className="sr-only">in this category.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

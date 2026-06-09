import { PrismicRichText } from '@prismicio/react'

export default function ChecklistItem({
    index,
    item,
    completedItems,
    setCompletedItems,
}) {
    function isChecked(title) {
        if (completedItems.indexOf(title) > -1) {
            return true
        } else {
            return false
        }
    }

    function handleChange(event) {
        if (event.target.checked) {
            setCompletedItems([...completedItems, event.target.name])
        } else if (event.target.checked === false) {
            let newArray = completedItems
            let indexItem = newArray.indexOf(event.target.name)

            newArray.splice(indexItem, 1)
            setCompletedItems([...newArray])
        }
    }

    function displayResourceIcon(type) {
        if (type === 'Link') {
            return <img alt="" src="/resource-link.svg" className="mr-2 w-4" />
        } else if (type === 'Template') {
            return (
                <img alt="" src="/resource-template.svg" className="mr-2 w-4" />
            )
        } else if (type === 'Video') {
            return <img alt="" src="/resource-video.svg" className="mr-2 w-4" />
        } else {
            return null
        }
    }

    return (
        <li
            key={item._meta.id}
            className={`checklist-item py-4 pr-5 pl-16 md:pr-10 md:pl-20 md:py-8 ${
                index > 0 && 'border-t border-gray-300'
            } relative print:py-2 print:pl-8`}
        >
            <input
                type="checkbox"
                className="opacity-0 absolute custom-checkbox-control"
                id={item._meta.id}
                name={item.title}
                checked={isChecked(item.title)}
                onChange={handleChange}
            ></input>
            <label
                htmlFor={item._meta.id}
                className="font-semibold text-lg block -mt-1 cursor-pointer -ml-12 pl-12 leading-snug print:text-lg print:text-black"
            >
                {item.title}
            </label>
            <div className="border border-gray-600 rounded-full h-6 w-6 ml-5 md:ml-8 custom-checkbox absolute left-0 top-0 mt-4 md:mt-8 pointer-events-none print:mt-2 print:ml-0 print:h-4 print:w-4 print:border-black"></div>
            <div className="checklist-item-description text-gray-700 print:text-black">
                <PrismicRichText field={item.description} />
            </div>

            {item.related_resources.length ? (
                <ul className="pt-2 mt-1 print:hidden">
                    {item.related_resources.map((resource, index) => {
                        if (
                            resource.resource_name !== null &&
                            resource.url !== null
                        ) {
                            return (
                                <li
                                    className="flex items-center"
                                    key={resource.resource_name.concat(index)}
                                >
                                    {resource.resource_type &&
                                        displayResourceIcon(
                                            resource.resource_type
                                        )}
                                    <a
                                        rel="nofollow noreferrer"
                                        target="_blank"
                                        className="text-blue-400 font-semibold block mt-1 tracking-wider uppercase text-sm hover:text-blue-300 hover:underline"
                                        href={resource.url}
                                    >
                                        {resource.resource_name}
                                    </a>
                                </li>
                            )
                        } else {
                            // null
                        }
                    })}
                </ul>
            ) : null}
        </li>
    )
}

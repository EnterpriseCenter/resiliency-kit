// Filter checklistItems
export const filterCheckListItems = (checklistItems, questions, answers) => {
    const questionKeys = questions.reduce(
        (results, question) => ({
            ...results,
            [question.question_identifier]: question.question_type,
        }),
        {}
    )
    const answersArray = Object.keys(answers).map(answer => answers[answer])
    const flatAnswers = [].concat.apply([], answersArray)

    let filteredCheckListItems = checklistItems

    Object.keys(questionKeys).map((key, index) => {
        // Single select questions
        if (questionKeys[key] === 'Single select') {
            filteredCheckListItems = filteredCheckListItems.filter(item => {
                if (item.applies_to_all) return true

                if (answers[Object.keys(answers)[index]] === null) {
                    return true
                }

                return item[key].includes(Object.values(answers)[index])
            })
        }

        // Multi select questions
        if (questionKeys[key] === 'Multi select') {
            filteredCheckListItems = filteredCheckListItems.filter(item => {
                const answer = Object.values(answers)[index]

                if (
                    // If the item applies to all
                    item.applies_to_all ||
                    // If the user answered "not sure"
                    answer === 'notSure' ||
                    // If no sectors are tagged to the question
                    item[key].length === 0
                ) {
                    return true
                }

                if (
                    // If they selected "none of these apply" and at least 1 sector is tagged, return false
                    answer === 'none' &&
                    item[key].length > 0
                ) {
                    return false
                }

                // If they selected one or more, only return the ones that match
                return answer.some(answer => item[key].indexOf(answer) > -1)
            })
        }
    })

    return filteredCheckListItems.filter(
        (item, index, self) =>
            index === self.findIndex(t => t.title === item.title)
    )
}

export const sortChecklistItems = (checkListItems, categories) => {
    return checkListItems
        .filter(checklistItem => checklistItem.category !== null)
        .reduce((acc, checklistItem) => {
            const key = checklistItem.category
            acc[key] = acc[key] || []
            acc[key].push(checklistItem)
            return acc
        }, {})
}

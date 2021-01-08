export default function normalize(array) {
    const newArray = array.map(element => {
        let businessTypes = []
        let employeesTypes = []
        let sectorTypes = []

        if (element['business_type']) {
            element['business_type'].map(type => {
                if (type.answer && type.answer.answer_title) {
                    businessTypes.push(type.answer.answer_title)
                }
            })
        }
        if (element['employees']) {
            element['employees'].map(type => {
                if (type.answer && type.answer.answer_title) {
                    employeesTypes.push(type.answer.answer_title)
                }
            })
        }
        if (element['sectors']) {
            element['sectors'].map(type => {
                if (type.answer && type.answer.answer_title) {
                    sectorTypes.push(type.answer.answer_title)
                }
            })
        }

        element['business_type'] = businessTypes
        element['employees'] = employeesTypes
        element['sectors'] = sectorTypes

        return element
    })

    return newArray
}

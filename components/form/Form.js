import React, { useState, useEffect } from 'react'
import FormQuestion from './FormQuestion'

export default function Form({ questions, setAnswersData, skipText, buttons }) {
    const [shownIndex, setShownIndex] = useState(0)
    const [storedAnswers, setstoredAnswers] = useState({})

    const handleOnChange = event => {
        if (event.target.type === 'radio') {
            setstoredAnswers({
                ...storedAnswers,
                ...{ [event.target.name]: event.target.value },
            })
        }

        if (event.target.type === 'checkbox') {
            let checkedArray =
                typeof storedAnswers[event.target.name] !== 'undefined'
                    ? storedAnswers[event.target.name]
                    : []

            if (checkedArray.includes(event.target.value)) {
                checkedArray = checkedArray.filter(
                    val => val !== event.target.value
                )
            } else {
                checkedArray = [...checkedArray, event.target.value]
            }

            setstoredAnswers({
                ...storedAnswers,
                ...{ [event.target.name]: checkedArray },
            })
        }
    }

    const handleOnSkip = slug => {
        setstoredAnswers({
            ...storedAnswers,
            [slug]: null,
        })
    }

    useEffect(() => {
        console.table(storedAnswers)
    }, [storedAnswers])

    return (
        <div className="flex items-center form pt-8 md:pt-0">
            <div className="w-full md:w-1/2">
                <div className="flex mb-8 -mr-2">
                    {questions
                        ? questions.map((_, index) => {
                              if (index < shownIndex) {
                                  return (
                                      <div
                                          className="w-1/3 sm:w-24 lg:w-10 h-6 bg-blue-100 mr-2 cursor-pointer rounded-sm md:h-2"
                                          onClick={() => setShownIndex(index)}
                                          key={index}
                                      />
                                  )
                              } else if (index === shownIndex) {
                                  return (
                                      <div
                                          className="w-1/3 sm:w-24 lg:w-10 h-6 bg-blue-400 mr-2 relative text-center flex items-center justify-center rounded-sm md:h-2"
                                          key={index}
                                      >
                                          <span className="text-white text-sm uppercase font-semibold w-full md:sr-only">
                                              {index + 1}
                                          </span>
                                      </div>
                                  )
                              } else {
                                  return (
                                      <div
                                          className="w-1/3 sm:w-24 lg:w-10 h-6 bg-gray-300 mr-2 rounded-sm md:h-2"
                                          key={index}
                                      />
                                  )
                              }
                          })
                        : null}
                </div>

                {questions
                    ? questions.map((question, index) => {
                          const answers = question.answers.map(
                              answer => answer.answer
                          )

                          return shownIndex === index ? (
                              <FormQuestion
                                  key={index}
                                  questions={questions}
                                  currentQuestion={question}
                                  answers={answers}
                                  setAnswersData={setAnswersData}
                                  index={index}
                                  handleOnChange={handleOnChange}
                                  handleOnSkip={handleOnSkip}
                                  buttons={buttons}
                                  shownIndex={shownIndex}
                                  setShownIndex={setShownIndex}
                                  storedAnswers={storedAnswers}
                              />
                          ) : null
                      })
                    : null}

                <button
                    className="btn-text py-8 mt-3 font-bold"
                    onClick={() => setAnswersData({ skipped: 'true' })}
                >
                    {skipText}
                </button>
            </div>
        </div>
    )
}

export default function FormQuestion({
    questions,
    currentQuestion,
    answers,
    setAnswersData,
    index,
    handleOnChange,
    handleOnSkip,
    shownIndex,
    setShownIndex,
    storedAnswers,
}) {
    const handleSkipQuestion = slug => {
        setShownIndex(
            shownIndex === questions.length ? shownIndex : shownIndex + 1
        )
        handleOnSkip(slug)
    }

    return (
        <div key={currentQuestion._meta.id}>
            <h2 className="h2 mb-3 md:mb-8 leading-snug">
                {currentQuestion.question}
            </h2>
            {currentQuestion.question_description ? (
                <p className="-mt-4 mb-8 text-md text-gray-700 leading-snug">
                    {currentQuestion.question_description}
                </p>
            ) : null}
            {answers.length ? (
                <ul>
                    {answers.map(function (answer) {
                        return (
                            <li key={answer._meta.id}>
                                {currentQuestion.question_type !==
                                'Multi select' ? (
                                    <>
                                        <input
                                            className="opacity-0 absolute"
                                            type="radio"
                                            id={answer._meta.id}
                                            name={currentQuestion.slug}
                                            value={answer.answer_title}
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor={answer._meta.id}
                                            className="mb-2 flex items-center cursor-pointer text-xl p-8 max-w-md border border-gray-500 rounded-md shadow-md bg-white hover:bg-gray-100"
                                        >
                                            <span className="custom-form-radio-button w-6 h-6 inline-block mr-4 rounded-full border border-gray-500 bg-white flex-no-shrink"></span>
                                            <span className="flex flex-col">
                                                <span className="font-semibold leading-tight">
                                                    {answer.answer_title}
                                                </span>
                                                <span className="text-sm text-gray-800">
                                                    {answer.answer_description}
                                                </span>
                                            </span>
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            className="opacity-0 absolute"
                                            type="checkbox"
                                            id={answer._meta.id}
                                            name={currentQuestion.slug}
                                            value={answer.answer_title}
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor={answer._meta.id}
                                            className="mb-2 flex items-center cursor-pointer text-xl p-8 max-w-md border border-gray-500 rounded-md shadow-md bg-white hover:bg-gray-100"
                                        >
                                            <span className="custom-form-checkbox w-6 h-6 inline-block mr-4 border border-gray-500 bg-white flex-no-shrink"></span>
                                            <span className="flex flex-col">
                                                <span className="font-semibold">
                                                    {answer.answer_title}
                                                </span>
                                                <span className="text-sm text-gray-800">
                                                    {answer.answer_description}
                                                </span>
                                            </span>
                                        </label>
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>
            ) : null}

            <div className="mt-8 flex items-center">
                {questions.length === index + 1 ? (
                    // Last question
                    <div>
                        {storedAnswers[
                            Object.keys(storedAnswers)[questions.length - 1]
                        ] &&
                        storedAnswers[
                            Object.keys(storedAnswers)[questions.length - 1]
                        ].length ? (
                            <button
                                className="btn btn-blue mr-2"
                                onClick={() => setAnswersData(storedAnswers)}
                            >
                                {currentQuestion.submit_button_text_alt}
                            </button>
                        ) : (
                            <button
                                className="btn btn-blue mr-2"
                                onClick={() =>
                                    setAnswersData({
                                        ...storedAnswers,
                                        [currentQuestion.slug]: 'none',
                                    })
                                }
                            >
                                {currentQuestion.submit_button_text}
                            </button>
                        )}
                        <button
                            className="btn-text ml-4 font-bold"
                            onClick={() =>
                                setAnswersData({
                                    ...storedAnswers,
                                    [currentQuestion.slug]: 'notSure',
                                })
                            }
                        >
                            {currentQuestion.skip_button_text}
                        </button>
                    </div>
                ) : (
                    // Non-last questions
                    <div>
                        <button
                            className="btn btn-blue mr-2"
                            onClick={() => setShownIndex(shownIndex + 1)}
                        >
                            {currentQuestion.submit_button_text}
                        </button>

                        <button
                            className="btn-text ml-4 font-bold"
                            onClick={() =>
                                handleSkipQuestion(currentQuestion.slug)
                            }
                        >
                            {currentQuestion.skip_button_text}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

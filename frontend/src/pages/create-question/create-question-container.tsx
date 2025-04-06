import './create-question.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionApiData, saveQuestion, getQuestion } from 'api/quiz-question.ts'

import { emptyQuestionFormData, toQuestionApiData, toQuestionFormData } from './form'
import { CreateQuestionForm } from './create-question'

export function CreateQuestionContainer() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined

    const [questionData, setQuestionData] = useState(emptyQuestionFormData())
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [linkToEditQuestion, setLinkToEditQuestion] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionId) {
                const quizQuestion = await getQuestion(questionId)
                setQuestionData(toQuestionFormData(quizQuestion))
                setIsLoaded(true)
            }
        }
        fetchQuestion()
    }, [questionId])

    const postData = async (formData: QuestionApiData) => {
        return saveQuestion(formData)
            .then(response => {
                setLinkToQuestion(`${location.origin}/question/${response.id}`)
                setLinkToEditQuestion(`${location.origin}/question/${response.hash}/edit`)
            })
            .catch(error => setLinkToQuestion(error.message))
    }

    const handleSubmit = () => {
        setErrorMessage('')
        const apiData = toQuestionApiData(questionData)

        if (apiData.correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        const answersCount = apiData.answers.length
        for (let i = 0; i < answersCount; i++) {
            if (apiData.answers[i] === '') {
                setErrorMessage('All answers must be filled in')
                return
            }
        }

        let explanationNotEmptyCounter = 0
        const explanationCount = apiData.explanations.length

        for (let i = 0; i < explanationCount; i++) {
            if (apiData.explanations[i] !== '') {
                explanationNotEmptyCounter++
            }
        }

        if (explanationNotEmptyCounter !== 0 && explanationNotEmptyCounter !== explanationCount) {
            setErrorMessage('All or none explanation must be filled in.')
            return
        }

        if (apiData.question === '') {
            setErrorMessage('Question must not be empty.')
            return
        }

        postData(apiData)
    }

    return (
        <CreateQuestionForm
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            isLoaded={isLoaded}
            linkToEditQuestion={linkToEditQuestion}
            linkToQuestion={linkToQuestion}
            questionData={questionData}
            setQuestionData={setQuestionData}
        />
    )
}

import type { AnswerIdxs } from 'model/quiz-question'
import type { QuestionApiData } from 'api/quiz-question'

export interface AnswerData {
    readonly answer: string
    readonly isCorrect: boolean
    readonly explanation: string
}

export const emptyAnswerData = (): AnswerData => ({ answer: '', isCorrect: false, explanation: '' })

export interface QuestionFormData {
    readonly question: string
    readonly answers: readonly AnswerData[]
    readonly questionExplanation: string
    readonly isMultipleChoice: boolean
}

export const emptyQuestionFormData = (): QuestionFormData => ({
    question: '',
    answers: [emptyAnswerData(), emptyAnswerData()],
    questionExplanation: '',
    isMultipleChoice: false,
})

export const toQuestionFormData = (questionData: QuestionApiData): QuestionFormData => {
    const answerData = questionData.answers.map((answer, index) => ({
        answer,
        isCorrect: questionData.correctAnswers.includes(index),
        explanation: questionData.explanations[index],
    }))

    return {
        question: questionData.question,
        answers: answerData,
        questionExplanation: questionData.questionExplanation,
        isMultipleChoice: questionData.correctAnswers.length > 1,
    }
}

export const toQuestionApiData = (questionData: QuestionFormData): QuestionApiData => {
    const answers = questionData.answers.map(answer => answer.answer)
    const correctAnswers = questionData.answers.reduce(
        (acc, answer, index) => (answer.isCorrect ? acc.concat([index]) : acc),
        [] as AnswerIdxs,
    )
    const explanations = questionData.answers.map(answer => answer.explanation)

    return {
        question: questionData.question,
        answers,
        correctAnswers,
        explanations,
        questionExplanation: questionData.questionExplanation,
    }
}

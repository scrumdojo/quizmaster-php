import type { QuizQuestion } from '../model/quiz-question.ts'

export interface QuizScore {
    readonly correct: number
    readonly total: number
    readonly answers: QuizQuestionAnswered[]
}

export interface QuizQuestionAnswered extends QuizQuestion {
    answer: string
    feedback: string
}

interface QuizScoreProps {
    readonly score: QuizScore
    answers: QuizQuestionAnswered[]
}

export const QuizScore = ({ score, answers }: QuizScoreProps) => {
    const { correct, total } = score
    const percentage = (correct / total) * 100
    const result = percentage >= 85 ? 'passed' : 'failed'

    return (
        <>
            <h1>Quiz score</h1>
            <p>
                Correct answers: <span id="correct-answers">{correct}</span>
            </p>
            <p>
                Questions count: <span id="total-questions">{total}</span>
            </p>
            <p>
                Success rate: <span id="percentage-result">{percentage.toFixed(2)}</span>
            </p>
            <p>
                Result: <span id="text-result">{result}</span>
            </p>

            <h2>Recap</h2>
            <ul>
                {answers.map(({ id, question, answer, feedback }, index) => (
                    <li key={index} id={`answers-${id}`}>
                        <p className="question">{question}</p>
                        <p className="answer">{answer}</p>
                        <p className="feedback">{feedback}</p>
                {answers.map(({ id, question, answer, feedback }) => (
                    <li key={id} id={`answers-${id}`}>
                    </li>
                ))}
            </ul>
        </>
    )
}

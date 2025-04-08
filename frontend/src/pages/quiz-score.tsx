import type { AnswerIdxs, QuizQuestion } from '../model/quiz-question.ts'

export interface QuizScore {
    readonly correct: number
    readonly total: number
    readonly answers: QuizQuestionAnswered[]
}

export interface QuizQuestionAnswered extends QuizQuestion {
    userAnswers: AnswerIdxs
    feedback: string
}

interface QuizScoreProps {
    readonly score: QuizScore
    answers: QuizQuestionAnswered[]
}

export const QuizScore = ({ score, answers }: QuizScoreProps) => {
    const { correct, total } = score
    const percentage = Math.round((correct / total) * 100)
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
                Success rate: <span id="percentage-result">{percentage.toString()}</span>
            </p>
            <p>
                Result: <span id="text-result">{result}</span>
            </p>

            <h2>Recap</h2>
            <ul>
                {answers.map(({ id, question, userAnswers, answers, feedback }) => (
                    <li key={id} id={`answers-${id}`}>
                        <span className="question">{question}</span>
                        <span className="answer">{userAnswers.map(id => `${answers[id]}`).join(',')}</span>
                        <span className="feedback">{feedback}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

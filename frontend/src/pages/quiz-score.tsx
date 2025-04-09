import { Close, Done } from '@mui/icons-material'
import type { AnswerIdxs, QuizQuestion } from '../model/quiz-question.ts'
import { Answer } from './question-take'

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
    const passed = percentage >= 85
    const result = passed ? 'passed' : 'failed'

    return (
        <div className={`result is-${result}`}>
            <div style={{ textAlign: 'center' }}>
                <div className="result-icon">{passed ? <Done /> : <Close />}</div>
            </div>

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
            <ul className="answer-list">
                {answers.map(({ id, question, userAnswers, answers, feedback, explanations, correctAnswers }) => (
                    <li key={id} id={`answers-${id}`}>
                        <span className="feedback">{feedback}</span>
                        <span className="question">{question}</span>

                        {answers.map((answer, idx) => (
                            <Answer
                                key={answer}
                                isMultipleChoice={correctAnswers.length > 1}
                                idx={idx}
                                answer={answer}
                                checked={userAnswers.includes(idx)}
                                isCorrect={
                                    (correctAnswers.includes(idx) && userAnswers.includes(idx)) ||
                                    (!correctAnswers.includes(idx) && !userAnswers.includes(idx))
                                }
                                explanation={explanations ? explanations[idx] : 'not defined'}
                                showFeedback={true}
                                onAnswerChange={() => {}}
                            />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

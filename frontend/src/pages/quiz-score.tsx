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
    quizQuestionAnswered: QuizQuestionAnswered[]
}

export const QuizScore = ({ score, quizQuestionAnswered }: QuizScoreProps) => {
    const { correct, total } = score
    const percentage = Math.round((correct / total) * 100)
    const passed = percentage >= 85
    const result = passed ? 'passed' : 'failed'

    return (
        <>
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
            </div>

            <div>
                <h2>Recap</h2>
                {quizQuestionAnswered.map(
                    ({ id, question, userAnswers, answers, feedback, explanations, correctAnswers }, index) => (
                        <div key={id} id={`answers-${id}`}>
                            <div>
                                <span className="totalFeedback" title={feedback}>
                                    {feedback === 'Correct' ? <Done /> : <Close />}
                                </span>
                                <span className="question">{question}</span>
                            </div>

                            <div>
                                <ul className="answer-list">
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
                                </ul>
                            </div>
                            {index < quizQuestionAnswered.length - 1 ? <hr /> : null}
                        </div>
                    ),
                )}
            </div>
        </>
    )
}

export interface QuizScore {
    readonly correct: number
    readonly total: number
}

interface QuizScoreProps {
    readonly score: QuizScore
}

export const QuizScore = ({ score }: QuizScoreProps) => {
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
        </>
    )
}

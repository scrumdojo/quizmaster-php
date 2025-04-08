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
            <h1>Výsledek testu</h1>
            <p>
                Správné odpovědi: <span id="correct-answers">{correct}</span>
            </p>
            <p>
                Celkový počet otázek: <span id="total-questions">{total}</span>
            </p>
            <p>
                Úspešnost(%): <span id="percentage-result">{percentage.toFixed(2)}</span>
            </p>
            <p>
                Stav: <span id="text-result">{result}</span>
            </p>
        </>
    )
}

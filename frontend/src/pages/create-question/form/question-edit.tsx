interface QuestionEditProps {
    readonly question: string
    readonly setQuestion: (question: string) => void
}

export const QuestionEdit = ({ question, setQuestion }: QuestionEditProps) => (
    <>
        <label htmlFor="question-text">Enter your question:</label>
        <textarea id="question-text" value={question} onChange={e => setQuestion(e.target.value)} rows={3} />
    </>
)

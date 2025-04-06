interface QuestionExplanationEditProps {
    readonly questionExplanation: string
    readonly setQuestionExplanation: (questionExplanation: string) => void
}

export const QuestionExplanationEdit = ({
    questionExplanation,
    setQuestionExplanation,
}: QuestionExplanationEditProps) => (
    <>
        <label htmlFor="general-explanation">General explanation for the entire question:</label>
        <textarea
            id="question-explanation"
            value={questionExplanation}
            onChange={e => setQuestionExplanation(e.target.value)}
            rows={2}
        />
    </>
)

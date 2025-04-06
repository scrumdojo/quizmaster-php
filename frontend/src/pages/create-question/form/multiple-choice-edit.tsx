interface MultipleChoiceEditProps {
    readonly isMultipleChoice: boolean
    readonly setIsMultipleChoice: (isMultipleChoice: boolean) => void
}

export const MultipleChoiceEdit = ({ isMultipleChoice, setIsMultipleChoice }: MultipleChoiceEditProps) => (
    <div>
        <input
            id="is-multiple-choice"
            type="checkbox"
            checked={isMultipleChoice}
            onChange={e => setIsMultipleChoice(e.target.checked)}
        />
        <label htmlFor="is-multiple-choice">Multiple choice</label>
    </div>
)

import { Checkbox } from '@mui/material'

interface MultipleChoiceEditProps {
    readonly isMultipleChoice: boolean
    readonly setIsMultipleChoice: (isMultipleChoice: boolean) => void
}

export const MultipleChoiceEdit = ({ isMultipleChoice, setIsMultipleChoice }: MultipleChoiceEditProps) => (
    <div>
        <Checkbox
            id="is-multiple-choice"
            checked={isMultipleChoice}
            onChange={e => setIsMultipleChoice(e.target.checked)}
        />
        <label htmlFor="is-multiple-choice">Multiple choice</label>
    </div>
)

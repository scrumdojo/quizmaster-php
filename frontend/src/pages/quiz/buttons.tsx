import { Button, type WithOnClick } from 'pages/components/button'

export const NextButton = ({ onClick }: WithOnClick) => (
    <Button id="next" onClick={onClick}>
        Next Question
    </Button>
)
interface SubmitAndNextButtonProps {
    isLastQuestion?: boolean
}
export const SubmitAndNextButton = ({ isLastQuestion }: SubmitAndNextButtonProps) => (
    <Button
        id={isLastQuestion ? 'evaluate' : 'next'}
        type="submit"
        className={isLastQuestion ? 'submit-btn-evaluate' : 'submit-and-next-btn'}
        onClick={() => {}}
    >
        {isLastQuestion ? 'Evaluate' : 'Next Question'}
    </Button>
)

export const BackButton = ({ onClick }: WithOnClick) => (
    <Button id="back" onClick={onClick}>
        Previous Question
    </Button>
)

export const EvaluateButton = ({ onClick }: WithOnClick) => (
    <Button id="evaluate" className="submit-btn-evaluate" onClick={onClick}>
        Evaluate
    </Button>
)

import { Button, type WithOnClick } from 'pages/components/button'

export const NextButton = ({ onClick }: WithOnClick) => (
    <Button id="next" onClick={onClick}>
        Next Question
    </Button>
)
export const SubmitAndNextButton = () => (
    <Button id="next" type="submit" className="submit-and-next-btn" onClick={() => {}}>
        Next Question
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
